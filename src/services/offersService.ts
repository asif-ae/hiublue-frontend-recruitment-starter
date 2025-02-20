import apiClient from './apiClient';

interface Offer {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: string;
  type: string;
}

interface GetOfferResponse {
  data: Offer[];
}

interface OfferRequest {
  plan_type: 'monthly' | 'yearly' | 'pay_as_you_go';
  additions: ('refundable' | 'on_demand' | 'negotiable')[];
  user_id: number;
  expired: string;
  price: number;
}

interface CreateOfferResponse {
  message: string;
  data: OfferRequest;
}

/**
 * Fetches the list of offers.
 * @param {number} page - Page number for pagination.
 * @param {number} per_page - Number of items per page.
 * @param {string} search - Search query.
 * @param {string} type - Offer type (e.g., 'yearly').
 * @param {string} status - Offer status (e.g., 'rejected').
 * @returns {Promise<GetOfferResponse>} - Returns a promise with the response data.
 */
export const getOffers = async (
  page: number = 1,
  per_page: number = 5,
  search?: string,
  type?: string,
  status?: string,
): Promise<GetOfferResponse> => {
  try {
    const response = await apiClient.get<GetOfferResponse>('/offers', {
      params: { page, per_page, search, type, status },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};

/**
 * Creates a new offer.
 * @param {OfferRequest} offerData - Offer data to be sent in the request.
 * @returns {Promise<OfferResponse>} - Returns a promise with the response data.
 */
export const createOffer = async (
  offerData: OfferRequest,
): Promise<CreateOfferResponse> => {
  try {
    const response = await apiClient.post<CreateOfferResponse>(
      '/offers',
      offerData,
    );
    return response.data;
  } catch (error) {
    console.error('Error creating offer:', error);
    throw error;
  }
};
