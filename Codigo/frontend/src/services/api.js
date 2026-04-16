import axios from 'axios';

// Com o proxy do Vite, o browser chama /api no dev (ex.: localhost:5173)
// e o Vite encaminha para a API (por padrão http://localhost:3000).
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

/**
 * Função centralizada para resolver URLs de imagens.
 * Resolve caminhos relativos da API e provê fallback para imagens de erro.
 */
export const getImgUrl = (path) => {
  if (!path) return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80';
  if (path.startsWith('http')) return path;
  
  // No Vite, as variáveis de ambiente começam com VITE_
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  return `${baseUrl}${path}`;
};

export default api;
