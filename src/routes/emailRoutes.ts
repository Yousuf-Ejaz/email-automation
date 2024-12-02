import { Router } from 'express';
import { EmailAnalyzerController } from '../controllers/emailAnalyzerController';

const router = Router();
const controller = new EmailAnalyzerController();

router.post('/analyze', controller.analyzeEmail);

export default router; 