import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * Verify middleware
 * @param req Request object
 * @param res Response object
 * @param next Next function
 * 
 * If the user is logged in, parse the decoded token and set the user. If not, send a 401 with an error message.
 */
export default (req: any, res: Response, next: NextFunction) => {
  if (req.headers["x-auth-token"]) {
    const token: any = req.headers["x-auth-token"];
    try {
      const secret: any = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).send({
        error: "Invalid token",
      });
    }
  } else {
    res.status(401).send({
      error: "No token provided",
    });
  }
};
