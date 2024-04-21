import crypto from "crypto";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import axios from "axios";
// import sendMail from "./../utils/sendMail";

import Publisher from "../models/publisher.model.js";
import Hackathon from "../models/hackathon.model.js";
import Team from "../models/teams.model.js";
import User from "../models/user.model.js";
import catchAsync from "./../utils/catchAsync.js";
import AppError from "./../utils/appError.js";

const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  
  const createSendToken = catchAsync(async (publisher, statusCode, res) => {
    const token = signToken(publisher._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.cookie("jwt", token, cookieOptions);
  
    return res.status(statusCode).json({
      status: "success",
      token,
      data: {
        publisher,
      },
    });
  });

  const signup = catchAsync(async (req, res, next) => {
  
    const newPublisher = await Publisher.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      accountCreatedAt: Date.now(),
    });
    
    await newPublisher.save({ validateBeforeSave: false });  
    createSendToken(newPublisher, 201, res);
  });
  
  const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(new AppError("Please Provide email and password", 400));
    }
  
    const publisher = await Publisher.findOne({ email }).select("+password");
   
    const correct = await publisher.correctPassword(password, publisher.password);
  
    if (!publisher || !correct) {
      return next(new AppError("Incorrect Email or password", 401));
    }
    if (!publisher.verified) {
      return next(
        new AppError(
          `Your account is not verified by Admin`,
          401
        )
      );
    }
    createSendToken(publisher, 200, res);
  });
  
  const logout = (req, res) => {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: "success" });
  };
  
  const protect = catchAsync(async (req, res, next) => {
    let token;
    // 1) Getting token and check of it's there
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }
      console.log(token)
  
    if (!token) {
      //401 stands for unauthorized
      return next(
        new AppError("You are not logged in ! Please log in to get acess", 401)
      );
    }
    //2)Verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    console.log(decoded.id);
    const freshPublisher = await Publisher.findById(decoded.id);
    console.log(freshPublisher)
    if (!freshPublisher) {
      return next(
        new AppError("The publisher belonging to this token does not exist.", 401)
      );
    }
    res.locals.publisher = freshPublisher;
    req.publisher = freshPublisher;
    next();
  });
  
// Get all publishers (optional, can add filtering/pagination later)
const getAllPublishers = catchAsync(async (req, res) => {
  const publishers = await Publisher.find();
  res.status(200).json({
    status: "success",
    results: publishers.length,
    data: {
      publishers,
    },
  });
});

// Get a single publisher by ID
const getPublisherById = catchAsync(async (req, res) => {
  const publisher = await Publisher.findById(req.params.id)
    .populate('hackathons'); // Include populated hackathons (optional)
  if (!publisher) {
    throw new AppError(404, "No publisher found with that ID");
  }
  res.status(200).json({
    status: "success",
    data: {
      publisher,
    },
  });
});




// Function to verify a publisher (assuming logic for admin verification)
const verifyPublisher = catchAsync(async (req, res) => {
  const publisher = await Publisher.findByIdAndUpdate(
    req.params.id,
    { verified: true },
    { new: true }
  );
  if (!publisher) {
    throw new AppError(404, "No publisher found with that ID");
  }
  res.status(200).json({
    status: "success",
    data: {
      publisher,
    },
  });
});

// Function to create a new Hackathon by a Publisher
const createHackathon = catchAsync(async (req, res) => {
  // console.log(req.params);
  const {
    title,
    description,
    // categories,
    startDate,
    endDate,
    teamSizeOptions,
    prizePool, 
    // registrationLink,
    // imageUrl,
    registrationEndDate,
  } = req.body;

  // Get the logged-in publisher from req
  const { publisher } = req;
  // console.log(req.body);

  // Create a new Hackathon
  const newHackathon = await Hackathon.create({
    title,
    description,
    organizer: req.params.id, // Set the organizer as the current publisher
    // categories,
    startDate,
    endDate,
    teamSizeOptions,
    prizePool,
    // registrationLink,
    // imageUrl,
    registrationEndDate,
    published: true, // Assuming newly created hackathons are automatically published
  });

  res.status(201).json({
    status: "success",
    data: {
      hackathon: newHackathon,
    },
  });
});

const viewHackathons = catchAsync(async (req, res, next) => {
  const { publisherId } = req.params;

  // Get current date
  const currentDate = new Date();

  // Fetch hackathons
  const pastHackathons = await Hackathon.find({
    publisher: publisherId,
    endDate: { $lt: currentDate },
    resultDeclared: true,
  });

  const upcomingHackathons = await Hackathon.find({
    publisher: publisherId,
    startDate: { $gt: currentDate },
  });

  const liveHackathons = await Hackathon.find({
    publisher: publisherId,
    startDate: { $lte: currentDate },
    endDate: { $gte: currentDate },
    resultDeclared: false,
  });

  if (!pastHackathons || !upcomingHackathons || !liveHackathons) {
    return next(new AppError('Failed to fetch hackathons', 500));
  }

  res.status(200).json({
    success: true,
    data: {
      pastHackathons,
      upcomingHackathons,
      liveHackathons,
    },
  });
});

const chooseWinningTeams = catchAsync(async (req, res, next) => {
  const  hackathonId  = req.params.id;
  const { winningTeamIds } = req.body;

  const hackathon = await Hackathon.findByIdAndUpdate(
    hackathonId,
    { winningTeams: winningTeamIds },
    { new: true }
  );

  if (!hackathon) {
    return next(new AppError('Hackathon not found', 404));
  }
 // Update hackathon's winning teams
 hackathon.winningTeams = winningTeamIds;
 await hackathon.save();

 // Increment number of hackathons won for each member of the winning teams
 for (const teamId of winningTeamIds) {
   const team = await Team.findById(teamId);
   if (!team) {
     continue; // Skip if team not found
   }

   // Update hackathonsWon for each member of the team
   for (const memberId of team.members) {
     const user = await User.findById(memberId);
     if (!user) {
       continue; // Skip if user not found
     }

     user.hackathonsWon = user.hackathonsWon ? user.hackathonsWon + 1 : 1; // Increment hackathonsWon
     await user.save();
   }
 }

  res.status(200).json({
    success: true,
    data: {
      hackathon,
    },
  });
});

const viewHackathonTeams = catchAsync(async (req, res, next) => {
   const hackathonId  = req.params.id;
  //  console.log(hackathonId)
  //  console.log(req.params);
  //  console.log("me");
  const teams = await Team.find({ hackathon: hackathonId });
  // console.log(teams);

  if (!teams) {
    return next(new AppError('Teams not found for this hackathon', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      teams,
    },
  });
});

// Function to view winning teams for a hackathon
const viewWinningTeams = catchAsync(async (req, res, next) => {
  const hackathonId  = req.params.id;

  // Find the hackathon by ID
  console.log(hackathonId);
  const hackathon = await Hackathon.findById(hackathonId);
  console.log(hackathon);
  if (!hackathon) {
    return next(new AppError('Hackathon not found', 404));
  }

  // Check if winning teams are chosen
  if (!hackathon.winningTeams || hackathon.winningTeams.length === 0) {
    return next(new AppError('Winning teams not chosen for this hackathon', 404));
  }

  // Find the winning teams
  const winningTeams = await Team.find({ _id: { $in: hackathon.winningTeams } }).populate("members");

  if (!winningTeams) {
    return next(new AppError('No winning teams found for this hackathon', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      winningTeams,
    },
  });
});

// Exports at the end
export default {
  viewWinningTeams,
  viewHackathonTeams,
   chooseWinningTeams,
  viewHackathons,
  createHackathon,
  getAllPublishers,
  getPublisherById,
  verifyPublisher,
  signup,
  login,
  logout,
  protect
};
