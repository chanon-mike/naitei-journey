import { API_ENDPOINT } from '@/libs/envValues';
import type { FullJobCreate, FullJobUpdate, Job, JobPositionUpdate } from '@/types/board';

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
      console.error('Error fetching categories:', error);
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
  editJob: async (token: string, job: FullJobUpdate, jobId: Job['id']) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/job/${jobId}`, {
        method: 'PUT',
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
      console.error('Error edit a job:', error);
      throw error;
    }
  },
  editJobCategory: async (token: string, jobId: Job['id'], categoryId: string) => {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/job/${jobId}/category?to_category_id=${categoryId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server responded with status ${response.status}: ${text}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error edit a job:', error);
      throw error;
    }
  },
  editCardPositions: async (token: string, updatedJobs: JobPositionUpdate[]) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/job/card-position`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedJobs),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server responded with status ${response.status}: ${text}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error edit a job:', error);
      throw error;
    }
  },
  deleteJob: async (token: string, jobId: Job['id']) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/job/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server responded with status ${response.status}: ${text}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error delete a job:', error);
      throw error;
    }
  },
};
