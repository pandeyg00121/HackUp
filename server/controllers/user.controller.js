import User from "./../models/user.model.js";
import catchAsync from "./../utils/catchAsync.js";
import AppError from "./../utils/appError.js";


const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    //if this set to false then the built in validators will not be checked
  });

  if (!user) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
    message: "Document Deleted Successfully",
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).send(user);
});
///api/users?search=pr
const getAllUsers = catchAsync(async (req, res, next) => {
  console.log("wwe",req.query.search);
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const updateStatus = catchAsync(async (req, res, next) => {
  const newStatus = req.body.status;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, {active:newStatus}, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    status: "success",
    data: {
      data: updatedUser,
    },
  });
});

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};


const updateMe = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  //1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password update.Please use update password",
        400
      )
    );
  }
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});


const updateRating = async (userId, hackathonId) => {
  try {
    const user = await User.findById(userId);
    const hackathon = await Hackathon.findById(hackathonId);

    if (!user || !hackathon) {
      throw new AppError('User or Hackathon not found', 404);
    }

    // Calculate new rating based on user's performance
    const oldRating = user.rating;
    const K = 30; // K-factor for Elo rating system
    const expectedScore = 1 / (1 + 10 ** ((hackathon.averageRating - oldRating) / 400));
    const actualScore = 1; // Assume winner gets full score
    const newRating = Math.round(oldRating + K * (actualScore - expectedScore));

    // Update user's rating
    user.rating = Math.max(1000, Math.min(3000, newRating)); // Limit rating to range [1000, 3000]

    // Increment totalHackathons participated in
    user.totalHackathons = user.totalHackathons ? user.totalHackathons + 1 : 1;

    // Increment hackathonsWon if user is a winner
    if (hackathon.winningTeams.includes(user.team)) {
      user.hackathonsWon = user.hackathonsWon ? user.hackathonsWon + 1 : 1;
    }

    // Update lastActive to current date
    user.lastActive = Date.now();

    // Save the updated user
    await user.save();

    return user;
  } catch (error) {
    throw new AppError('Error updating user rating', 500);
  }
};



export default {updateRating ,updateUser, deleteUser, getUser,  getAllUsers,updateStatus, getMe, updateMe , deleteMe}