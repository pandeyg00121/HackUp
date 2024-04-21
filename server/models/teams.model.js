import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Team must have a name"],
    unique: true,
    minlength: 3,
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: [true, "A Team must have at least one member"],
    validate: {
      validator: (value) => value.length <= 4,
      message: "Team size cannot exceed 4 members!",
    },
  },
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon',
    required: [true, "A Team must be registered for a hackathon"],
  },
  description: {
    type: String,
  },
  skills: {
    type: [String],
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  teamCode:{
type: String,
// required:true,
  },
  projectUrl: {
    type: String,
  },
//   submission: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Submission', // Reference to a separate Submission model (optional)
//   },
});

// Pre-save middleware to validate team size before saving
teamSchema.pre('save', function (next) {
  if (this.members.length > 4) {
    return next(new Error("Team size cannot exceed 4 members!"));
  }
  next();
});

export default mongoose.model('Team', teamSchema);
