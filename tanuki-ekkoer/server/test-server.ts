import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
// import { profileRouter } from './src/routes/profile.ts';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/profile", profileRouter);

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});