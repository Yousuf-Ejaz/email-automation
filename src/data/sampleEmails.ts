export const sampleEmails = [
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
        timestamp: new Date("2024-03-21T10:00:00Z")
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
        timestamp: new Date("2024-03-21T15:00:00Z")
    }
]; 