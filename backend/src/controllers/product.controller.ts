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
    return resp.status(401).json({ error: "Error al cargar products" });
  }
  return resp.status(200).json({ data });
};

export const addProductToCart = async (req: Request, resp: Response) => {
  const user = (req as any).user; // ID del usuario desde el middleware
  const { productId, quantity } = req.body;

  // 1. Buscar si el perfil del usuario ya tiene un cartId
  let { data: profile } = await supabase
    .from("profiles")
    .select("cart_id")
    .eq("id", user.id)
    .single();

  let currentCartId = profile?.cart_id;

  // 2. Si no tiene cart, se crea
  if (!currentCartId) {
    const { data: newCart, error: cartError } = await supabase
      .from("cart")
      .insert({ user_id: user.id }) // Asumiendo que 'carts' tiene 'user_id'
      .select()
      .single();

    if (cartError) return resp.status(500).json({ error: cartError });

    currentCartId = newCart.id;

    // 3. Actualizamos el perfil con el nuevo cartId para que no se repita
    await supabase
      .from("profiles")
      .update({ cart_id: currentCartId })
      .eq("id", user.id);
  }

  // 4. Ahora sí, agregamos el producto al carrito
  const { data, error } = await supabase.from("cart_items").upsert({
    cart_id: currentCartId,
    product_id: productId,
    quantity,
  });

  if (error) return resp.status(401).json({ error });

  return resp
    .status(200)
    .json({ data, message: "Producto agregado con éxito" });
};
