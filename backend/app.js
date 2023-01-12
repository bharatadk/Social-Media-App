import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: "./backend/config/config.env" });
}

// Using MIDDLEWARES
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({limit: '1mb', extended: true}));

// Importing ROUTES
import { post } from "./routes/post.js";
import { user } from "./routes/user.js";

// Using ROUTES
app.use("/api/v1", post);
app.use("/api/v1", user);


export { app };
