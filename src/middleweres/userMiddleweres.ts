import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userRepo } from "../repositories/allRespositories";

export const isAdmMiddlewere = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  const token = authToken!.split(" ")[1];

  return jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    async (error, decoded: any) => {
      if (error) {
        return res.send(error.message);
      }

      const user = await userRepo.findOneBy({
        id: decoded.sub,
      });

      if (user?.isAdm === false) {
        return res.status(403).json({ message: "Need admin permission" });
      }

      next();
    }
  );
};

export const authTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).json({ message: "Missing authorization headers" });
  }

  const token = authToken?.split(" ")[1];

  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (error, decoded: any) => {
      if (error) {
        return res.status(401).json({
          message: error.message,
        });
      }

      req.user = {
        id: decoded.sub as string,
      };

      return next();
    }
  );
};

export const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Missing authorization headers" });
  }
  next();
};
