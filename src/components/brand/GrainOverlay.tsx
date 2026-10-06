/**
 * Film-grain texture as a single inline SVG filter. Rendering the noise in the
 * document avoids an image request entirely, and `feTurbulence` is cheap enough
 * to composite once at this size — the alternative (a WebGL noise pass) costs
 * far more for an effect at 4% opacity.
 *
 * Hidden from the accessibility tree and non-interactive.
 */
export function GrainOverlay() {
  return (
    <svg
      className="grain-overlay"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Default SVG viewport is 300×150. Without an explicit box the filter
          paints a hard-edged rectangle in the top-left instead of the page. */}
      <filter id="edus-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves={3}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#edus-grain)" />
    </svg>
  );
}
