import type { APIRoute } from 'astro';
import { ProductApiService } from '@/modules/product/infrastructure/api-services/ProductApiService';
import type { IProductListItem } from '@/modules/product/domain/interfaces/IProductListItem.interface';

const productApiService = new ProductApiService();

// Lista książek dla wyspy katalogu - okrojona do pól używanych na liście
export const GET: APIRoute = async () => {
  const products = await productApiService.getAll();
  const items: IProductListItem[] = products.map(
    ({ id, name, image, author, epoch, genre, kind, features }) => ({
      id,
      name,
      image,
      author,
      epoch,
      genre,
      kind,
      features,
    }),
  );

  return new Response(JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
    },
  });
};
