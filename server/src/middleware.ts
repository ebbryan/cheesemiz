import { Express, Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  status?: number;
}

const CustomMiddleware = (app: Express) => {
  // Middleware to handle errors
  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something broke!", success: false });
  });
  // Middleware to handle 404 Not Found
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Not Found", success: false });
  });
};

export default CustomMiddleware;
