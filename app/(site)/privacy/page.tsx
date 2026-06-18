import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy & Cookies | West Croydon Methodist Church',
  description: 'How West Croydon Methodist Church uses cookies and handles your personal information.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-4">Privacy &amp; Cookies</h1>

          {/* Template notice — remove once reviewed */}
          <div className="bg-gold-pale border border-line rounded-lg p-4 text-sm text-ink mb-8">
            <strong>Note for the church:</strong> this is a starting template. Please review
            it with whoever looks after data protection before relying on it.
          </div>

          <div className="prose prose-stone max-w-none text-ink space-y-6">
            <div>
              <h2 className="font-serif text-xl text-ink mb-2">Who we are</h2>
              <p className="text-ink-muted">
                This website is run by West Croydon Methodist Church, 93 London Rd,
                Croydon CR0 2RF. If you have any questions about this policy, contact us at{' '}
                <a href="mailto:info@westcroydonmeth.co.uk" className="text-red hover:text-red-dark underline underline-offset-2">
                  info@westcroydonmeth.co.uk
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-ink mb-2">Cookies</h2>
              <p className="text-ink-muted">
                We use a small number of cookies to make the site work and to understand how
                it is used. When you first visit, you can <strong>accept</strong> or{' '}
                <strong>decline</strong> non-essential cookies. You can change your choice at
                any time by clearing this site&apos;s data in your browser.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-ink mb-2">Information we collect</h2>
              <p className="text-ink-muted">
                If you use our contact form, we collect your name, email address and message
                so we can reply to you. We do not sell or share your information.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-ink mb-2">Your rights</h2>
              <p className="text-ink-muted">
                You can ask us what information we hold about you, ask us to correct it, or ask
                us to delete it. To make a request, email{' '}
                <a href="mailto:info@westcroydonmeth.co.uk" className="text-red hover:text-red-dark underline underline-offset-2">
                  info@westcroydonmeth.co.uk
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-ink mb-2">Contact us</h2>
              <address className="not-italic text-ink-muted">
                West Croydon Methodist Church
                <br />
                93 London Rd, Croydon CR0 2RF
                <br />
                <a href="tel:+442087749356" className="text-red hover:text-red-dark underline underline-offset-2">
                  020 8774 9356
                </a>
              </address>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
