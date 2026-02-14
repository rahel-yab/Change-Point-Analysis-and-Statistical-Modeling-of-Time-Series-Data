import axios from 'axios';

// Replace with your actual Render URL after you deploy the backend
const RENDER_URL = 'https://your-backend-name.onrender.com/api';

const API = axios.create({ 
  baseURL: import.meta.env.MODE === 'production' 
    ? RENDER_URL 
    : 'http://localhost:5000/api' 
});

export const fetchPrices = () => API.get('/price-data');
export const fetchAnalysis = () => API.get('/analysis-results');

// Add the upload function here to keep things organized
export const uploadAndAnalyze = (formData) => API.post('/upload-analyze', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});