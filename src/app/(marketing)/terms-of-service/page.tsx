import { LegalProse } from "@/components/layout/LegalProse";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { siteConfig, siteLocation, isPlaceholder } from "@/config/site";
import { carePlans } from "@/content/pricing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms under which EDUS Media provides web design, development, SEO and website care services, including our written support response guarantee.",
  path: "/terms-of-service/",
});

const LAST_UPDATED = "1 October 2026";

export default function TermsOfServicePage() {
  const hasEmail = !isPlaceholder(siteConfig.email);

  return (
    <>
      <PageHeader
        eyebrow={`Last updated ${LAST_UPDATED}`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
        title="Terms of Service"
        lead="These terms govern this website and summarise how our engagements work. A project-specific agreement is always signed before work starts, and it takes precedence over this page."
      />

      <Container width="prose" className="pb-28">
        <LegalProse>
          <h2>1. Scope of these terms</h2>
          <p>
            By using this website you accept these terms. They summarise our standard commercial
            terms, but each project is governed by its own signed agreement. Where the two differ, the
            signed agreement wins.
          </p>

          <h2>2. Quotes and pricing</h2>
          <p>
            Prices published on this site are starting prices for the scope described. A quote issued
            to you in writing is fixed for thirty days and for the scope it describes.
          </p>
          <p>
            If scope changes materially during a project we will stop, re-quote in writing, and wait
            for your approval before continuing. We do not issue surprise variation invoices.
          </p>

          <h2>3. Payment</h2>
          <ul>
            <li>One third on acceptance, which books your project into the schedule.</li>
            <li>One third on design sign-off.</li>
            <li>One third on launch, due within fourteen days of invoice.</li>
          </ul>
          <p>
            The booking payment is non-refundable once design work has begun, because it reserves
            capacity we have then turned other work away for. Care plans are billed monthly in advance
            and can be cancelled at any time before the next billing date.
          </p>

          <h2>4. What we need from you</h2>
          <p>
            Projects run to schedule when you provide content, feedback and approvals within two
            business days, and name one person who can make decisions. Where a delay on your side
            stalls a project for more than thirty days, we may re-schedule it into the next available
            slot.
          </p>

          <h2>5. Support response guarantee</h2>
          <p>
            For clients on an active care plan, we guarantee a first human response within the window
            stated for that plan:
          </p>
          <ul>
            {carePlans.map((plan) => (
              <li key={plan.id}>
                <strong>{plan.name}</strong> &mdash; {plan.firstResponse}.
              </li>
            ))}
          </ul>
          <p>
            A &ldquo;first response&rdquo; means a person acknowledging the issue and stating what
            happens next &mdash; not necessarily a completed fix. <strong>If we miss the guaranteed
            window, that month&rsquo;s care fee is waived in full.</strong> The guarantee does not
            apply to failures caused by third-party outages outside our control, or to requests for new
            feature development.
          </p>

          <h2>6. Intellectual property and ownership</h2>
          <p>
            On final payment, you own the website: the code we wrote for you, the content you
            supplied, and the designs produced for your project. Domain, hosting, analytics and
            repository accounts are registered in your name from the start of the project.
          </p>
          <p>
            We retain ownership of our internal design system, tooling and reusable components, which
            are licensed to you perpetually as part of your site. We also reserve the right to
            display your project in our portfolio unless you ask us in writing not to.
          </p>
          <p>
            You are responsible for ensuring that any content, images, fonts or trademarks you supply
            are properly licensed.
          </p>

          <h2>7. Third-party services</h2>
          <p>
            Sites we build typically rely on third-party services such as hosting, domain registration,
            payment processing, fonts and analytics. Their fees are paid by you directly, in your own
            accounts, and are governed by their own terms. We do not mark up or resell them, and we are
            not liable for their outages or policy changes.
          </p>

          <h2>8. Warranty and limitation of liability</h2>
          <p>
            We warrant that work will be performed with reasonable professional skill and care, and we
            will fix defects in our own code reported within thirty days of launch at no charge.
          </p>
          <p>
            Beyond that, the site is provided as is. We make no guarantee of specific search rankings,
            traffic volumes, conversion rates or revenue &mdash; no honest studio can. To the maximum
            extent permitted by law, our total liability for any claim is limited to the fees you paid
            us for the work in question, and we are not liable for indirect, incidental or
            consequential losses including lost profits or lost data.
          </p>

          <h2>9. Demonstration builds on this site</h2>
          <p>
            The sites shown in our portfolio under <code>/work/</code> and <code>/demo/</code> are
            demonstration builds. The businesses depicted are fictional, and any resemblance to a real
            business is unintentional. Nothing in them is an offer, a price list, or a representation
            about a real company.
          </p>

          <h2>10. Acceptable use of this website</h2>
          <p>
            Do not attempt to breach, overload or probe this site, scrape it at volume, or use the
            contact form to send unsolicited commercial messages. We may block access for any of these.
          </p>

          <h2>11. Termination</h2>
          <p>
            Either party may terminate a project in writing. You pay for work completed to that point
            and receive the deliverables produced. If you terminate a care plan, we will help you
            transition hosting and credentials at no additional charge.
          </p>

          <h2>12. Governing law</h2>
          <p>
            These terms are governed by the laws of the State of California, United States. Disputes
            will be resolved in the courts of that jurisdiction. If any provision is found
            unenforceable, the remainder continues to apply.
          </p>

          <h2>13. Contact</h2>
          <p>
            {siteConfig.name}
            {!isPlaceholder(siteConfig.address.city) ? <>, {siteLocation}</> : null}.{" "}
            {hasEmail ? (
              <>
                Questions about these terms:{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </>
            ) : null}
          </p>
        </LegalProse>
      </Container>
    </>
  );
}
