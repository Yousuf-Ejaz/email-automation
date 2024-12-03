declare module 'jira-client' {
    export default class JiraApi {
        constructor(options: any);
        addNewIssue(issue: any): Promise<any>;
    }
} 