const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
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
  company: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  achievements: [{
    type: String,
    trim: true
  }],
  performance: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    feedback: String,
    strengths: [String],
    areasForImprovement: [String]
  },
  certificate: {
    url: String,
    issuedAt: {
      type: Date,
      default: Date.now
    },
    validUntil: Date,
    credentialId: {
      type: String,
      unique: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'issued', 'verified', 'revoked'],
    default: 'pending'
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },
  blockchainHash: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Generate unique credential ID
credentialSchema.pre('save', function(next) {
  if (!this.certificate.credentialId) {
    this.certificate.credentialId = `PRS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  next();
});

credentialSchema.index({ student: 1 });
credentialSchema.index({ 'certificate.credentialId': 1 });
credentialSchema.index({ status: 1 });

module.exports = mongoose.model('Credential', credentialSchema);

