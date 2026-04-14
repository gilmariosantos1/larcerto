import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export function useNotificacoes() {
    const { isLoggedIn, user } = useAuth();
    const [pendentes, setPendentes] = useState(0);

    useEffect(() => {
        // Se estiver logado e for Doador, busca as notificações
        if (isLoggedIn && user?.Perfil === 'Doador') {
            fetchNotificacoes();
            // Polling simples a cada 30 segundos (opcional para manter atualizado sem F5)
            const interval = setInterval(fetchNotificacoes, 30000);
            return () => clearInterval(interval);
        }
    }, [isLoggedIn, user]);

    async function fetchNotificacoes() {
        try {
            const res = await api.get('/adocoes/recebidas');
            // Quantidade de doações com status pendente
            const count = res.data.filter(doacao => doacao.Status === 'pendente').length;
            setPendentes(count);
        } catch (error) {
            console.error('Erro ao buscar notificações:', error);
        }
    }

    // Função para forçar atualização ao aprovar/recusar manualmente
    const atualizarNotificacoes = () => {
        if (isLoggedIn && user?.Perfil === 'Doador') {
            fetchNotificacoes();
        }
    };

    return { pendentes, atualizarNotificacoes };
}
