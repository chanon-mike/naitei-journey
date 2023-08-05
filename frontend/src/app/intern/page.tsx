import ActionBoard from '@/components/board/ActionBoard';
import { API_ENDPOINT } from '@/utils/envValues';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

async function getData(token: string) {
  const res = await fetch(`${API_ENDPOINT}/job`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default withPageAuthRequired(
  async function Home() {
    const session = await getSession();
    const data = await getData(session?.accessToken ?? '');

    return (
      <main>
        <p>{JSON.stringify(data)}</p>
        <ActionBoard />
      </main>
    );
  },
  { returnTo: '/intern' }
);

