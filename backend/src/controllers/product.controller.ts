import { Request, Response } from "express";
import { supabase } from "../lib/supabase";
import { User } from "../models/user.model";

export const addProduct = async (
  req: Request & { user: User },
  resp: Response
) => {
  const user = req.user;

  const { name, price } = req.body;

  const { data, error } = await supabase
    .from("products")
    .insert([{ name, price }])
    .select()
    .single();

  if (error) {
    return resp.status(401).json({ error: "Product not added" });
  }
  return resp.status(200).json({ data });
};
