import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/config/site";

export type OgImage = {
  /** Root-relative path to a raster image. */
  url: string;
  width: number;
  height: number;
};

/**
 * Raster, not SVG: X, Facebook and LinkedIn all refuse SVG share cards, so an
 * SVG here would silently produce a blank preview everywhere it matters.
 */
export const DEFAULT_OG_IMAGE: OgImage = {
  url: "/og/default.png",
  width: 1200,
  height: 630,
};

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path including trailing slash, e.g. "/work/". */
  path: string;
  /** Override the default social card image. Dimensions must match the file. */
  ogImage?: OgImage;
  noIndex?: boolean;
};

/**
 * Builds per-page metadata from a single input so canonical URLs, Open Graph
 * tags and Twitter tags can never drift apart. Titles get the brand suffix via
 * the template in the root layout, except where `absolute` is needed.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(ogImage.url);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      images: [
        { url: imageUrl, width: ogImage.width, height: ogImage.height, alt: siteConfig.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [imageUrl],
    },
  };
}
