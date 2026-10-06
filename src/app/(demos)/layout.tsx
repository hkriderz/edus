import "./demo/themes.css";

/**
 * Route-group layout for all demonstration builds. It exists purely to pull in
 * the shared theme-token stylesheet and to guarantee the EDUS marketing chrome
 * is absent — each demo supplies its own navigation and footer.
 */
export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
