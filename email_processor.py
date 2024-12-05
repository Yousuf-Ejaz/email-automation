from typing import List, Dict, Any
import json
from datetime import datetime

# Sample email structure
sample_emails = [
    {
        "subject": "Project Timeline Review Meeting",
        "body": """Hi Team,
        Let's schedule a project timeline review meeting next Tuesday at 2 PM EST.
        We need to discuss:
        - Q2 deliverables
        - Resource allocation
        - Current blockers
        Please come prepared with your status updates.
        Best regards,
        John""",
        "from": "john@company.com",
        "to": ["team@company.com"],
        "timestamp": "2024-03-20T10:00:00"
    },
    {
        "subject": "Urgent: Production Bug in Authentication Service",
        "body": """Team,
        We're seeing increased error rates in the authentication service.
        Error details:
        - 500 errors spiking to 15%
        - Affecting user login flow
        - Started around 9:30 AM EST
        
        Please investigate and create necessary tickets for tracking.
        Priority: High
        
        Thanks,
        Sarah""",
        "from": "sarah@company.com",
        "to": ["tech-team@company.com"],
        "timestamp": "2024-03-20T09:45:00"
    }
]

class EmailAnalyzer:
    def __init__(self):
        # Define comprehensive prompt templates for different analysis types
        self.calendar_prompt_template = """
        Analyze the following email content and extract calendar-worthy events.
        Consider the following aspects:
        1. Meetings and appointments
           - Look for specific dates, times, and time zones
           - Identify meeting purpose and required attendees
           - Check for recurring meeting patterns
        
        2. Deadlines and milestones
           - Project deadlines
           - Deliverable due dates
           - Review cycles
        
        3. Follow-up requirements
           - Action item deadlines
           - Response requirements
           - Check-in points
        
        For each identified event, provide:
        - Event type
        - Date and time
        - Duration (if specified)
        - Participants
        - Priority level
        - Context/description
        
        Email content:
        {email_content}
        
        Return the analysis in JSON format.
        """

        self.jira_prompt_template = """
        Analyze the following email content and identify items that require JIRA tickets.
        Consider these categories:

        1. Technical Issues
           - Bugs and errors
           - System performance issues
           - Security concerns
           - Technical debt items
           - Integration problems
        
        2. Feature Requests
           - New functionality
           - Improvements to existing features
           - User experience enhancements
        
        3. Tasks and Projects
           - New project initiatives
           - Work packages
           - Implementation tasks
        
        4. Support and Maintenance
           - Configuration changes
           - Environment setup
           - Documentation needs
        
        For each JIRA ticket, provide:
        - Issue type (Bug, Task, Story, etc.)
        - Priority (High, Medium, Low)
        - Summary
        - Description
        - Components/Services affected
        - Estimated complexity
        - Dependencies
        - Assignee type (Developer, QA, DevOps, etc.)
        
        Email content:
        {email_content}
        
        Return the analysis in JSON format.
        """

        self.action_items_prompt_template = """
        Analyze the following email content and extract actionable items.
        Consider these aspects:

        1. Business Actions
           - Strategic decisions needed
           - Resource allocation requirements
           - Budget considerations
           - Partnership/vendor interactions
           - Client communications
        
        2. Technical Actions
           - Code reviews
           - Deployment requirements
           - Architecture decisions
           - Technical documentation
           - Security reviews
        
        3. Team Coordination
           - Required communications
           - Collaboration needs
           - Knowledge sharing
           - Training requirements
        
        4. Process Improvements
           - Workflow optimizations
           - Tool adoption/changes
           - Policy updates
           - Best practices implementation
        
        For each action item, provide:
        - Action type
        - Priority
        - Owner role
        - Timeline
        - Dependencies
        - Required resources
        - Success criteria
        
        Email content:
        {email_content}
        
        Return the analysis in JSON format.
        """

        self.highlights_prompt_template = """
        Analyze the following email content and generate key highlights.
        Focus on:

        1. Critical Information
           - Key decisions
           - Important updates
           - Status changes
           - Risk factors
        
        2. Business Impact
           - Revenue implications
           - Customer impact
           - Market opportunities
           - Resource implications
        
        3. Technical Significance
           - Architecture changes
           - Technology adoption
           - Performance impacts
           - Security implications
        
        4. Timeline Considerations
           - Important dates
           - Phase transitions
           - Milestone achievements
           - Deadline changes
        
        For each highlight, provide:
        - Category
        - Importance level
        - Summary
        - Impact assessment
        - Related stakeholders
        - Required attention
        
        Email content:
        {email_content}
        
        Return the analysis in JSON format.
        """

    def analyze_email(self, email: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze a single email and return comprehensive analysis
        """
        # Combine subject and body for analysis
        email_content = f"Subject: {email['subject']}\n\nBody: {email['body']}"
        
        # Perform different types of analysis
        calendar_items = self._analyze_calendar_items(email_content)
        jira_tickets = self._analyze_jira_tickets(email_content)
        action_items = self._analyze_action_items(email_content)
        highlights = self._analyze_highlights(email_content)
        
        return {
            "calendar_items": calendar_items,
            "jira_tickets": jira_tickets,
            "action_items": action_items,
            "highlights": highlights
        }

    def _analyze_calendar_items(self, email_content: str) -> List[Dict[str, Any]]:
        prompt = self.calendar_prompt_template.format(email_content=email_content)
        # Mock response for demonstration
        return [{
            "event_type": "Meeting",
            "date_time": "2024-03-26T14:00:00",
            "duration": "1 hour",
            "participants": ["team@company.com"],
            "priority_level": "Medium",
            "context": "Project Timeline Review Meeting"
        }] if "meeting" in email_content.lower() else []

    def _analyze_jira_tickets(self, email_content: str) -> List[Dict[str, Any]]:
        prompt = self.jira_prompt_template.format(email_content=email_content)
        # Mock response for demonstration
        return [{
            "issue_type": "Bug",
            "priority": "High",
            "summary": "Authentication Service Error Spike",
            "description": "500 errors spiking to 15% in authentication service",
            "components": ["Authentication Service"],
            "estimated_complexity": "Medium",
            "dependencies": [],
            "assignee_type": "Developer"
        }] if "error" in email_content.lower() else []

    def _analyze_action_items(self, email_content: str) -> List[Dict[str, Any]]:
        prompt = self.action_items_prompt_template.format(email_content=email_content)
        # Mock response for demonstration
        return [{
            "action_type": "Technical Investigation",
            "priority": "High",
            "owner_role": "DevOps Engineer",
            "timeline": "Immediate",
            "dependencies": ["Access to monitoring systems"],
            "required_resources": ["Logging tools", "Metrics dashboard"],
            "success_criteria": "Error rate reduced to normal levels"
        }] if "investigate" in email_content.lower() else []

    def _analyze_highlights(self, email_content: str) -> List[Dict[str, Any]]:
        prompt = self.highlights_prompt_template.format(email_content=email_content)
        # Mock response for demonstration
        return [{
            "category": "Technical Issue",
            "importance_level": "High",
            "summary": "Authentication Service Degradation",
            "impact_assessment": "User login flow affected",
            "related_stakeholders": ["Tech Team", "Users"],
            "required_attention": "Immediate investigation needed"
        }] if "urgent" in email_content.lower() else []

def main():
    analyzer = EmailAnalyzer()
    
    for email in sample_emails:
        analysis = analyzer.analyze_email(email)
        print(f"\nAnalysis for email: {email['subject']}")
        print(json.dumps(analysis, indent=2))

if __name__ == "__main__":
    main() 