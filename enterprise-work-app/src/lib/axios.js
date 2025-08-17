import axios from 'axios';
// Import Axios for HTTP requests

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Not actually used for mock services, but good practice to have a base URL
});
// Create a new Axios instance with a default base URL

api.interceptors.request.use(
  (config) => {
    // This interceptor runs before every request
    const token = localStorage.getItem('token');
    // Retrieve the token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      // If a token exists, add it to the request headers as Bearer token
    }
    return config;
    // Return the modified config so the request can proceed
  },
  (error) => Promise.reject(error)
  // If an error occurs while setting up the request, reject the promise
);

export default api;
// Export the Axios instance for use throughout the app
