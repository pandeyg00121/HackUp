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
  prizes: {
    type: String,
    default: "Exciting prizes await the winners!",
  },
  // You can add additional fields like website URL, registration link, etc.
  website: String,
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
});

// Pre-save middleware to generate a unique slug from the title before saving
hackathonSchema.pre('save', async function () {
  this.slug = slugify(this.title, { lower: true, strict: true });
});

export default mongoose.model('Hackathon', hackathonSchema);
