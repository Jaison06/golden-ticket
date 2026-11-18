import type { PurchaseResponse } from "../types";

const API_URL = "http://localhost:3000/api";

export const getEvent = async () => {
  const response = await fetch(`${API_URL}/inventory`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
};

export const buyTicket = async (ticketCount: number) => {
  const response = await fetch(`${API_URL}/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ numTickets: ticketCount }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Purchase failed");
  }

  return data as PurchaseResponse;
};
