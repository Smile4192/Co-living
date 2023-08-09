import config from '@/config';
import axios from 'axios';

export const placeholderApi = axios.create({
  baseURL: config.apiUrl || 'http://localhost:8000',
});
