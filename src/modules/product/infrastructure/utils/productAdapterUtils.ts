import type { IAudioFormat } from "../../domain/interfaces/IProduct.interface";
import type { IApiMediaDto, IProductDto } from "../interfaces/IProductDto.interface";

interface AudioData {
  features: string[];
  audioFormats: Record<string, IAudioFormat[]>;
  audioDirector: string;
  audioArtist: string;
}

export const extractAudioData = (media: IApiMediaDto[]): AudioData => {
  const features: string[] = [];
  const audioFormats: Record<string, IAudioFormat[]> = {};
  let audioDirector = "";
  let audioArtist = "";

  if (media && media.length > 0) {
    media.forEach((m: IApiMediaDto) => {
      const type = m.type;
      if (!audioFormats[type]) {
        audioFormats[type] = [];
      }
      audioFormats[type].push({
        name: m.name || type || "Audio",
        url: m.url,
      });
    });

    if (Object.keys(audioFormats).length > 0) {
      features.push("audiobook");
    }

    const mediaWithMetadata =
      media.find((m) => m.director || m.artist) || media[0];

    if (mediaWithMetadata) {
      audioDirector = mediaWithMetadata.director || "";
      audioArtist = mediaWithMetadata.artist || "";
    }
  }

  return {
    features,
    audioFormats,
    audioDirector,
    audioArtist,
  };
};

export interface LicenseData {
  license: string;
  licenseUrl: string;
}

// Metadane licencji są w nagłówku RDF pliku XML książki:
// <dc:rights> (np. "Domena publiczna - ...") i opcjonalnie <dc:rights.license> (URL licencji)
export const extractLicenseData = (xml: string): LicenseData => {
  const license = xml.match(/<dc:rights(?:\s[^>]*)?>([^<]*)<\/dc:rights>/)?.[1];
  const licenseUrl = xml.match(
    /<dc:rights\.license(?:\s[^>]*)?>([^<]*)<\/dc:rights\.license>/,
  )?.[1];

  return {
    license: license?.trim().replace(/\.$/, "") || "",
    licenseUrl: licenseUrl?.trim() || "",
  };
};

export const extractEbookFormats = (
  data: IProductDto,
): Record<string, string> => {
  const formats: Record<string, string> = {};

  if (data.pdf) formats["pdf"] = data.pdf;
  if (data.epub) formats["epub"] = data.epub;
  if (data.mobi) formats["mobi"] = data.mobi;
  if (data.txt) formats["txt"] = data.txt;
  if (data.fb2) formats["fb2"] = data.fb2;
  if (data.xml) formats["xml"] = data.xml;
  if (data.html) formats["html"] = data.html;

  return formats;
};
