import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import emailRoutes from './routes/emailRoutes';
import { config } from './config/config';
import { logger } from './utils/logger';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/emails', emailRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
});

export default app; 