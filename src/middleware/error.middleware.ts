import { Request, Response } from "express";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response
) => {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
};