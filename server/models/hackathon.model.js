import mongoose from 'mongoose';
import slugify from 'slugify';
import validator from "validator";

const hackathonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A Hackathon must have a title"],
    unique: true,
    trim: true,
    minlength: 3,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "A Hackathon must have a description"],
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher', // Reference the Publisher schema
  },
  // Array of strings representing hackathon categories (e.g., "Web Dev", "Machine Learning")
  categories: [String],
  startDate: {
    type: Date,
    required: [true, "A Hackathon must have a start date"],
  },
  endDate: {
    type: Date,
    required: [true, "A Hackathon must have an end date"],
    validate: {
      validator: function (value) {
        // Ensure end date is after start date
        return value > this.startDate;
      },
      message: "End date must be after start date!",
    },
  },
  teamSizeOptions: {
    type: [{
      min: {
        type: Number,
        required: true,
        min: 1,
      },
      max: {
        type: Number,
        required: true,
        validate: {
          validator: function (value) {
            return value > this.min; // Ensure max is greater than min
          },
          message: "Max team size must be greater than min team size",
        },
      },
    }],
    description: "Allowed team size options (min and max members)",
  },
  prizePool: {
    type: Number,
  },
  registrationLink: String,
  // Reference to an array of Team documents representing participating teams (optional)
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  }],
  // Reference to an array of User documents representing registered users (optional)
  registeredUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  published: {
    type: Boolean,
    default: false,
  },
  imageUrl: String,
  registrationEndDate: {
    type: Date,
    validate: {
      validator: function (value) {
        // Optional validation: Ensure registration end date is before end date
        return value < this.endDate;
      },
      message: "Registration end date must be before hackathon end date!",
    },
  },
});

// Pre-save middleware to generate a unique slug from the title before saving
hackathonSchema.pre('save', async function () {
  this.slug = slugify(this.title, { lower: true, strict: true });
});

export default mongoose.model('Hackathon', hackathonSchema);
