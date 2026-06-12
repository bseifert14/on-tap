export interface Event {
    business_name: string;
    business_url: string;
    event_business_name: string;
    event_date: string;
    event_description: string;
    event_end_timestamp: string;
    event_location: string;
    event_min_age: number;
    event_name: string;
    event_photo_path?: string;
    event_photo_url?: string;
    event_start_timestamp: string;
    event_type: string;
    event_type_slug: string;
    event_url: string
    id: number;
}