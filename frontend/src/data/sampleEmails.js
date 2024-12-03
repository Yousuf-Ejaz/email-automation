const sampleEmails = [
	{
		id: "1",
		subject: "Q2 Planning Meeting and Feature Requirements",
		from: "product.manager@company.com",
		to: ["dev.team@company.com"],
		body: `Hi Team,

        We need to schedule our Q2 planning meeting for next Tuesday at 2 PM EST. Please block 2 hours.

        Additionally, we need to track the following items:
        1. Mobile app login bug reported by customer - High priority
        2. New dashboard feature implementation
        - Due by April 15th
        - Requires analytics integration
        - Need monitoring setup

        Important: We're moving to a new CI/CD pipeline next month.

        Best regards,
        Sarah`,
		timestamp: new Date("2024-03-21T10:00:00Z"),
	},
	{
		id: "2",
		subject: "Security Patch Required",
		from: "security.team@company.com",
		to: ["dev.team@company.com"],
		body: `Urgent: Security vulnerability found in production.

        Action items:
        1. Emergency patch needed for authentication service
        2. Security review meeting tomorrow at 10 AM EST
        3. Update dependency versions

        Please prioritize this.

        Thanks,
        Security Team`,
		timestamp: new Date("2024-03-21T15:00:00Z"),
	},
	{
		id: "3",
		subject: "Hello World - Introduction",
		from: "john.doe@example.com",
		to: ["team@example.com"],
		body: `Hi Team,

This is a sample email body to demonstrate the email analysis feature. Please let me know if you have any questions or need further information.

Best regards,
John Doe`,
		timestamp: new Date("2024-03-21T09:00:00Z"),
	},
	{
		id: "4",
		subject: "Meeting Reminder - Project Kickoff",
		from: "jane.smith@company.com",
		to: ["team@company.com"],
		body: `Dear Team,

This is a friendly reminder about our project kickoff meeting scheduled for tomorrow at 10 AM in the main conference room. Please ensure that you have reviewed the project brief and come prepared with your ideas.

Looking forward to seeing everyone there!

Best,
Jane Smith`,
		timestamp: new Date("2024-03-21T08:00:00Z"),
	},
	{
		id: "5",
		subject: "Project Update - Milestone Achieved",
		from: "michael.johnson@company.com",
		to: ["stakeholders@company.com"],
		body: `Hello Stakeholders,

I am pleased to inform you that we have successfully completed the first milestone of the project ahead of schedule. The team has worked diligently, and we are on track for the next phase.

Please find attached the detailed report of our progress.

Thank you for your continued support.

Best regards,
Michael Johnson
Project Lead`,
		timestamp: new Date("2024-03-21T07:00:00Z"),
	},
	{
		id: "6",
		subject: "Feedback Request - Design Review",
		from: "emily.davis@company.com",
		to: ["client@company.com"],
		body: `Hi Client,

I hope this message finds you well. We have completed the initial design for the new feature and would love to get your feedback. Please take a moment to review the attached mockups and let us know your thoughts.

Your input is invaluable to us, and we appreciate your time.

Thank you!

Best,
Emily Davis
Designer`,
		timestamp: new Date("2024-03-21T06:00:00Z"),
	},
	{
		id: "7",
		subject: "Weekly Newsletter - Company Updates",
		from: "newsletter@company.com",
		to: ["subscribers@company.com"],
		body: `Dear Subscribers,

Welcome to this week's newsletter! Here are the latest updates from our company:
1. We are excited to announce the launch of our new product line next month.
2. Our team will be attending the Tech Conference 2024 in San Francisco.
3. Don't forget to check out our blog for the latest industry insights.

Thank you for being a part of our community!

Best regards,
The Marketing Team`,
		timestamp: new Date("2024-03-21T05:00:00Z"),
	},
];

export default sampleEmails;
