export interface Event {
  name: string;
  description: string;
  price: string;
  ticketsRemaining: number;
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
  ticketsRemaining: number;
  code?: string;
  ticketId?: string;
}

export interface PurchaseButtonProps {
  isLoading: boolean;
  isSoldOut: boolean;
  isSuccess: boolean;
  onPurchase: () => void;
}

export interface PurchaseSuccessProps {
  ticket: PurchaseResponse;
}

export interface PurchaseErrorProps {
  message: string;
  buttonText: string;
  onRetry: () => void;
}

export interface EventImageProps {
  src: string;
  alt: string;
}