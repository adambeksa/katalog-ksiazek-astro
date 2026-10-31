import { Product } from "../../domain/Product";
import type { IProductDto } from "../interfaces/IProductDto.interface";
import {
  extractAudioData,
  extractEbookFormats,
  type LicenseData,
} from "../utils/productAdapterUtils";

export const mapDetailToProduct = (
  data: IProductDto,
  licenseData?: LicenseData,
): Product => {
  const { features, audioFormats, audioDirector, audioArtist } =
    extractAudioData(data.media || []);
  const formats = extractEbookFormats(data);

  const product = new Product({
    id: data.slug,
    name: data.title,
    image: data.cover || data.simple_thumb || "",
    description:
      data.fragment_data?.html ||
      `${data.kinds?.[0]?.name}, ${data.epochs?.[0]?.name}, ${data.genres?.[0]?.name}`,
    author: data.authors?.[0]?.name || "Nieznany autor",
    epoch: data.epochs?.[0]?.name || "",
    genre: data.genres?.[0]?.name || "",
    kind: data.kinds?.[0]?.name || "",
    url: data.url,
    features,
    license: licenseData?.license,
    licenseUrl: licenseData?.licenseUrl,
    audioDirector,
    audioArtist,
    formats,
    audioFormats,
  });

  return product;
};
