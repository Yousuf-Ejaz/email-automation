import { GoogleGenerativeAI } from '@google/generative-ai';
import { Email, AnalysisResult } from '../models/types';
import { config } from '../config/config';

export class EmailAnalyzerService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        this.genAI = new GoogleGenerativeAI(config.geminiApiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }

    async analyzeEmail(email: Email): Promise<AnalysisResult> {
        try {
            const prompt = this.buildPrompt(email);
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            // Clean the response text before parsing
            const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
            
            try {
                const analysis = JSON.parse(cleanedText);
                return {
                    emailId: email.id,
                    calendarItems: analysis.calendarItems || [],
                    jiraTickets: analysis.jiraTickets || [],
                    highlights: analysis.highlights || []
                };
            } catch (parseError) {
                console.error('Error parsing JSON response:', cleanedText);
                throw new Error('Failed to parse AI response');
            }
        } catch (error) {
            console.error('Error analyzing email:', error);
            throw error;
        }
    }

    private buildPrompt(email: Email): string {
        return `You are a JSON-only response API. Analyze this email and return a JSON object with calendar items, JIRA tickets, and highlights. Do not include any markdown formatting or explanation text.

        Email Details:
        Subject: ${email.subject}
        From: ${email.from}
        To: ${email.to.join(', ')}
        Body: ${email.body}
        
        Response must be valid JSON matching this structure:
        {
            "calendarItems": [
                {
                    "type": "meeting/deadline/followup",
                    "title": "string",
                    "dateTime": "ISO string",
                    "duration": "number in minutes",
                    "priority": "high/medium/low",
                    "attendees": ["string"]
                }
            ],
            "jiraTickets": [
                {
                    "type": "task/bug/story",
                    "title": "string",
                    "description": "string",
                    "priority": "high/medium/low",
                    "assignee": "string",
                    "labels": ["string"]
                }
            ],
            "highlights": [
                {
                    "type": "decision/action/announcement",
                    "content": "string",
                    "priority": "high/medium/low"
                }
            ]
        }`;
    }
} 