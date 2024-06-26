import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import Hackathon from './../models/hackathon.model.js';
import Team from './../models/teams.model.js';


// Register for a Hackathon (either individually or as part of a team)
// const registerForHackathon = catchAsync(async (req, res, next) => {
//     const { hackathonId, teamCode, userId, teamName } = req.body;
  
//     // Check if the hackathon exists
//     const hackathon = await Hackathon.findById(hackathonId);
//     if (!hackathon) {
//       return next(new AppError('Hackathon not found', 404));
//     }
  
//     // Check if registration is still open
//     const currentDate = new Date();
//     if (currentDate > hackathon.registrationEndDate || currentDate > hackathon.endDate) {
//       return next(new AppError('Registration is closed', 400));
//     }
  
//     if (teamCode) {
//       // If team code is provided, join the existing team
//       const team = await Team.findOne({ teamCode: teamCode, hackathon: hackathonId });
//       if (!team) {
//         return next(new AppError('Team not found', 404));
//       }
//        // Check if user is already a member of the team
//     if (team.members.includes(userId)) {
//         return next(new AppError('User is already a member of the team', 400));
//       }
      
//       // Check if team size limit is reached
//       if (team.members.length >= 4) {
//         return next(new AppError('Team size limit reached (maximum 4 members)', 400));
//       }
//       // Add the user to the team
//       team.members.push(userId);
//       await team.save();
      
//       return res.status(200).json({ success: true, data: team });
//     } else {
//       // If no team code, create a new team
//       const newTeamCode = generateTeamCode(); // Generate a unique team code
//       const newTeam = await Team.create({
//         name: teamName || `Team ${newTeamCode}`, // Use provided team name or default
//         hackathon: hackathonId,
//         leader: userId,
//         members: [userId],
//         teamCode: newTeamCode, // Assign the generated team code
//       });
  
//       // Update the hackathon's list of teams
//       hackathon.teams.push(newTeam._id);
//       await hackathon.save();
  
//       return res.status(200).json({ success: true, data: newTeam });
//     }
//   });

const createTeam = catchAsync(async (req, res, next) => {
    const {teamName}  = req.body;
    const  hackathonId  = req.params.id;
    console.log("abc",req.user)
    const  userId  = req.user.id;

    // const teamName  = req.body;
    console.log(userId,teamName,hackathonId);
  
    // Check if the hackathon exists
    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) {
      return next(new AppError('Hackathon not found', 404));
    }
  
    // Check if registration is still open
    const currentDate = new Date();
    if (currentDate > hackathon.registrationEndDate || currentDate > hackathon.endDate) {
      return next(new AppError('Registration is closed', 400));
    }
  
    const newTeamCode = generateTeamCode(); // Generate a unique team code
    const newTeam = await Team.create({
      name: teamName || `Team ${newTeamCode}`, // Use provided team name or default
      hackathon: hackathonId,
      leader: userId,
      members: [userId],
      teamCode: newTeamCode, // Assign the generated team code
    });
  
    // Update the hackathon's list of teams
    hackathon.teams.push(newTeam._id);
    await hackathon.save();
  
    res.status(200).json({ success: true, data: newTeam });
  });

  const joinTeam = catchAsync(async (req, res, next) => {
    // const  userId  = req.cookies;
    const { teamCode}  = req.body;
    const  userId  = req.user.id;
    const  hackathonId  = req.params.id;
   
  
    // Check if the hackathon exists
    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) {
      return next(new AppError('Hackathon not found', 404));
    }
  
    // Check if registration is still open
    const currentDate = new Date();
    if (currentDate > hackathon.registrationEndDate || currentDate > hackathon.endDate) {
      return next(new AppError('Registration is closed', 400));
    }
  
    // Find the team by team code
    const team = await Team.findOne({ teamCode, hackathon: hackathonId });
    if (!team) {
      return next(new AppError('Team not found', 404));
    }
  
    // Check if user is already a member of the team
    if (team.members.includes(userId)) {
      return next(new AppError('User is already a member of the team', 400));
    }
  
    // Check if team size limit is reached
    if (team.members.length >= 4) {
      return next(new AppError('Team size limit reached (maximum 4 members)', 400));
    }
  
    // Add the user to the team
    team.members.push(userId);
    await team.save();
  
    res.status(200).json({ success: true, data: team });
  });
  

// Function to generate a random alphanumeric team code
function generateTeamCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const codeLength = 6;
  let code = '';
  for (let i = 0; i < codeLength; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

const upcomingHackathon = catchAsync( async(req,res,next)=>{
    try{
    const data = await Hackathon.find({
    "startDate": {
        "$gt": new Date() // Greater than today's date
    }
    })


    console.log("abcde",data);

     return res.status(200).json({ success: true, data: data });
    }catch(error){
      return next(new AppError('Hackathon not found', 404));
    }
});

const liveHackathon = catchAsync( async(req,res,next)=>{
    try{

     const data = await Hackathon.find({
    "startDate": { "$lte": new Date() },
    "endDate": { "$gte": new Date()}
    })
    console.log(data);

     return res.status(200).json({ success: true, data: data });
    }catch(error){
      return next(new AppError('Hackathon not found', 404));
    }
});
const pastHackathon = catchAsync( async(req,res,next)=>{
    try{
    const data = await Hackathon.find({
    "endDate": {
        "$lt": new Date() // Greater than today's date
    }
    })

     return res.status(200).json({ success: true, data: data });
    }catch(error){
      return next(new AppError('Hackathon not found', 404));
    }
});




export {createTeam, joinTeam, upcomingHackathon,liveHackathon,pastHackathon};

