import mongoose from 'mongoose';

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Publisher must have a name"],
  },
  email: {
    type: String,
    required: [true, "A Publisher must have an Email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        // Regular expression for email validation (optional)
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  verified: {
    type: Boolean,
    default: false,
  },
  // Array of ObjectIds referencing hackathons the publisher wants to publish
  hackathons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon',
  }],
});

export default mongoose.model('Publisher', publisherSchema);
