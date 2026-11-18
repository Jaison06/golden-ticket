import cors from "cors";
import express, { Request, Response } from "express";
import { getEvent, buyTicket } from "./inventory";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

// GET /api/inventory - Retrieve event inventory
app.get("/api/inventory", async (req: Request, res: Response) => {
  try {
    const event = await getEvent();

    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve inventory.",
    });
  }
});

// POST /api/buy
app.post("/api/buy", async (req: Request, res: Response) => {
  try {
    const { numTickets } = req.body;
    const result = await buyTicket(numTickets);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
