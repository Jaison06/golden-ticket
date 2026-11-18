import type { PurchaseResponse } from "../types";

export const createSuccessResponse = (
  ticketsRemaining: number,
): PurchaseResponse => {
  return {
    success: true,
    message: "Your ticket has been issued successfully.",
    ticketsRemaining,
    ticketId: `TKT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
  };
};

export const createSoldOutResponse = (): PurchaseResponse => {
  return {
    success: false,
    message: "Tickets sold out.",
    code: "SOLD_OUT",
    ticketsRemaining: 0,
  };
};
