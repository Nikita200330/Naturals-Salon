const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api/v1';

class ApiError extends Error {
  constructor(code, message, fields = {}, status = 500) {
    super(message);
    this.code = code;
    this.fields = fields;
    this.status = status;
  }
}

const apiClient = {
  async request(endpoint, options = {}) {
    let url = `${BASE_URL}${endpoint}`;
    
    if (options.params) {
      const searchParams = new URLSearchParams(options.params);
      url += `?${searchParams.toString()}`;
    }

    // Add default headers
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), options.timeout || 10000);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal
      });
      clearTimeout(id);

      // Handle no content
      if (response.status === 204) return null;

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data?.error?.code || 'UNKNOWN_ERROR',
          data?.error?.message || 'Something went wrong',
          data?.error?.details || {},
          response.status
        );
      }

      return data;
    } catch (error) {
      clearTimeout(id);
      
      if (error instanceof ApiError) {
        throw error;
      }

      if (error.name === 'AbortError') {
        throw new ApiError(
          'TIMEOUT',
          'The request is taking longer than expected. Please try again.',
          {},
          408
        );
      }

      // Network error
      throw new ApiError(
        'NETWORK_ERROR',
        'Unable to connect to the salon service right now.',
        {},
        0
      );
    }
  },
  
  get(endpoint, options) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },
  
  post(endpoint, data, options) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};

export default apiClient;
