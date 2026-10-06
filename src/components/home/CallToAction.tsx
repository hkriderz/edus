import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig, isPlaceholder } from "@/config/site";

export function CallToAction({
  heading = "Let's talk about your site.",
  body = "An hour on a call, an honest answer about what you need, and a fixed price before you commit to anything. If a rebuild is the wrong move for you, we will say so.",
}: {
  heading?: string;
  body?: string;
}) {
  const hasEmail = !isPlaceholder(siteConfig.email);
  const hasPhone = !isPlaceholder(siteConfig.phoneDisplay);

  return (
    <section className="border-t border-line bg-surface-invert text-ink-invert">
      <Container width="wide" className="py-24 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-8 !text-ink-invert/55">Next step</p>
            <h2 className="text-display optical-left">{heading}</h2>
            <p className="text-lead mt-8 max-w-[48ch] text-ink-invert/75">{body}</p>
          </div>

          <div className="flex flex-col justify-end gap-8 lg:col-span-5">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact/" size="lg">
                Start a project
              </ButtonLink>
              <ButtonLink href="/work/" variant="invert" size="lg">
                See the work first
              </ButtonLink>
            </div>

            <dl className="grid gap-5 border-t border-ink-invert/20 pt-8 font-mono text-[0.6875rem] uppercase tracking-[0.14em] sm:grid-cols-2">
              {hasEmail ? (
                <div>
                  <dt className="text-ink-invert/50">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="transition-colors hover:text-accent"
                    >
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {hasPhone ? (
                <div>
                  <dt className="text-ink-invert/50">Phone</dt>
                  <dd className="mt-2">
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="transition-colors hover:text-accent"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
