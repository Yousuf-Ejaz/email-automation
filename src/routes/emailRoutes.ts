import { Router } from 'express';
import { EmailAnalyzerController } from '../controllers/emailAnalyzerController';
import { sampleEmails } from '../data/sampleEmails';

const router = Router();
const controller = new EmailAnalyzerController();

router.post('/analyze', controller.analyzeEmail);

router.get('/analyze-all', async (req, res) => {
    try {
        const results = await controller.analyzeEmails(sampleEmails);
        res.json(results);
    } catch (error) {
        console.error('Error processing sample emails:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router; 