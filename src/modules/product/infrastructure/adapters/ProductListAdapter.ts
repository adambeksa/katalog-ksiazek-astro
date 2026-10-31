import { Product } from "../../domain/Product";
import type { IProductListDto } from "../interfaces/IProductListDto.interface";

export const mapListToProduct = (data: IProductListDto): Product => {
  const product = new Product({
    id: data.slug,
    name: data.title,
    image: data.simple_thumb || data.cover_thumb || "",
    description: `${data.author}, ${data.kind}`,
    author: data.author,
    epoch: data.epoch,
    genre: data.genre,
    kind: data.kind,
    url: data.url,
    features: data.has_audio ? ["audiobook"] : [],
  });

  return product;
};
