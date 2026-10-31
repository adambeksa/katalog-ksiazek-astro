export interface IAudioFormat {
  name: string;
  url: string;
}

export interface IProduct {
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
}
