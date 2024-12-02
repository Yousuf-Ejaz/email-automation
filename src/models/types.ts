export interface Email {
    id: string;
    subject: string;
    from: string;
    to: string[];
    cc?: string[];
    body: string;
    timestamp: Date;
    threadId?: string;
    attachments?: string[];
}

export interface AnalysisResult {
    emailId: string;
    calendarItems?: any[];
    jiraTickets?: any[];
    highlights?: any[];
} 