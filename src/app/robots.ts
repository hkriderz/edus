import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";

// Required under `output: "export"` — metadata routes default to dynamic.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Query strings on /contact/ only pre-select a pricing tier; indexing
        // them would create duplicate pages with identical content.
        disallow: ["/contact/?", "/archive/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
