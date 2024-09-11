import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { authRoutes, userRoutes, loanRoutes, expenseRoutes, paymentRoutes, financeRoutes } from './routes/exports.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
}))
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', loanRoutes);
app.use('/api', expenseRoutes);
app.use('/api', paymentRoutes);
app.use('/api', financeRoutes);

export default app;