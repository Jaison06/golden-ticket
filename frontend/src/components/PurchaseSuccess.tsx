import type { PurchaseSuccessProps } from "../types";

export function PurchaseSuccess({ ticket }: PurchaseSuccessProps) {
  return (
    <div className="alert alert-success ticket-alert mt-4" role="status">
      <p className="mb-1">{ticket.message}</p>

      <div className="ticket-number">
        Ticket: <strong>{ticket.ticketId}</strong>
      </div>

      <small className="text-secondary">
        Purchased {new Date().toLocaleString("en-GB")}
      </small>
    </div>
  );
}
