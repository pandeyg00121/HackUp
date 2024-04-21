import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
// Enable CORS middleware
app.use(cors());

import userRouter from "./routes/user.routes.js";

import publisherRouter from "./routes/publisher.route.js";
import teamRouter from "./routes/teams.route.js";

import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";

// import gitRouter from "./routes/git.routes.js";
import hackathonRouter from "./routes/hackathon.routes.js"

// import gitRouter from "./routes/git.routes.js";





app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
});
//cross site scripting overcome
app.use(bodyParser.urlencoded({ limit: "10kb", extended: false }));
app.use(cookieParser());

//for develpment and status code on console
app.use(morgan("dev"));

app.use("/api/users", userRouter);

app.use("/api/publishers", publisherRouter);
app.use("/api/teams", teamRouter);

app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
// app.use("/api/git", gitRouter);

app.use("/api/hackathons",hackathonRouter);

app.use("/api/hackathons", hackathonRouter);
// app.use("/api/git", gitRouter);



app.use('/',(req,res)=>{
  res.status(200).json({
      status: "success",
      message: "this is home page"
  })
});

app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "Failed",
        message: `Can't find ${req.originalUrl} on this server now`
    })
});

export { app };
