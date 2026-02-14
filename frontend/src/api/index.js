import axios from 'axios';

const RENDER_URL = 'https://change-point-analysis-and-statistical.onrender.com';

const API = axios.create({ 
  baseURL: import.meta.env.MODE === 'production' 
    ? RENDER_URL 
    : 'http://localhost:5000' // Removed /api from here to match production structure
});

export const fetchPrices = () => API.get('/api/price-data');
export const fetchAnalysis = () => API.get('/api/analysis-results');

export const uploadAndAnalyze = (formData) => API.post('/api/upload-analyze', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});