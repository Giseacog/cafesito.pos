import { supabase } from "../lib/supabase";
import { NextFunction, request, Request, Response } from "express";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  (req as any).user = data.user; //aqui agrego propiedad user a req
  next();
};
