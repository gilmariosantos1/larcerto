import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ChatBox({ idDoacao, idRemetente, onClose }) {
  const [mensagens, setMensagens] = useState([]);
  const [novoTexto, setNovoTexto] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    let interval;
    const carregarMensagens = async () => {
      try {
        const res = await api.get(`/mensagens/${idDoacao}`);
        setMensagens(res.data);
      } catch (err) {
        console.error('Erro ao carregar mensagens', err);
      } finally {
        setLoading(false);
      }
    };

    carregarMensagens();
    // Polling pra atualizar o chat a cada 5s
    interval = setInterval(carregarMensagens, 5000);
    return () => clearInterval(interval);
  }, [idDoacao]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [mensagens]);

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!novoTexto.trim()) return;

    try {
      const res = await api.post(`/mensagens/${idDoacao}`, { Texto: novoTexto });
      setMensagens(prev => [...prev, res.data]);
      setNovoTexto('');
    } catch (err) {
      console.error('Erro ao enviar mensagem', err);
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '400px', 
      background: '#fff', borderRadius: '16px', overflow: 'hidden', 
      border: '1px solid #eee'
    }}>
      <div style={{
        background: '#2d2de4', color: '#fff', padding: '16px', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>💬 Chat da Adoção</h3>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>✕</button>
      </div>

      <div 
        ref={messagesEndRef}
        style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#f5f7fa', display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        {loading ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Carregando...</p>
        ) : mensagens.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', margin: 'auto' }}>Nenhuma mensagem ainda.<br/>Que tal dar um oi?</p>
        ) : (
          mensagens.map(msg => {
            const isMe = msg.idRemetente === user.idPessoa;
            return (
              <div key={msg.idMensagem} style={{
                alignSelf: isMe ? 'flex-end' : 'flex-start',
                background: isMe ? '#2d2de4' : '#fff',
                color: isMe ? '#fff' : '#333',
                padding: '10px 14px',
                borderRadius: '16px',
                borderBottomRightRadius: isMe ? '4px' : '16px',
                borderBottomLeftRadius: isMe ? '16px' : '4px',
                maxWidth: '75%',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}>
                <p style={{ margin: 0, fontSize: '14px' }}>{msg.Texto}</p>
                <small style={{ fontSize: '10px', opacity: 0.7, alignSelf: 'flex-end', display: 'block', textAlign: 'right', marginTop: '4px' }}>
                  {new Date(msg.DataHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </small>
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={enviarMensagem} style={{ display: 'flex', padding: '12px', background: '#fff', borderTop: '1px solid #eee' }}>
        <input 
          type="text" 
          placeholder="Digite sua mensagem..." 
          value={novoTexto}
          onChange={e => setNovoTexto(e.target.value)}
          style={{ flex: 1, padding: '10px 15px', borderRadius: '30px', border: '1px solid #ddd', outline: 'none' }}
        />
        <button type="submit" disabled={!novoTexto.trim()} style={{
          marginLeft: '10px', background: novoTexto.trim() ? '#2d2de4' : '#ccc', 
          color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', 
          cursor: novoTexto.trim() ? 'pointer' : 'not-allowed'
        }}>
          ➤
        </button>
      </form>
    </div>
  );
}
