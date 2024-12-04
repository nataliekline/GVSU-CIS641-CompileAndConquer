export interface Application {
    applicationId: string;
    position: string;
    companyName: string;
    status: string;
    dateSubmitted: string;
    location?: string;
    format?: string;
    salary?: string;
    link?: string;
}

export interface ApplicationData extends Application{
    id: string;
}