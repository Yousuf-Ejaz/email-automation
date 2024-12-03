import React from 'react';

const EmailAnalysisResults = ({ results }) => {
    // Initialize arrays to hold grouped items
    const allCalendarItems = [];
    const allJiraTickets = [];
    const allHighlights = [];
    const allAnnouncements = [];

    // Collate items from all emails
    results.forEach(email => {
        allCalendarItems.push(...email.calendarItems);
        allJiraTickets.push(...email.jiraTickets);
        allHighlights.push(...email.highlights);

        // Collect announcements specifically
        const announcements = email.highlights.filter(highlight => highlight.type === 'announcement');
        allAnnouncements.push(...announcements);
    });

    return (
        <div>
            <h2>Collated Results</h2>

            {allCalendarItems.length > 0 && (
                <div>
                    <h3>Calendar Items</h3>
                    <ul>
                        {allCalendarItems.map((item, index) => (
                            <li key={index}>
                                <strong>{item.title}</strong> - {item.dateTime} ({item.duration} mins)
                                <br />
                                <em>Priority: {item.priority}</em>
                                <br />
                                <em>Attendees: {item.attendees.join(', ') || 'None'}</em>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {allJiraTickets.length > 0 && (
                <div>
                    <h3>JIRA Tickets</h3>
                    <ul>
                        {allJiraTickets.map((ticket, index) => (
                            <li key={index}>
                                <strong>{ticket.title}</strong>
                                <br />
                                <em>Description: {ticket.description}</em>
                                <br />
                                <em>Priority: {ticket.priority}</em>
                                <br />
                                <em>Assignee: {ticket.assignee || 'Unassigned'}</em>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {allHighlights.length > 0 && (
                <div>
                    <h3>Highlights</h3>
                    <ul>
                        {allHighlights.map((highlight, index) => (
                            <li key={index}>
                                <strong>{highlight.type}</strong>: {highlight.content}
                                <br />
                                <em>Priority: {highlight.priority}</em>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {allAnnouncements.length > 0 && (
                <div>
                    <h3>Announcements</h3>
                    <ul>
                        {allAnnouncements.map((announcement, index) => (
                            <li key={index}>
                                <strong>{announcement.type}</strong>: {announcement.content}
                                <br />
                                <em>Priority: {announcement.priority}</em>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EmailAnalysisResults; 