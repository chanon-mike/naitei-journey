import { createContext, useContext } from 'react';

type AccessTokenContextType = {
  accessToken: string;
};

export const AccessTokenContext = createContext<AccessTokenContextType | undefined>(undefined);

export const useAccessToken = (): AccessTokenContextType => {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error('useAccessToken must be used within an AccessTokenProvider');
  }
  return context;
};


