import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3003;
const SERVICE_NAME = process.env.SERVICE_NAME || "scissor";

app.use(express.json());

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", service: SERVICE_NAME });
});

//Readiness check endpoint
app.get("/ready", (req: Request, res: Response) => {
  res.json({ status: "ok", service: SERVICE_NAME });
});

// Random number endpoint
app.get("/api/random", (req: Request, res: Response) => {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] [${SERVICE_NAME}] Received request to /api/random`);

  // Generate random number between 1 and 100
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const duration = Date.now() - startTime;

  console.log(
    `[${new Date().toISOString()}] [${SERVICE_NAME}] Generated random number: ${randomNumber}, Duration: ${duration}ms`,
  );

  res.json({
    number: randomNumber,
    service: SERVICE_NAME,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] [${SERVICE_NAME}] Service listening on port ${PORT}`);
});
