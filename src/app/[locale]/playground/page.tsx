import { cookies } from 'next/headers';
import { checkAuthenticated } from '@/firebase/firebaseAdmin';
import PlaygroundPage from '@/app/[locale]/playground/PlaygroundPage';

export default async function PlayGroundServer(): Promise<JSX.Element> {
  let isLoggedIn = false;
  try {
    const cookieStore = cookies();
    isLoggedIn = await checkAuthenticated(cookieStore);
  } catch (error) {
    // eslint-disable-next-line no-console
    if (error instanceof Error) console.log('Catch in sign in: ', error?.message);
    isLoggedIn = true;
  }

  return <PlaygroundPage isLoggedIn={isLoggedIn} />;
}
