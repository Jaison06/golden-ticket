import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import ConcurrencyLock from "./locks/concurrencyLock";
import type { Event, PurchaseResponse } from "./types";

import {
  createSuccessResponse,
  createSoldOutResponse,
} from "./utils/ticketResponse";

const filePath = path.join(__dirname, "data", "event.json");

// Prevent concurrent purchase requests
const requestLock = new ConcurrencyLock();

// Retrieve event inventory
export const getEvent = async (): Promise<Event> => {
  const data = await readFile(filePath, "utf-8");

  return JSON.parse(data) as Event;
};

// Purchase tickets
export const buyTicket = async (
  numTickets: number,
): Promise<PurchaseResponse> => {
  const release = await requestLock.lock();

  try {
    if (!Number.isInteger(numTickets) || numTickets <= 0) {
      throw new Error("Invalid ticket quantity.");
    }

    const event = await getEvent();

    // Prevent overselling
    if (event.ticketsRemaining < numTickets) {
      return createSoldOutResponse();
    }

    // Update inventory
    event.ticketsRemaining -= numTickets;

    await writeFile(filePath, JSON.stringify(event, null, 2), "utf-8");

    return createSuccessResponse(event.ticketsRemaining);
  } finally {
    release();
  }
};
