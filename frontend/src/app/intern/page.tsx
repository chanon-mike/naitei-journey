import ActionBoard from '@/components/board/ActionBoard';
import type { ColumnType } from '@/types/board';
import { API_ENDPOINT } from '@/utils/envValues';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

const getData = async (token: string, userId: string, type: string) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/category/${userId}?type=${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Server responded with a non-ok status:', response.status, text);
      throw new Error(`Server responded with status ${response.status}: ${text}`);
    }
    return response.json();

  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
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
        <ActionBoard type={boardType} userId={session?.user.sub} data={data} accessToken={session?.accessToken ?? ''} />
      </main>
    );
  },
  { returnTo: '/intern' }
);
