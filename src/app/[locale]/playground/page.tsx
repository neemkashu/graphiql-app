import { cookies } from 'next/headers';
import { checkAuthenticated } from '@/firebase/firebaseAdmin';
import PlaygroundPage from '@/app/[locale]/playground/PlaygroundPage';
import { redirect } from 'next/navigation';

export default async function PlayGroundServer(): Promise<JSX.Element> {
  let isLoggedIn = false;
  let locale = 'en';
  try {
    const cookieStore = cookies();
    locale = cookieStore.get('NEXT_LOCALE')?.value ?? 'en';
    isLoggedIn = await checkAuthenticated(cookieStore);
  } catch (error) {
    // eslint-disable-next-line no-console
    if (error instanceof Error) console.log('Catch in sign in: ', error?.message);
    isLoggedIn = true;
  }

  if (!isLoggedIn) redirect(`/${locale}`);

  return <PlaygroundPage />;
}
