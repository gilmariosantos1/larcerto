import { useState, useEffect } from 'react';

/**
 * Hook e Componente de Notificação (Toast) Supreme
 * Para usar: const { notify } = useNotificacao(); notify('Mensagem', 'success' | 'error');
 */

let notifyFn = null;

export const useNotificacao = () => {
  return {
    notify: (msg, type = 'success') => notifyFn?.(msg, type)
  };
};

export default function Notificacao() {
  const [notificacao, setNotificacao] = useState(null);

  useEffect(() => {
    notifyFn = (mensagem, tipo) => {
      setNotificacao({ mensagem, tipo });
      setTimeout(() => setNotificacao(null), 4000);
    };
    return () => { notifyFn = null; };
  }, []);

  if (!notificacao) return null;

  const isError = notificacao.tipo === 'error';

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 9999,
      background: isError ? '#ff4d4d' : '#2d2de4',
      color: '#fff',
      padding: '16px 24px',
      borderRadius: '20px',
      boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: '700',
      fontSize: '15px',
      animation: 'toastEnter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }}>
      <style>
        {`
          @keyframes toastEnter {
            from { opacity: 0; transform: translateY(50px) scale(0.8); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>
      <span style={{ fontSize: '20px' }}>{isError ? '⚠️' : '✅'}</span>
      {notificacao.mensagem}
    </div>
  );
}
