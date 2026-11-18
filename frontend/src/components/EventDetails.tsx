import type { Event } from "../types";

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <>
      <h1 className="fw-bold event-title">{event.name}</h1>

      <p className="text-secondary event-description">{event.description}</p>

      <div className="price-row">
        <span className="price">£ {event.price}</span>
        <span className="text-secondary small"> / ticket</span>
      </div>
      {event.ticketsRemaining > 0 && (
        <div
          className={`ticket ${event.ticketsRemaining === 0 ? "ticket-empty" : ""}`}
        >
          <div className="small text-secondary">
            Tickets Remaining: <strong>{event.ticketsRemaining}</strong>
          </div>
        </div>
      )}
    </>
  );
}
