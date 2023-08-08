import ActionBoard from '@/components/board/ActionBoard';
import { jobApi } from '@/services/job';
import type { Category } from '@/types/board';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
  async function Home() {
    const boardType = 'インターンシップ';
    const session = await getSession();
    const data: Category[] = await jobApi.getCategoryJobs(
      session?.accessToken ?? '',
      session?.user.sub,
      boardType
    );

    return (
      <main>
        <ActionBoard
          type={boardType}
          userId={session?.user.sub}
          data={data}
          accessToken={session?.accessToken ?? ''}
        />
      </main>
    );
  },
  { returnTo: '/intern' }
);
