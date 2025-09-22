const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Internship = require('../models/Internship');
const Application = require('../models/Application');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/internships
// @desc    Get all internships with filters
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('search').optional().trim(),
  query('category').optional().trim(),
  query('type').optional().isIn(['remote', 'onsite', 'hybrid']),
  query('status').optional().isIn(['draft', 'active', 'paused', 'closed', 'completed'])
], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { status: 'active' };
    
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.type) {
      filter.type = req.query.type;
    }
    
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const internships = await Internship.find(filter)
      .populate('postedBy', 'profile.firstName profile.lastName profile.company')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Internship.countDocuments(filter);

    res.json({
      success: true,
      data: internships,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get internships error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/internships/:id
// @desc    Get single internship
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate('postedBy', 'profile.firstName profile.lastName profile.company profile.designation');

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    res.json({
      success: true,
      data: internship
    });
  } catch (error) {
    console.error('Get internship error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/internships
// @desc    Create new internship
// @access  Private (Industry/Admin)
router.post('/', auth, authorize('industry', 'admin'), [
  body('title').notEmpty().trim(),
  body('description').notEmpty(),
  body('company').notEmpty().trim(),
  body('location').notEmpty().trim(),
  body('type').isIn(['remote', 'onsite', 'hybrid']),
  body('duration').isInt({ min: 1, max: 52 }),
  body('startDate').isISO8601(),
  body('endDate').isISO8601(),
  body('applicationDeadline').isISO8601(),
  body('category').notEmpty().trim()
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

    const internshipData = {
      ...req.body,
      postedBy: req.user._id
    };

    const internship = new Internship(internshipData);
    await internship.save();

    res.status(201).json({
      success: true,
      message: 'Internship created successfully',
      data: internship
    });
  } catch (error) {
    console.error('Create internship error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/internships/:id
// @desc    Update internship
// @access  Private (Owner/Admin)
router.put('/:id', auth, async (req, res) => {
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
        message: 'Not authorized to update this internship'
      });
    }

    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Internship updated successfully',
      data: updatedInternship
    });
  } catch (error) {
    console.error('Update internship error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/internships/:id
// @desc    Delete internship
// @access  Private (Owner/Admin)
router.delete('/:id', auth, async (req, res) => {
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
        message: 'Not authorized to delete this internship'
      });
    }

    await Internship.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Internship deleted successfully'
    });
  } catch (error) {
    console.error('Delete internship error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/internships/my/posted
// @desc    Get internships posted by current user
// @access  Private
router.get('/my/posted', auth, async (req, res) => {
  try {
    const internships = await Internship.find({ postedBy: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: internships
    });
  } catch (error) {
    console.error('Get my internships error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/internships/categories
// @desc    Get all categories
// @access  Public
router.get('/data/categories', async (req, res) => {
  try {
    const categories = await Internship.distinct('category');
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

