import { NextFunction, Request, Response } from "express";

export const virifyDateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { hour, date } = req.body;

  const validatedTime = new Date(`${date} ${hour}`).getHours();
  const validatedDate = new Date(`${date} ${hour}`).getDay();

  if (validatedDate < 1 || validatedDate > 5) {
    return res.status(400).json({ message: "only open on weekdays" });
  }

  if (validatedTime < 8 || validatedTime >= 18) {
    return res.status(400).json({ message: "outside opening hours" });
  }

  next();
};
