import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { Request, Response } from "express";
import cookieParser from 'cookie-parser';

import notFoundMiddleware from "./src/middleware/error-middleware";
import errorHandlerMiddleware from "./src/middleware/error-middleware";

import router from "./src/routes/auth-route";

const app = express();
const authRoute = router;

// parse the jason body and dealing wiyh my cookies:
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  //origin: 'http://localhost:3000', //frontend URL
  origin: ["http://localhost:3000", "https://brainiactask.onrender.com"],
  credentials: true, // Allow cookies and credentials
};
https://api-brainiactask.onrender.com   api-brainiactask

app.use(cors(corsOptions));

//routes:
app.get("/",(req:Request,res:Response)=>{
    res.send("<h1>This is the app.ts checking in </h1>")
});

app.use("/api/v1/auth",authRoute);

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
let url:any;
url = process.env.MONGODB_URI

const start = async () => {
  try {
    await mongoose.connect(url);
    app.listen(5000, "localhost", () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error)
  };
};

start()


// npm install --save-dev @types/cookie-parser
