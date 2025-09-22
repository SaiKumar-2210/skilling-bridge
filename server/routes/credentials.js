const express = require('express');
const { body, validationResult } = require('express-validator');
const Credential = require('../models/Credential');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/credentials/my
// @desc    Get my credentials
// @access  Private (Student)
router.get('/my', auth, authorize('student'), async (req, res) => {
  try {
    const credentials = await Credential.find({ student: req.user._id })
      .populate('internship', 'title company')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: credentials
    });
  } catch (error) {
    console.error('Get my credentials error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/credentials/student/:id
// @desc    Get student credentials
// @access  Private (Faculty/Industry/Admin)
router.get('/student/:id', auth, authorize('faculty', 'industry', 'admin'), async (req, res) => {
  try {
    const credentials = await Credential.find({ student: req.params.id })
      .populate('internship', 'title company')
      .populate('student', 'profile.firstName profile.lastName profile.email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: credentials
    });
  } catch (error) {
    console.error('Get student credentials error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/credentials/:id
// @desc    Get single credential
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const credential = await Credential.findById(req.params.id)
      .populate('student', 'profile.firstName profile.lastName profile.email')
      .populate('internship', 'title company')
      .populate('verifiedBy', 'profile.firstName profile.lastName');

    if (!credential) {
      return res.status(404).json({
        success: false,
        message: 'Credential not found'
      });
    }

    // Check authorization
    const isStudent = credential.student._id.toString() === req.user._id.toString();
    const isFaculty = req.user.role === 'faculty' || req.user.role === 'admin';
    const isIndustry = req.user.role === 'industry' || req.user.role === 'admin';

    if (!isStudent && !isFaculty && !isIndustry) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this credential'
      });
    }

    res.json({
      success: true,
      data: credential
    });
  } catch (error) {
    console.error('Get credential error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/credentials
// @desc    Create new credential
// @access  Private (Industry/Admin)
router.post('/', auth, authorize('industry', 'admin'), [
  body('studentId').isMongoId(),
  body('internshipId').isMongoId(),
  body('company').notEmpty().trim(),
  body('title').notEmpty().trim(),
  body('duration').isInt({ min: 1 }),
  body('startDate').isISO8601(),
  body('endDate').isISO8601(),
  body('skills').isArray(),
  body('achievements').isArray()
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

    const credentialData = {
      ...req.body,
      student: req.body.studentId,
      internship: req.body.internshipId
    };

    const credential = new Credential(credentialData);
    await credential.save();

    res.status(201).json({
      success: true,
      message: 'Credential created successfully',
      data: credential
    });
  } catch (error) {
    console.error('Create credential error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/credentials/:id/verify
// @desc    Verify credential
// @access  Private (Faculty/Admin)
router.put('/:id/verify', auth, authorize('faculty', 'admin'), [
  body('performance.rating').optional().isInt({ min: 1, max: 5 }),
  body('performance.feedback').optional().trim(),
  body('performance.strengths').optional().isArray(),
  body('performance.areasForImprovement').optional().isArray()
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

    const { performance } = req.body;

    const credential = await Credential.findById(req.params.id);

    if (!credential) {
      return res.status(404).json({
        success: false,
        message: 'Credential not found'
      });
    }

    const updateData = {
      status: 'verified',
      verifiedBy: req.user._id,
      verifiedAt: new Date()
    };

    if (performance) {
      updateData.performance = performance;
    }

    const updatedCredential = await Credential.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('student', 'profile.firstName profile.lastName profile.email');

    res.json({
      success: true,
      message: 'Credential verified successfully',
      data: updatedCredential
    });
  } catch (error) {
    console.error('Verify credential error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/credentials/verify/:credentialId
// @desc    Verify credential by ID (Public)
// @access  Public
router.get('/verify/:credentialId', async (req, res) => {
  try {
    const credential = await Credential.findOne({ 
      'certificate.credentialId': req.params.credentialId 
    })
      .populate('student', 'profile.firstName profile.lastName profile.email')
      .populate('internship', 'title company')
      .populate('verifiedBy', 'profile.firstName profile.lastName');

    if (!credential) {
      return res.status(404).json({
        success: false,
        message: 'Credential not found'
      });
    }

    res.json({
      success: true,
      data: {
        credentialId: credential.certificate.credentialId,
        student: credential.student,
        internship: credential.internship,
        company: credential.company,
        title: credential.title,
        duration: credential.duration,
        startDate: credential.startDate,
        endDate: credential.endDate,
        skills: credential.skills,
        achievements: credential.achievements,
        status: credential.status,
        verifiedBy: credential.verifiedBy,
        verifiedAt: credential.verifiedAt,
        issuedAt: credential.certificate.issuedAt,
        validUntil: credential.certificate.validUntil
      }
    });
  } catch (error) {
    console.error('Verify credential error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

