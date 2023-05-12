import '@/styles/globals.scss';
import { Providers } from '@/redux/provider';
import { Footer } from '@/components';
import styles from './layout.module.scss';
import { Header } from '@/components/layout/Header/Header';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export function generateStaticParams(): {
  locale: string;
}[] {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export const metadata = {
  title: 'Graph QL App',
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
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={styles.body}>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
