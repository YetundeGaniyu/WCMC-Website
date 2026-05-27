import { PortableText as PortableTextComponent } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-serif text-3xl text-ink mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl text-ink mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl text-ink mb-2">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-ink mb-4">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-ink mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-ink mb-4 space-y-2">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href || '#'} className="text-gold hover:text-gold-light underline">
        {children}
      </a>
    ),
  },
};

export default function PortableText({ value }: { value: unknown }) {
  return <PortableTextComponent value={value} components={components} />;
}
