import { useState } from 'react';

export function useLLM() {
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);

    const askLLM = async (question) => {
        setLoading(true);
        setError(null);

        console.log(question)

        const newMessage = { role: 'user', content: question };

        const recentHistory = history.slice(-1);

        const lastMessage = {
            role: 'context',
            content: `este fue el último escenario en que estuvo el jugador.
            continúa la historia partiendo de aquí: ${recentHistory}`
        }

        const messagesToSend = [newMessage, lastMessage];

        try {
            const res = await fetch('/api/llm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: messagesToSend }),
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            const assistantReply = { role: 'assistant', content: data.result };

            setHistory([...recentHistory, newMessage, assistantReply]);
        } catch (err) {
            setError(err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    return {
        askLLM,
        history,
        loading,
        error,
    };
}