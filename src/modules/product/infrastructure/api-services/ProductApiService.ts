import axios, { type AxiosInstance } from "axios";
import { Product } from "../../domain/Product";
import type { IProductDto } from "../interfaces/IProductDto.interface";
import type { IProductListDto } from "../interfaces/IProductListDto.interface";
import { mapListToProduct } from "../adapters/ProductListAdapter";
import { mapDetailToProduct } from "../adapters/ProductDetailAdapter";
import {
  extractLicenseData,
  type LicenseData,
} from "../utils/productAdapterUtils";

// Lista ~7,7 tys. książek waży kilka MB - trzymamy ją w pamięci serwera
const PRODUCTS_CACHE_TTL = 10 * 60 * 1000;

let productsCache: { products: Product[]; expiresAt: number } | null = null;

// Serwis działa po stronie serwera (strony Astro, server islands, endpoint /api/products),
// dlatego pliki XML pobieramy wprost z Wolnych Lektur - bez proxy omijającego CORS
export class ProductApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://wolnelektury.pl/api",
    });
  }

  async getAll(): Promise<Product[]> {
    if (productsCache && productsCache.expiresAt > Date.now()) {
      return productsCache.products;
    }

    try {
      const res = await this.client.get<IProductListDto[]>("/books");
      const products = res.data.map((item: IProductListDto) => mapListToProduct(item));
      productsCache = { products, expiresAt: Date.now() + PRODUCTS_CACHE_TTL };
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  async getById(id: string): Promise<Product | null> {
    try {
      const res = await this.client.get<IProductDto>(`/books/${encodeURIComponent(id)}`);
      const licenseData = await this.getLicenseData(res.data.xml);
      return mapDetailToProduct(res.data, licenseData);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  }

  // Pobiera tylko początek pliku XML - nagłówek z licencją mieści się w kilku KB
  private async getLicenseData(xmlUrl?: string): Promise<LicenseData | undefined> {
    if (!xmlUrl) return undefined;

    try {
      const res = await axios.get<string>(xmlUrl, {
        headers: { Range: "bytes=0-16383" },
        responseType: "text",
      });
      return extractLicenseData(res.data);
    } catch (error) {
      console.error(`Error fetching license from ${xmlUrl}:`, error);
      return undefined;
    }
  }
}
