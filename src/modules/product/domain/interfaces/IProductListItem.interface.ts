import type { IProduct } from "./IProduct.interface";

// Pola potrzebne w katalogu i na liście popularnych - tyle wysyła endpoint /api/products
export type IProductListItem = Pick<
  IProduct,
  "id" | "name" | "image" | "author" | "epoch" | "genre" | "kind" | "features"
>;
