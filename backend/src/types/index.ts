export interface Event {
  name: string;
  description: string;
  price: number;
  ticketsRemaining: number;
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
  ticketsRemaining: number;
  code?: string;
  ticketId?: string;
}