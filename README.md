# katalog-ksiazek-astro

Katalog książek z API [Wolne Lektury](https://wolnelektury.pl/) przepisany z Vue na [Astro](https://astro.build/). UI i UX są takie same jak w wersji [katalog-ksiazek-vue](https://github.com/adambeksa/katalog-ksiazek-vue).

## Jak to działa

- Strony (`src/pages`) renderuje Astro na serwerze (adapter Vercel).
- Statyczne części interfejsu to komponenty `.astro`.
- Popularne lektury na stronie głównej i karta książki to server islands (`server:defer`): do czasu pobrania danych widać szkielet.
- Katalog z filtrami i paginacją to wyspa Vue (`client:only`), która pobiera okrojoną listę książek z endpointu `/api/products`. Filtry i strona zostają w `sessionStorage`, więc po powrocie z karty książki katalog wygląda tak jak przed wyjściem.
- Przyciski pobierania na karcie książki i modal to wyspa Vue (`client:load`).

## Komendy

```sh
npm install
npm run dev      # serwer deweloperski na http://localhost:4321
npm run build    # build produkcyjny (.vercel/output)
npx astro check  # sprawdzenie typów
```
