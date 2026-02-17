import { Request, Response } from "express";
import { supabase } from "../lib/supabase";
import { User } from "../models/user.model";

export const addProduct = async (req: Request, resp: Response) => {
  const user = (req as any).user;

  const { name, price } = req.body;

  const { data, error } = await supabase
    .from("products") //tabla en supabase
    .insert([{ name, price }])
    .select()
    .single();

  if (error) {
    console.log(error);
    return resp.status(401).json({ error: "Product not added" });
  }
  return resp.status(200).json({ data });
};

export const getProducts = async (req: Request, resp: Response) => {
  const { data, error } = await supabase.from("products").select();

  if (error) {
    console.log(error);
    return resp.status(401).json({ error: "Error al caragr products" });
  }
  return resp.status(200).json({ data });
};
