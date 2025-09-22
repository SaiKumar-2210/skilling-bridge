const express = require('express');
const { body, validationResult } = require('express-validator');
const Logbook = require('../models/Logbook');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/logbooks
// @desc    Create new logbook entry
// @access  Private (Student)
router.post('/', auth, authorize('student'), [
  body('internshipId').isMongoId(),
  body('title').notEmpty().trim(),
  body('week').isInt({ min: 1 }),
  body('date').isISO8601(),
  body('tasksCompleted').isArray({ min: 1 }),
  body('skillsLearned').isArray(),
  body('challenges').isArray(),
  body('achievements').isArray(),
  body('reflection').notEmpty().trim()
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

    const logbookData = {
      ...req.body,
      student: req.user._id
    };

    const logbook = new Logbook(logbookData);
    await logbook.save();

    res.status(201).json({
      success: true,
      message: 'Logbook entry created successfully',
      data: logbook
    });
  } catch (error) {
    console.error('Create logbook error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/logbooks/my
// @desc    Get my logbook entries
// @access  Private (Student)
router.get('/my', auth, authorize('student'), async (req, res) => {
  try {
    const logbooks = await Logbook.find({ student: req.user._id })
      .populate('internship', 'title company')
      .sort({ week: 1 });

    res.json({
      success: true,
      data: logbooks
    });
  } catch (error) {
    console.error('Get my logbooks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/logbooks/internship/:id
// @desc    Get logbooks for specific internship
// @access  Private (Faculty/Industry/Admin)
router.get('/internship/:id', auth, authorize('faculty', 'industry', 'admin'), async (req, res) => {
  try {
    const logbooks = await Logbook.find({ internship: req.params.id })
      .populate('student', 'profile.firstName profile.lastName profile.email')
      .sort({ week: 1 });

    res.json({
      success: true,
      data: logbooks
    });
  } catch (error) {
    console.error('Get internship logbooks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/logbooks/:id
// @desc    Update logbook entry
// @access  Private (Student)
router.put('/:id', auth, authorize('student'), async (req, res) => {
  try {
    const logbook = await Logbook.findById(req.params.id);

    if (!logbook) {
      return res.status(404).json({
        success: false,
        message: 'Logbook entry not found'
      });
    }

    // Check if user is the owner
    if (logbook.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this logbook entry'
      });
    }

    // Check if already approved
    if (logbook.status === 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update approved logbook entry'
      });
    }

    const updatedLogbook = await Logbook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Logbook entry updated successfully',
      data: updatedLogbook
    });
  } catch (error) {
    console.error('Update logbook error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/logbooks/:id/submit
// @desc    Submit logbook entry for review
// @access  Private (Student)
router.put('/:id/submit', auth, authorize('student'), async (req, res) => {
  try {
    const logbook = await Logbook.findById(req.params.id);

    if (!logbook) {
      return res.status(404).json({
        success: false,
        message: 'Logbook entry not found'
      });
    }

    // Check if user is the owner
    if (logbook.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to submit this logbook entry'
      });
    }

    // Check if already submitted
    if (logbook.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Logbook entry already submitted'
      });
    }

    const updatedLogbook = await Logbook.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'submitted',
        submittedAt: new Date()
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Logbook entry submitted successfully',
      data: updatedLogbook
    });
  } catch (error) {
    console.error('Submit logbook error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/logbooks/:id/review
// @desc    Review logbook entry
// @access  Private (Faculty/Industry/Admin)
router.put('/:id/review', auth, authorize('faculty', 'industry', 'admin'), [
  body('status').isIn(['approved', 'rejected']),
  body('feedback').optional().trim(),
  body('rating').optional().isInt({ min: 1, max: 5 })
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

    const { status, feedback, rating } = req.body;

    const logbook = await Logbook.findById(req.params.id);

    if (!logbook) {
      return res.status(404).json({
        success: false,
        message: 'Logbook entry not found'
      });
    }

    const updateData = {
      status,
      reviewedAt: new Date(),
      reviewedBy: req.user._id
    };

    if (feedback) updateData.feedback = feedback;
    if (rating) updateData.rating = rating;

    const updatedLogbook = await Logbook.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('student', 'profile.firstName profile.lastName profile.email');

    res.json({
      success: true,
      message: 'Logbook entry reviewed successfully',
      data: updatedLogbook
    });
  } catch (error) {
    console.error('Review logbook error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/logbooks/:id
// @desc    Get single logbook entry
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const logbook = await Logbook.findById(req.params.id)
      .populate('student', 'profile.firstName profile.lastName profile.email')
      .populate('internship', 'title company');

    if (!logbook) {
      return res.status(404).json({
        success: false,
        message: 'Logbook entry not found'
      });
    }

    // Check authorization
    const isStudent = logbook.student._id.toString() === req.user._id.toString();
    const isFaculty = req.user.role === 'faculty' || req.user.role === 'admin';
    const isIndustry = req.user.role === 'industry' || req.user.role === 'admin';

    if (!isStudent && !isFaculty && !isIndustry) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this logbook entry'
      });
    }

    res.json({
      success: true,
      data: logbook
    });
  } catch (error) {
    console.error('Get logbook error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

