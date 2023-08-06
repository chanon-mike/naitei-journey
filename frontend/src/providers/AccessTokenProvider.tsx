import { AccessTokenContext } from '@/contexts/AccessTokenContext';
import type { ReactNode } from 'react';

type AccessTokenProviderProps = {
  children: ReactNode;
  accessToken: string;
};

export const AccessTokenProvider = ({
  children,
  accessToken,
}: AccessTokenProviderProps): JSX.Element => {
  return (
    <AccessTokenContext.Provider value={{ accessToken }}>{children}</AccessTokenContext.Provider>
  );
};
