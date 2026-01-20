import { Request, Response } from "express";

export interface ResponseControllerI {
  req: Request;
  res: Response;
  error?: any;
  data?: any;
  message?: string | null;
}

export interface PaginationI {
  limit: number;
  page: number;
}
