import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchPrices = () => API.get('/price-data');
export const fetchAnalysis = () => API.get('/analysis-results');