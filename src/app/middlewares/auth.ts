import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (...roles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
      }

      const verifiedToken = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;

      req.user = verifiedToken;

      if (roles.length && !roles.includes(verifiedToken.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };
};