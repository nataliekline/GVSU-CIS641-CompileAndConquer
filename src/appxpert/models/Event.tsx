export interface Event {
    eventType: string;
    applicationId: string;
    applicationCompany: string;
    description?: string;
    date: string;
    time: string;
    duration: string;
    link?: string;
    location?: string;
}

export interface EventData extends Event{
    id: string;
}