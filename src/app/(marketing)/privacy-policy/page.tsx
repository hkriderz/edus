import { LegalProse } from "@/components/layout/LegalProse";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { siteConfig, siteLocation, isPlaceholder } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How EDUS Media collects, uses and protects the personal information you submit through this website.",
  path: "/privacy-policy/",
});

const LAST_UPDATED = "1 October 2026";

export default function PrivacyPolicyPage() {
  const hasEmail = !isPlaceholder(siteConfig.email);
  const contactLine = hasEmail ? siteConfig.email : "the contact details on our contact page";

  return (
    <>
      <PageHeader
        eyebrow={`Last updated ${LAST_UPDATED}`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        title="Privacy Policy"
        lead="A plain-language account of what we collect, why, and what we will never do with it."
      />

      <Container width="prose" className="pb-28">
        <LegalProse>
          <h2>The short version</h2>
          <p>
            We collect the information you type into our contact form, plus anonymised analytics about
            how pages are used. We do not sell data, we do not share it with advertisers, and we do
            not run third-party advertising trackers on this site.
          </p>

          <h2>Information you give us</h2>
          <p>
            When you submit the enquiry form we receive the fields you completed: your name, email
            address, and optionally your phone number, business name and current website, along with
            your selected service, budget range and message.
          </p>
          <p>
            That submission is delivered to us by <strong>Formspree</strong>, a third-party form
            processor, and is also stored in our email. We use it only to reply to your enquiry and to
            deliver work if you become a client.
          </p>

          <h2>Information collected automatically</h2>
          <p>
            If analytics is enabled on this site, we use Google Tag Manager and Google Analytics to
            understand aggregate behaviour &mdash; which pages are visited, roughly where visitors are
            located, and which devices are used. This data is pseudonymised and we do not attempt to
            identify individuals from it.
          </p>
          <p>
            Our web server also writes standard request logs, which include IP addresses, for security
            and troubleshooting. These are retained for a short period and then discarded.
          </p>

          <h2>Cookies and local storage</h2>
          <p>
            This site sets no marketing cookies. Two pieces of client-side storage are used, both
            strictly functional:
          </p>
          <ul>
            <li>
              A <strong>theme preference</strong> saved in <code>localStorage</code> so the site
              remembers whether you chose the light or dark palette.
            </li>
            <li>
              A <strong>demo cart</strong> saved in <code>sessionStorage</code> inside the Fathom
              Coffee demonstration site. It is discarded when you close the tab and never leaves your
              browser.
            </li>
          </ul>
          <p>
            If analytics is enabled, Google Analytics will also set its own cookies. You can block
            these with any standard browser setting or extension without affecting the site.
          </p>

          <h2>How we use your information</h2>
          <ul>
            <li>To reply to your enquiry and prepare a quote.</li>
            <li>To deliver and support a project you have engaged us for.</li>
            <li>To send invoices and project correspondence.</li>
            <li>To understand, in aggregate, how this website is performing.</li>
          </ul>
          <p>
            We do not add enquirers to a marketing list. We do not run an automated follow-up
            sequence. If you do not reply to us, we do not chase you.
          </p>

          <h2>Who we share it with</h2>
          <p>
            Only the service providers needed to operate the business: our form processor
            (Formspree), our email provider, our analytics provider where enabled, and &mdash; for
            active clients &mdash; our hosting and payment providers. We never sell personal
            information, and we have no advertising partners.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries that do not become projects are deleted within twelve months. Client records are
            retained for seven years where tax and contract law require it. Analytics data follows the
            provider&rsquo;s default retention, typically fourteen months.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us for a copy of the personal information we hold about you, ask us to correct
            it, or ask us to delete it. California residents have additional rights under the CCPA,
            including the right to know what is collected and the right to request deletion. We do not
            sell personal information, so there is nothing to opt out of in that respect.
          </p>
          <p>Email {contactLine} and we will respond within thirty days.</p>

          <h2>Security</h2>
          <p>
            This site is served over HTTPS. Form submissions are encrypted in transit. We use
            multi-factor authentication on the accounts that hold client data. No system is perfectly
            secure, so please do not send passwords, card numbers or other sensitive credentials
            through the contact form.
          </p>

          <h2>Children</h2>
          <p>
            This site is intended for business audiences and is not directed at children under 13. We
            do not knowingly collect information from children.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we change this policy we will update the date at the top of this page. Material changes
            affecting existing clients will be communicated directly by email.
          </p>

          <h2>Contact</h2>
          <p>
            {siteConfig.name}
            {!isPlaceholder(siteConfig.address.city) ? <>, {siteLocation}</> : null}.{" "}
            {hasEmail ? (
              <>
                Questions about privacy: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </>
            ) : null}
          </p>
        </LegalProse>
      </Container>
    </>
  );
}
