import type { GetAccessTokenResult } from '@auth0/nextjs-auth0';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const userApi = {
  testAuth: async (accessToken: GetAccessTokenResult) => {
    try {
      const response = await fetch(`${API_URL}/api/private`, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  },
  fetchUsers: async () => {
    try {
      const response = await fetch(`${API_URL}/user/`);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  },
  fetchUser: async (id: string, accessToken: GetAccessTokenResult) => {
    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  },
};
