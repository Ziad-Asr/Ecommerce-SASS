import { TProduct } from "./product.types";

export type TOrderItem = {
  id: number;
  items: TProduct[];
  subtotal: number;
};
