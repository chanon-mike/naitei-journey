import ActionBoard from '@/components/board/ActionBoard';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
  async function Home() {
    return (
      <main>
        <ActionBoard />
      </main>
    );
  },
  { returnTo: '/intern' }
);
