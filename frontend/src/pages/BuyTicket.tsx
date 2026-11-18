import { useCallback, useEffect, useState } from "react";

import { getEvent, buyTicket } from "../api/ticketApi";

import { EventDetails } from "../components/EventDetails";
import { EventImage } from "../components/EventImage";
import { PurchaseButton } from "../components/PurchaseButton";
import { PurchaseError } from "../components/PurchaseError";
import { PurchaseSuccess } from "../components/PurchaseSuccess";

import type { Event, PurchaseResponse } from "../types";

type PurchaseStatus = "idle" | "loading" | "success" | "sold-out" | "error";

export function BuyTicket() {
  const [event, setEvent] = useState<Event | null>(null);
  const [ticket, setTicket] = useState<PurchaseResponse | null>(null);
  const [status, setStatus] = useState<PurchaseStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Load event details
  const loadEvent = useCallback(async () => {
    try {
      const result = await getEvent();

      setEvent(result);
      setStatus(result.ticketsRemaining === 0 ? "sold-out" : "idle");
    } catch {
      setErrorMessage("Unable to load event. Please refresh the page.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void loadEvent();
  }, [loadEvent]);

  // Purchase ticket
  const handlePurchase = async () => {
    if (!event || event.ticketsRemaining <= 0 || status === "loading") {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const numTickets = 1;
      const purchasedTicket = await buyTicket(numTickets);

      setTicket(purchasedTicket);

      setEvent((current) =>
        current
          ? {
              ...current,
              ticketsRemaining:
                purchasedTicket.ticketsRemaining ?? current.ticketsRemaining,
            }
          : current,
      );

      setStatus("success");
    } catch (error) {
      // Handle sold-out tickets
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "SOLD_OUT"
      ) {
        setEvent((current) =>
          current ? { ...current, ticketsRemaining: 0 } : current,
        );

        setStatus("sold-out");
        return;
      }

      // Handle other purchase errors
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );

      setStatus("error");
    }
  };

  // Derived state
  const isSoldOut = event?.ticketsRemaining === 0 || status === "sold-out";
  const isLoading = status === "loading";

  return (
    <section className="container buy-section" id="ticket">
      <div className="row justify-content-center align-items-center g-5">
        <div className="col-12 col-lg-6">
          {event && (
            <EventImage
              src="/images/bristol.png"
              alt="Bristol balloon fiesta"
            />
          )}
        </div>

        <div className="col-12 col-lg-5">
          {event && (
            <>
              <EventDetails event={event} />

              <PurchaseButton
                isLoading={isLoading}
                isSoldOut={isSoldOut}
                isSuccess={status === "success"}
                onPurchase={handlePurchase}
              />
            </>
          )}

          {status === "success" && ticket && (
            <PurchaseSuccess ticket={ticket} />
          )}

          {status === "sold-out" && (
            <div className="alert alert-warning mt-4">
              Sorry, all tickets have been sold. Please check back another time.
            </div>
          )}

          {status === "error" && event && (
            <PurchaseError
              message={errorMessage}
              buttonText="Try again"
              onRetry={handlePurchase}
            />
          )}
        </div>

        {!event && (
          <div className="alert alert-warning mt-4">No events available.</div>
        )}
      </div>
    </section>
  );
}
