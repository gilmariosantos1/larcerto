import axios from 'axios';

// Com o proxy do Vite configurado, usamos apenas '/api' sem hostname.
// O browser faz a requisição para o mesmo servidor (localhost:5172/api/...)
// e o Vite redireciona internamente para http://localhost:3001/api/...
// Isso elimina completamente os erros de CORS.
const api = axios.create({
  baseURL: '/api',
});

// Interceptor: adiciona o token JWT em todas as requisições automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de Resposta: Trata erros de autenticação (401) globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Se der 401 (Unauthorized), desloga e limpa tudo
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
