import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente para proteger rotas por autenticação e por perfil de usuário.
 * @param {string} role - Perfil exigido ('Doador' ou 'Adotante') 
 */
export default function ProtectedRoute({ children, role }) {
  const { isLoggedIn, user, loading } = useAuth();

  // Enquanto carrega o perfil do token, não redireciona
  if (loading) return null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.Perfil !== role) {
    // Se o usuário não tem o perfil exigido, manda pro home
    return <Navigate to="/" replace />;
  }

  return children;
}
