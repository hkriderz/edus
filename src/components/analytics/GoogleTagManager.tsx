import { siteConfig } from "@/config/site";

/**
 * GTM container loader. Renders nothing at all when NEXT_PUBLIC_GTM_ID is unset,
 * so an unconfigured build ships no tracking script rather than a broken one.
 *
 * Split into head and body parts because the noscript iframe must sit inside
 * <body> to be valid.
 */
export function GoogleTagManagerScript() {
  if (!siteConfig.gtmId) return null;

  return (
    // Conditional, env-gated snippet: @next/third-parties would add a dependency
    // for a script that is omitted entirely when NEXT_PUBLIC_GTM_ID is blank.
    // eslint-disable-next-line @next/next/next-script-for-ga
    <script
      id="gtm-init"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${siteConfig.gtmId}');`,
      }}
    />
  );
}

export function GoogleTagManagerNoScript() {
  if (!siteConfig.gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${siteConfig.gtmId}`}
        height="0"
        width="0"
        title="Google Tag Manager"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
