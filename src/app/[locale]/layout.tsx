import { Footer } from '@/components';
import { Header } from '@/components/layout/Header/Header';
import { Providers } from '@/redux/provider';
import '@/styles/globals.scss';
import '@/styles/codemirror.scss';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import styles from './layout.module.scss';
import { ServerNav } from '@/components/layout/Header/Nav/ServerNav';
import FireStore from '@/components/layout/FireStore/FireStore';
import { Inter, Source_Code_Pro } from 'next/font/google';

export const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

export const sourceCodePro = Source_Code_Pro({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sourceCodePro',
});

export const metadata = {
  title: 'GraphiQL',
  description: 'Generated by create next app',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}): Promise<JSX.Element> {
  let messages;
  try {
    messages = (await import(`@/../messages/${locale}/common.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} className={`${inter.variable} ${sourceCodePro.variable}`}>
      <body className={styles.body} suppressHydrationWarning={true}>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <FireStore>
              <Header>
                {/* @ts-expect-error Server Component */}
                <ServerNav />
              </Header>
              <main className={styles.main}>{children}</main>
              <Footer />
            </FireStore>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
