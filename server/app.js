import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
// Enable CORS middleware
app.use(cors());

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
// app.use(cookieParser());

//for develpment and status code on console
app.use(morgan("dev"));

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
