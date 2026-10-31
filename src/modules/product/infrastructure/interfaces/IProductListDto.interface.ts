export interface IProductListDto {
  kind: string;
  full_sort_key: string;
  title: string;
  url: string; // URL to the page on wolnelektury.pl
  cover_color: string;
  author: string;
  cover: string; // Relative path, e.g., "book/cover/..."
  epoch: string;
  href: string; // API URL
  has_audio: boolean;
  genre: string;
  simple_thumb: string;
  slug: string;
  cover_thumb: string;
  liked: boolean | null;
}
