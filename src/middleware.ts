import { defineMiddleware } from 'astro:middleware';

// Projekt szkoleniowy - żadna odpowiedź serwera (strony, API, server islands) nie trafia do wyszukiwarek
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
  return response;
});
