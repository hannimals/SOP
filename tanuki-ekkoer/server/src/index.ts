import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { profileRouter } from './routes/profile';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
    console.log(`INCOMING REQUEST: ${req.method} ${req.url} from ${req.headers.origin || 'unknown'}`);
    next();
});

app.use(cors({
    origin: true, // Allow all origins temporarily for debugging
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); /**this whitelists our backend to be utilized in our client */
app.use(cookieParser()); /** this allows us */

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, { 
        body: req.body, 
        headers: req.headers,
        origin: req.headers.origin 
    });
    next();
});

app.use(express.json()); /** middleware that allows us to read json for every request that leaves our app */

//API routes
app.use("/api/profile", profileRouter);

app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});