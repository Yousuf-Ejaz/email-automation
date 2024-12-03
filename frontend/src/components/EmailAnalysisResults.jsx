import React from 'react';

const EmailAnalysisResults = ({ results }) => {
    return (
        <div>
            {results.map((email) => (
                <div key={email.emailId} className="email-analysis">
                    <h2>Email ID: {email.emailId}</h2>

                    {email.calendarItems.length > 0 && (
                        <div>
                            <h3>Calendar Items</h3>
                            <ul>
                                {email.calendarItems.map((item, index) => (
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

                    {email.jiraTickets.length > 0 && (
                        <div>
                            <h3>JIRA Tickets</h3>
                            <ul>
                                {email.jiraTickets.map((ticket, index) => (
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

                    {email.highlights.length > 0 && (
                        <div>
                            <h3>Highlights</h3>
                            <ul>
                                {email.highlights.map((highlight, index) => (
                                    <li key={index}>
                                        <strong>{highlight.type}</strong>: {highlight.content}
                                        <br />
                                        <em>Priority: {highlight.priority}</em>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <hr />
                </div>
            ))}
        </div>
    );
};

export default EmailAnalysisResults; 