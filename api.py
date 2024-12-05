from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from email_processor import EmailAnalyzer, sample_emails
import uvicorn

app = FastAPI(
    title="Email Analysis API",
    description="API for analyzing emails and generating calendar events, JIRA tickets, action items, and highlights",
    version="1.0.0"
)

class Email(BaseModel):
    subject: str
    body: str
    from_email: str
    to: List[str]
    timestamp: str

class EmailAnalysisRequest(BaseModel):
    emails: Optional[List[Email]] = None

@app.post("/analyze-emails")
async def analyze_emails(request: Optional[EmailAnalysisRequest] = None):
    """
    Analyze emails and return comprehensive analysis including calendar items, 
    JIRA tickets, action items, and highlights.
    If no emails are provided, uses default sample emails.
    """
    analyzer = EmailAnalyzer()
    
    # Use sample emails if no emails provided
    emails_to_analyze = sample_emails if not request or not request.emails else [
        {
            "subject": email.subject,
            "body": email.body,
            "from": email.from_email,
            "to": email.to,
            "timestamp": email.timestamp
        }
        for email in request.emails
    ]

    try:
        results = []
        for email in emails_to_analyze:
            analysis = analyzer.analyze_email(email)
            results.append({
                "email_subject": email["subject"],
                "analysis": analysis
            })
        
        return {
            "status": "success",
            "data": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/sample-emails")
async def get_sample_emails():
    """
    Return the list of sample emails used for testing
    """
    return {
        "status": "success",
        "data": sample_emails
    }

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True) 