import mongoose from 'mongoose';
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

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
  },
  verified: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    select:false,
    required: [true, "A User must have a password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    select:false,
    required: [true, "Please Confirm Your Password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password And Confirm Password Do not match",
    },
  },
  // Array of ObjectIds referencing hackathons the publisher wants to publish
  hackathons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon',
  }],
  accountCreatedAt: Date,
});

publisherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

publisherSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.model('Publisher', publisherSchema);
