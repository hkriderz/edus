import { siteConfig } from "@/config/site";
import { DEFAULT_OG_IMAGE, buildMetadata } from "./metadata";

describe("buildMetadata", () => {
  it("keeps canonical, Open Graph and Twitter fields aligned", () => {
    const metadata = buildMetadata({
      title: "Work",
      description: "Five complete demonstration builds.",
      path: "/work/",
    });

    expect(metadata.alternates?.canonical).toBe(`${siteConfig.url}/work/`);
    expect(metadata.openGraph?.url).toBe(`${siteConfig.url}/work/`);
    expect(metadata.openGraph?.images).toEqual([
      {
        url: `${siteConfig.url}${DEFAULT_OG_IMAGE.url}`,
        width: DEFAULT_OG_IMAGE.width,
        height: DEFAULT_OG_IMAGE.height,
        alt: siteConfig.name,
      },
    ]);
    expect(metadata.twitter).toEqual(
      expect.objectContaining({
        card: "summary_large_image",
        title: `Work | ${siteConfig.name}`,
      }),
    );
    expect(metadata.robots).toEqual(
      expect.objectContaining({ index: true, follow: true }),
    );
  });

  it("marks a page noindex when requested", () => {
    const metadata = buildMetadata({
      title: "Missing",
      description: "Gone.",
      path: "/missing/",
      noIndex: true,
    });

    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});
