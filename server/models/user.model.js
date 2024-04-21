import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A User must have a name"],
  },
  email: {
    type: String,
    required: [true, "A User must have a Email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        // Regular expression to match email addresses ending with "@mnnit.ac.in"
        const emailRegex = /^[a-zA-Z0-9._%+-]+@mnnit\.ac\.in$/;
        return emailRegex.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid email address ending with @mnnit.ac.in!`,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: [true, "An account must have its type"],
    default: "user",
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
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
  profilePic: {
    type: String,
    default: "",
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  verificationCode:{
    type:String,
    select:false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  accountCreatedAt: Date,
  rating: {
    type: Number,
    default: 1000, // Default rating for a new user
  },
  totalHackathons: {
    type: Number,
    default: 0, // Total hackathons participated in
  },
  hackathonsWon:{
type: Number,
default:0
  },
  lastActive: {
    type: Date,
    default: Date.now, // Last active date
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};


userSchema.methods.createPasswordResetToken = function () {
  //generating a token
  const resetToken = crypto.randomBytes(32).toString("hex");
  //hashing  the token before savin to DB by sha256 algo
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //ten minutes to reset otherwise token expires
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createVerificationCode = function () {

  const verificationCode = crypto.randomBytes(32).toString("hex");
  //hashing  the token before savin to DB by sha256 algo
  this.verificationCode = crypto
    .createHash("sha256")
    .update(verificationCode)
    .digest("hex");

  return verificationCode;
};

export default mongoose.model("User", userSchema);



