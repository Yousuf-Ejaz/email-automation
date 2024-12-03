import { Request, Response } from 'express';
import { EmailAnalyzerService } from '../services/emailAnalyzerService';
import { Email } from '../models/types';

export class EmailAnalyzerController {
    private emailAnalyzerService: EmailAnalyzerService;

    constructor() {
        this.emailAnalyzerService = new EmailAnalyzerService();
    }

    analyzeEmail = async (req: Request, res: Response) => {
        try {
            const email = req.body;
            const analysis = await this.emailAnalyzerService.analyzeEmail(email);
            res.json(analysis);
        } catch (error) {
            console.error('Controller error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public analyzeEmails = async (emails: Email[]) => {
        return Promise.all(emails.map(email => this.emailAnalyzerService.analyzeAndProcess(email)));
    }
} 