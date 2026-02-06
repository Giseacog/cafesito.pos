import { Request, Response } from "express";
import { supabase } from "../lib/supabase";

export const register = async (req: Request, resp: Response) => {
  const { email, password, role } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role } },
  });

  if (error) return resp.status(400).json({ error: error.message });
  return resp.status(201).json({ data: data });
};

export const login = async (req: Request, resp: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return resp.status(400).json({ error: error.message });
  return resp.status(201).json({ data: data });
};
