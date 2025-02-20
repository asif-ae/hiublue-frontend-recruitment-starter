import apiClient from './apiClient';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserResponse {
  data: User[];
}

/**
 * Fetches the list of users.
 * @param {number} page - Page number for pagination.
 * @param {number} per_page - Number of items per page.
 * @param {string} search - Search query.
 * @returns {Promise<UserResponse>} - Returns a promise with the response data.
 */
export const getUsers = async (
  page: number = 1,
  per_page: number = 5,
  search?: string,
): Promise<UserResponse> => {
  try {
    const response = await apiClient.get<UserResponse>('/users', {
      params: { page, per_page, search },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
