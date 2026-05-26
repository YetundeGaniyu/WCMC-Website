import { client } from '@/lib/sanity/client';
import { GET_TEAM_MEMBERS } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import ContactForm from '@/components/blocks/ContactForm';
import type { TeamMember } from '@/types/sanity';

export default async function ContactPage() {
  const teamMembers = await client.fetch<TeamMember[]>(GET_TEAM_MEMBERS);

  return (
    <main className="min-h-screen bg-bg">
      {/* 1. Page Hero */}
      <section className="py-16 sm:py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl text-ink mb-4">Say hello.</h1>
          <p className="text-ink-muted text-lg sm:text-xl max-w-2xl">
            We&apos;d love to hear from you. Whether you have a question, want to visit, or just want to say hi.
          </p>
        </div>
      </section>

      {/* 2. Two-column: Contact Info + Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Contact Info + Map */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-ink mb-6">Get in touch</h2>
                <address className="not-italic space-y-4 text-ink">
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-ink-muted">
                      West Croydon Methodist Church<br />
                      123 London Road<br />
                      West Croydon, CR0 2XX
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-ink-muted">
                      <a href="tel:+442012345678" className="hover:text-gold transition-colors">
                        020 1234 5678
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-ink-muted">
                      <a href="mailto:info@wcmc.org.uk" className="hover:text-gold transition-colors">
                        info@wcmc.org.uk
                      </a>
                    </p>
                  </div>
                </address>
              </div>

              {/* Google Maps iframe */}
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.123456789!2d-0.123456!3d51.376543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDIyJzM1LjUiTiAwwrAwNycyNC40Ilc!5e0!3m2!1sen!2suk!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="West Croydon Methodist Church location"
                />
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <div className="bg-white shadow-card rounded-lg p-6 sm:p-8">
                <h2 className="font-serif text-2xl text-ink mb-6">Send us a message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Staff Directory */}
      <section className="py-12 sm:py-16 bg-paper">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-8">Meet the team</h2>
          {teamMembers && teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member._id} className="bg-white shadow-card rounded-lg p-6 text-center">
                  {member.photo?.asset ? (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 overflow-hidden">
                      <img
                        src={urlFor(member.photo).url()}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold-pale flex items-center justify-center">
                      <span className="text-ink-muted text-sm">No photo</span>
                    </div>
                  )}
                  <h3 className="font-serif text-lg text-ink mb-1">{member.name}</h3>
                  {member.role && (
                    <p className="text-gold text-sm font-medium mb-2">{member.role}</p>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-ink-muted text-sm hover:text-gold transition-colors"
                    >
                      {member.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-ink-muted text-center py-8">No team members listed yet</p>
          )}
        </div>
      </section>

      {/* 4. Social Strip */}
      <section className="bg-ink text-paper py-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gold flex items-center justify-center hover:bg-gold hover:text-ink transition-colors text-gold min-h-[48px] min-w-[48px]"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gold flex items-center justify-center hover:bg-gold hover:text-ink transition-colors text-gold min-h-[48px] min-w-[48px]"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.79 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gold flex items-center justify-center hover:bg-gold hover:text-ink transition-colors text-gold min-h-[48px] min-w-[48px]"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
