import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-24';

// When Sanity isn't configured yet, createClient() throws at module-load
// ("Configuration must contain `projectId`"), which crashes every page with a
// 500. To keep the site runnable before a CMS project exists, detect the
// missing config, warn clearly once, and fall back to a stub whose fetch()
// resolves to null/[] so pages render with their built-in placeholder content.
const isConfigured = Boolean(projectId && dataset);

if (!isConfigured) {
  console.warn(
    '\n[Sanity] Not configured — rendering with empty/placeholder content.\n' +
    '  Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local,\n' +
    '  then restart the dev server. Get these from https://sanity.io/manage.\n'
  );
}

type SanityFetchClient = { fetch: <T>(...args: unknown[]) => Promise<T> };

const stubClient: SanityFetchClient = {
  fetch: async <T,>() => null as T,
};

export const client: SanityFetchClient = isConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : stubClient;
