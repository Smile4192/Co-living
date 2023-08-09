const config = {
  apiUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000'
      : import.meta.env.VITE_APP_API_URL,
};

export default config;
