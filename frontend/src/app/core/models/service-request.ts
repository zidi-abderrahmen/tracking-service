export interface ServiceRequest {
    idService?: string;
    title: string;
    client: string;
    requestType: 'CONTRACT' | 'PURCHASE ORDER';
    startDate: string;
    endDate: string;
    description: string
}
