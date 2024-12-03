import { google } from 'googleapis';
import { config } from '../config/config';

export class GoogleCalendarService {
    private calendar: any;

    constructor() {
        const auth = new google.auth.JWT({
            email: config.googleServiceAccount.email,
            key: config.googleServiceAccount.privateKey,
            scopes: ['https://www.googleapis.com/auth/calendar']
        });

        this.calendar = google.calendar({ version: 'v3', auth });
    }

    async createCalendarEvent(calendarItem: any) {
        try {
            const event = {
                summary: calendarItem.title,
                description: calendarItem.description,
                start: {
                    dateTime: calendarItem.dateTime,
                    timeZone: 'UTC',
                },
                end: {
                    dateTime: this.calculateEndTime(calendarItem.dateTime, calendarItem.duration),
                    timeZone: 'UTC',
                },
                attendees: calendarItem.attendees.map((email: string) => ({ email })),
            };

            const response = await this.calendar.events.insert({
                calendarId: 'primary',
                requestBody: event,
            });

            return response.data;
        } catch (error) {
            console.error('Error creating calendar event:', error);
            throw error;
        }
    }

    private calculateEndTime(startTime: string, durationMinutes: number): string {
        const end = new Date(startTime);
        end.setMinutes(end.getMinutes() + durationMinutes);
        return end.toISOString();
    }
} 