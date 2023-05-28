import { Nav } from '@/components/layout/Header/Nav/Nav';
import { getIsLogged } from '@/firebase/firebaseAdmin';
import { cookies } from 'next/headers';

export async function ServerNav(): Promise<JSX.Element> {
  let isLoggedIn = false;

  try {
    isLoggedIn = await getIsLogged(cookies());
  } catch {}

  return <Nav isLoggedIn={isLoggedIn} />;
}
