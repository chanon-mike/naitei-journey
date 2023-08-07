import type { FullJobCreate } from '@/types/board';
import { API_ENDPOINT } from '@/utils/envValues';

export const jobApi = {
  getCategoryJobs: async (token: string, userId: string, type: string) => {
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
        throw new Error(`Server responded with status ${response.status}: ${text}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },
  createJob: async (token: string, job: FullJobCreate) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server responded with status ${response.status}: ${text}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error create new job:', error);
      throw error;
    }
  },
};
