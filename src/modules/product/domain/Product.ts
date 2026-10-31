import type { IProduct, IAudioFormat } from "./interfaces/IProduct.interface";

/**
 * Encja produktu - reprezentuje domenę produktu w systemie
 */
export interface ProductConstructorParams {
  id: string;
  name: string;
  image: string;
  description: string;
  author: string;
  epoch: string;
  genre: string;
  kind: string;
  features?: string[];
  url?: string;
  license?: string;
  licenseUrl?: string;
  audioDirector?: string;
  audioArtist?: string;
  formats?: Record<string, string>;
  audioFormats?: Record<string, IAudioFormat[]>;
}

export class Product implements IProduct {
  id: string;
  name: string;
  image: string;
  description: string;
  author: string;
  epoch: string;
  genre: string;
  kind: string;
  features: string[];
  url: string;
  license: string;
  licenseUrl: string;
  audioDirector: string;
  audioArtist: string;
  formats: Record<string, string>;
  audioFormats: Record<string, IAudioFormat[]>;

  constructor({
    id,
    name,
    image,
    description,
    author,
    epoch,
    genre,
    kind,
    features = [],
    url = "",
    license = "",
    licenseUrl = "",
    audioDirector = "",
    audioArtist = "",
    formats = {},
    audioFormats = {},
  }: ProductConstructorParams) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.author = author;
    this.epoch = epoch;
    this.genre = genre;
    this.kind = kind;
    this.features = features;
    this.url = url;
    this.license = license;
    this.licenseUrl = licenseUrl;
    this.audioDirector = audioDirector;
    this.audioArtist = audioArtist;
    this.formats = formats;
    this.audioFormats = audioFormats;
  }

  get hasAudio(): boolean {
    return this.audioFormats && Object.keys(this.audioFormats).length > 0;
  }
}
