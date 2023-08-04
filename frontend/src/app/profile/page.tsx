import { getAccessToken, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import ClientComponent from './client-component';
import ServerComponent from './server-component';
import UserButton from './user-button';

export default withPageAuthRequired(
  async function Page() {
    const session = await getSession();
    const accessToken = await getAccessToken();

    return (
      <main>
        {session && <UserButton session={session} accessToken={accessToken} />}
        <h1>Profile</h1>
        <h2>Page:</h2>
        <h3>Access Token</h3>
        <pre>{JSON.stringify({ accessToken: session?.accessToken }, null, 2)}</pre>
        <h3>User</h3>
        <pre>{JSON.stringify(session?.user, null, 2)}</pre>
        <h2>Server Component:</h2>
        <ServerComponent />
        <h2>Client Component:</h2>
        <ClientComponent />
      </main>
    );
  },
  { returnTo: '/profile' }
);
