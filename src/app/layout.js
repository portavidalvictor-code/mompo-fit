import { Anton, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = 'https://mompofit.com'; // cambiar cuando se compre el dominio
const SITE_NAME = 'Mompofit';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mompofit | Entrenador Personal José Mompó',
    template: '%s | Mompofit',
  },
  description:
    'Entrenamiento personal, nutrición y seguimiento profesional con José Mompó. Planes trimestrales y semestrales adaptados a tus objetivos. Mompofit · Entrenador personal en Valencia.',
  keywords: [
    'Mompofit',
    'José Mompó',
    'entrenador personal',
    'entrenador personal Valencia',
    'nutrición deportiva',
    'seguimiento personalizado',
    'plan de entrenamiento',
    'pérdida de grasa',
    'ganar músculo',
    'recomposición corporal',
    'coach fitness',
  ],
  authors: [{ name: 'José Mompó' }],
  creator: 'José Mompó',
  publisher: 'Mompofit',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mompofit | Entrenador Personal José Mompó',
    description:
      'Entrenamiento personal, nutrición y seguimiento profesional con José Mompó. Planes trimestrales y semestrales adaptados a tus objetivos.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mompofit · Entrenador personal José Mompó',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mompofit | Entrenador Personal José Mompó',
    description:
      'Entrenamiento personal, nutrición y seguimiento profesional con José Mompó.',
    images: ['/og-image.jpg'],
    creator: '@mompo.fit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: '', // pegar aquí el código de Google Search Console cuando lo tengas
  },
};

// Schema.org · LocalBusiness para SEO local
const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'Mompofit',
  description:
    'Entrenamiento personal con José Mompó. Planes de entrenamiento, nutrición y seguimiento personalizado.',
  url: SITE_URL,
  telephone: '+34693848285',
  email: 'hola@mompofit.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Valencia',
    addressRegion: 'Valencia',
    addressCountry: 'ES',
  },
  founder: {
    '@type': 'Person',
    name: 'José Mompó',
    jobTitle: 'Entrenador Personal',
  },
  sameAs: [
    'https://instagram.com/mompo.fit',
  ],
  priceRange: '€€',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="bg-ink-950 text-bone font-sans antialiased">{children}</body>
    </html>
  );
}
