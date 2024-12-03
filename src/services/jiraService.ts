import JiraApi from 'jira-client';
import { config } from '../config/config';

export class JiraService {
    private jira: InstanceType<typeof JiraApi>;

    constructor() {
        this.jira = new JiraApi({
            protocol: 'https',
            host: config.jira.host as string,
            username: config.jira.email,
            password: config.jira.apiToken,
            apiVersion: '2',
            strictSSL: true
        });
    }

    async createJiraTicket(ticket: any) {
        try {
            const issueData = {
                fields: {
                    project: { key: config.jira.projectKey },
                    summary: ticket.title,
                    description: ticket.description,
                    issuetype: { name: ticket.type },
                    priority: { name: this.mapPriority(ticket.priority) },
                    assignee: { name: ticket.assignee },
                    labels: ticket.labels
                }
            };

            const response = await this.jira.addNewIssue(issueData);
            return response;
        } catch (error) {
            console.error('Error creating JIRA ticket:', error);
            throw error;
        }
    }

    private mapPriority(priority: string): string {
        const priorityMap: { [key: string]: string } = {
            high: 'Highest',
            medium: 'Medium',
            low: 'Low'
        };
        return priorityMap[priority] || 'Medium';
    }
} 