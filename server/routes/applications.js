const express = require('express');
const { body, validationResult } = require('express-validator');
const Application = require('../models/Application');
const Internship = require('../models/Internship');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/applications
// @desc    Apply for internship
// @access  Private (Student)
router.post('/', auth, authorize('student'), [
  body('internshipId').isMongoId(),
  body('coverLetter').notEmpty().trim(),
  body('resume.url').notEmpty(),
  body('resume.filename').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { internshipId, coverLetter, resume, portfolio, additionalDocuments } = req.body;

    // Check if internship exists and is active
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    if (internship.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This internship is not accepting applications'
      });
    }

    // Check if application deadline has passed
    if (new Date() > new Date(internship.applicationDeadline)) {
      return res.status(400).json({
        success: false,
        message: 'Application deadline has passed'
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      student: req.user._id,
      internship: internshipId
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this internship'
      });
    }

    // Check if max applications reached
    if (internship.currentApplications >= internship.maxApplications) {
      return res.status(400).json({
        success: false,
        message: 'Maximum applications reached for this internship'
      });
    }

    // Create application
    const application = new Application({
      student: req.user._id,
      internship: internshipId,
      coverLetter,
      resume,
      portfolio,
      additionalDocuments
    });

    await application.save();

    // Update internship application count
    await Internship.findByIdAndUpdate(internshipId, {
      $inc: { currentApplications: 1 }
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/applications/my
// @desc    Get my applications
// @access  Private (Student)
router.get('/my', auth, authorize('student'), async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id })
      .populate('internship', 'title company location type duration startDate endDate status')
      .sort({ appliedAt: -1 });

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Get my applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/applications/internship/:id
// @desc    Get applications for specific internship
// @access  Private (Industry/Admin)
router.get('/internship/:id', auth, authorize('industry', 'admin'), async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    // Check if user is owner or admin
    if (internship.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these applications'
      });
    }

    const applications = await Application.find({ internship: req.params.id })
      .populate('student', 'profile.firstName profile.lastName profile.email profile.phone')
      .sort({ appliedAt: -1 });

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Get internship applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/applications/:id/status
// @desc    Update application status
// @access  Private (Industry/Admin)
router.put('/:id/status', auth, authorize('industry', 'admin'), [
  body('status').isIn(['pending', 'under_review', 'shortlisted', 'accepted', 'rejected', 'withdrawn']),
  body('feedback').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { status, feedback } = req.body;

    const application = await Application.findById(req.params.id)
      .populate('internship', 'postedBy');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if user is authorized
    if (application.internship.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application'
      });
    }

    const updateData = {
      status,
      reviewedAt: new Date(),
      reviewedBy: req.user._id
    };

    if (feedback) {
      updateData.feedback = feedback;
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('student', 'profile.firstName profile.lastName profile.email');

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: updatedApplication
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/applications/:id/withdraw
// @desc    Withdraw application
// @access  Private (Student)
router.put('/:id/withdraw', auth, authorize('student'), async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if user is the applicant
    if (application.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to withdraw this application'
      });
    }

    // Check if application can be withdrawn
    if (['accepted', 'rejected', 'withdrawn'].includes(application.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot withdraw this application'
      });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { status: 'withdrawn' },
      { new: true }
    );

    // Decrease application count
    await Internship.findByIdAndUpdate(application.internship, {
      $inc: { currentApplications: -1 }
    });

    res.json({
      success: true,
      message: 'Application withdrawn successfully',
      data: updatedApplication
    });
  } catch (error) {
    console.error('Withdraw application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/applications/:id
// @desc    Get single application
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('student', 'profile.firstName profile.lastName profile.email profile.phone')
      .populate('internship', 'title company location type duration startDate endDate');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check authorization
    const isStudent = application.student._id.toString() === req.user._id.toString();
    const isIndustry = req.user.role === 'industry' || req.user.role === 'admin';
    const isInternshipOwner = application.internship.postedBy.toString() === req.user._id.toString();

    if (!isStudent && !isIndustry && !isInternshipOwner) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this application'
      });
    }

    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

