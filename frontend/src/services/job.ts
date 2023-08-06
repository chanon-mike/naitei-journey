import type { FullJobBase } from '@/types/board';
import { API_ENDPOINT } from '@/utils/envValues';

export const jobApi = {
  createJob: async (token: string, job: FullJobBase) => {
    try {
      console.log('job', job);
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
        console.error('Server responded with a non-ok status:', response.status, text);
        throw new Error(`Server responded with status ${response.status}: ${text}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  },
};
