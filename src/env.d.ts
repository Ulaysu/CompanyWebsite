/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional form endpoint (e.g. Formspree, Basin, or your own API) that accepts JSON POSTs. */
  readonly VITE_CONTACT_ENDPOINT?: string
  /** Canonical site URL, used for canonical links and Open Graph. */
  readonly VITE_SITE_URL?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
