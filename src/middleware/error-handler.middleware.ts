import { Request, Response } from "express";

interface ErrorMapping {
  [key: string]: number;
}

const commonErrorMappings: ErrorMapping = {
  "not found": 404,
  "already exists": 400,
  "email already exists": 400,
  "product name already exists": 400,
  "order number already exists": 400,
  "invoice number already exists": 400,
  "product already exists in this order": 400,
  "order already has an invoice": 400,
};

export function handleServiceError(
  error: unknown,
  res: Response,
  operation: string,
  customErrorMappings: ErrorMapping = {}
): void {
  console.error(`Error ${operation}:`, error);

  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();
    const allMappings = { ...commonErrorMappings, ...customErrorMappings };

    // Find matching error and return appropriate status code
    for (const [key, statusCode] of Object.entries(allMappings)) {
      if (errorMessage.includes(key)) {
        res.status(statusCode).json({ message: error.message });
        return;
      }
    }
  }

  // Default to 500
  res.status(500).json({ message: `Error ${operation}` });
}

// Middleware to handle errors globally
export const ErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response
) => {
  res.status(500).json({
    message: "An unexpected error occurred",
    error: process.env.NODE_ENV === "production" ? null : err.message,
  });
};
