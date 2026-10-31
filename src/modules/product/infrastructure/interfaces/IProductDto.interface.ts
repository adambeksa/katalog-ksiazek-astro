export interface IApiTermDto {
  url: string;
  href: string;
  name: string;
  slug: string;
}

export interface IApiAuthorDto extends IApiTermDto {}

export interface IApiMediaDto {
  url: string;
  director?: string;
  artist?: string;
  name?: string;
  type: string;
}

export interface IProductDto {
  title: string;
  slug: string;
  url: string;
  language: string;
  epochs: IApiTermDto[];
  genres: IApiTermDto[];
  kinds: IApiTermDto[];
  authors: IApiAuthorDto[];
  translators: { name: string }[];
  fragment_data?: {
    title?: string;
    html?: string;
  };
  children: any[]; // usually empty array
  parent?: string | null;
  preview?: boolean;

  // Downloads
  epub?: string;
  mobi?: string;
  pdf?: string;
  html?: string;
  txt?: string;
  fb2?: string;
  xml?: string;

  media: IApiMediaDto[];

  audio_length: string;

  // Covers & styling
  cover_color: string;
  cover: string;
  simple_cover: string;
  cover_thumb: string;
  simple_thumb?: string;

  // ISBNs
  isbn_pdf?: string;
  isbn_epub?: string;
  isbn_mobi?: string;

  description?: string; // Sometimes populated directly, sometimes via fragment_data
}
