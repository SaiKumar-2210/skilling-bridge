const mongoose = require('mongoose');

const logbookSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Logbook title is required'],
    trim: true
  },
  week: {
    type: Number,
    required: [true, 'Week number is required'],
    min: 1
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  tasksCompleted: [{
    task: {
      type: String,
      required: true,
      trim: true
    },
    description: String,
    hoursSpent: {
      type: Number,
      min: 0
    }
  }],
  skillsLearned: [{
    skill: {
      type: String,
      required: true,
      trim: true
    },
    proficiency: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    }
  }],
  challenges: [{
    challenge: {
      type: String,
      required: true,
      trim: true
    },
    solution: String,
    outcome: String
  }],
  achievements: [{
    achievement: {
      type: String,
      required: true,
      trim: true
    },
    impact: String
  }],
  reflection: {
    type: String,
    required: [true, 'Weekly reflection is required']
  },
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  status: {
    type: String,
    enum: ['draft', 'submitted', 'approved', 'rejected'],
    default: 'draft'
  },
  submittedAt: {
    type: Date
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  feedback: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
});

// Index for efficient queries
logbookSchema.index({ student: 1, internship: 1, week: 1 });
logbookSchema.index({ status: 1, submittedAt: 1 });

module.exports = mongoose.model('Logbook', logbookSchema);

