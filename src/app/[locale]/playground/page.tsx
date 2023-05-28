import { cookies } from 'next/headers';
import { checkAuthenticated } from '@/firebase/firebaseAdmin';
import PlaygroundPage from '@/app/[locale]/playground/PlaygroundPage';
import { redirect } from 'next/navigation';
import { BASIC_LANGUAGE } from '@/common';

export default async function PlayGroundServer(): Promise<JSX.Element> {
  let isLoggedIn = false;
  let locale = BASIC_LANGUAGE;
  try {
    const cookieStore = cookies();
    locale = cookieStore.get('NEXT_LOCALE')?.value ?? BASIC_LANGUAGE;
    isLoggedIn = await checkAuthenticated(cookieStore);
  } catch (error) {
    isLoggedIn = true;
  }

  if (!isLoggedIn) redirect(`/${locale}`);

  return <PlaygroundPage />;
}
