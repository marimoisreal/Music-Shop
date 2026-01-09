export interface RecordEntry {
    id?: number; // Generates automatically
    title: string;
    artist: string;
    format: string;
    genre: string;
    releaseYear: number;
    price: number;
    stockQty: number;
    customerId?: string;
    customerFirstName?: string;
    customerLastName?: string;
    customerContact?: string;
    customerEmail?: string;
}