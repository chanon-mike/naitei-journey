import ActionBoard from '@/components/board/ActionBoard';
import type { ColumnType } from '@/types/board';
import { API_ENDPOINT } from '@/utils/envValues';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

const getData = async (token: string, userId: string, type: string) => {
  console.log('token', token, 'userId', userId);
  const res = await fetch(`${API_ENDPOINT}/category/${userId}?type=${type}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export default withPageAuthRequired(
  async function Home() {
    const boardType = 'インターンシップ';
    const session = await getSession();
    const data: ColumnType[] = await getData(
      session?.accessToken ?? '',
      session?.user.sub,
      boardType
    );

    return (
      <main>
        <ActionBoard type={boardType} userId={session?.user.sub} data={data} />
      </main>
    );
  },
  { returnTo: '/intern' }
);
