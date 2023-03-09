export enum FeedbackStatus 
{
    Close = "Close",
    Open = "Open",
    InProgress = "In progress",    
}

export interface Feedback
{
    id: string;
    userId: string; 
    comment: string;
    status: FeedbackStatus;
    assignedUserId?: string;
    openedAt: Date;
    assignedAt?: Date;
    closedAt?: Date;
}