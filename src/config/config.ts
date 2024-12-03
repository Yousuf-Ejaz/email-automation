import dotenv from "dotenv";
dotenv.config();

export const config = {
	port: process.env.PORT || 3000,
	geminiApiKey: process.env.GEMINI_API_KEY || "",
	environment: process.env.NODE_ENV || "development",
	googleServiceAccount: {
		email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		privateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
	},
	jira: {
		host: process.env.JIRA_HOST,
		email: process.env.JIRA_EMAIL,
		apiToken: process.env.JIRA_API_TOKEN,
		projectKey: process.env.JIRA_PROJECT_KEY
	}
};
