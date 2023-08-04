'use client';

import { userApi } from '@/services/user';
import type { GetAccessTokenResult, Session } from '@auth0/nextjs-auth0';

type UserButtonProps = {
  session: Session;
  accessToken: GetAccessTokenResult;
};

const UserButton = async ({ session, accessToken }: UserButtonProps) => {
  const fetchData = async () => {
    await userApi.fetchUsers();
    await userApi.fetchUser(session?.user.sub, accessToken);
  };

  const testAuth = async () => {
    await userApi.testAuth(accessToken);
  };

  return (
    <>
      <a className="rounded-full bg-red-400 text-white cursor-pointer" onClick={testAuth}>
        Test Auth Token
      </a>
      <a className="rounded-full bg-yellow-400 text-white cursor-pointer" onClick={fetchData}>
        Get User Test
      </a>
    </>
  );
};

export default UserButton;
