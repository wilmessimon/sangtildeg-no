import { Inter, Crimson_Pro, Playfair_Display, Dancing_Script } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const crimson = Crimson_Pro({ 
  subsets: ['latin'],
  variable: '--font-crimson',
  weight: ['300', '400', '600'],
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  display: 'swap',
});

const dancing = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'sangtildeg.no - Personal Remembrance Songs for Funerals | Oslo',
  description: 'We create deeply personal remembrance songs for funerals and memorials. Based on your memories, Thea & Mia craft a unique song to honor someone you love. Oslo, Norway.',
  keywords: 'funeral song, remembrance song, memorial music, personalized funeral, oslo funeral, custom song, tribute song, farewell music',
  authors: [{ name: 'Thea & Mia' }],
  openGraph: {
    title: 'sangtildeg.no - A song to remember. A song for them.',
    description: 'Personal remembrance songs for funerals. Created with care by Thea & Mia in Oslo.',
    url: 'https://sangtildeg.no',
    siteName: 'sangtildeg.no',
    locale: 'no_NO',
    type: 'website',
  },
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${crimson.variable} ${playfair.variable} ${dancing.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

