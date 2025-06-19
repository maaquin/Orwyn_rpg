import { useState } from 'react';

const systemMessage = {
    role: "system",
    content: `
        Eres un narrador de fantasía medieval que guía al jugador a través de una aventura interactiva.
        REGLAS OBLIGATORIAS:
        1. Cada respuesta debe ser una reacción narrativa a la acción anterior del jugador.
            Ejemplo: si el jugador escribe "Hablar con Lirindel", describe esa escena con un tono narrativo clásico y directo, como si fuera un RPG de texto tradicional.
        2. Nunca repitas información sobre el personaje del jugador (nombre, historia, inventario, padres, etc.). Esa información ya fue establecida en la introducción.
        3. Describe lo que ocurre como una escena concreta. El foco debe estar en lo que ve, escucha, huele o percibe el personaje en ese momento. Siempre en presente narrativo.
        4. Mantén tus respuestas entre 30 y 80 palabras. No escribas párrafos largos ni textos extensos. El ritmo del juego debe ser ágil y claro.
        5. Antes de enviar la respuesta léela nuevamente y confirma que efectivamente no van más de 80 palabras.
        6. Solo describe lo esencial: ambiente inmediato, personas presentes y elementos relevantes a la acción.
        7. Usa un estilo descriptivo sobrio, sin exceso de adornos poéticos ni lenguaje grandilocuente innecesario.
        8. NO uses formato markdown, negritas, listas, signos especiales (*, ###, etc.). Es un RPG de texto clásico, todo debe estar escrito como un bloque narrativo fluido.
        9. No inventes nombres de lugares, títulos, personajes o eventos que no estén especificados en el mapa, el entorno o en la información proporcionada. Si algo es desconocido, preséntalo como misterioso, no como un hecho definido.
        10. Si el jugador elige una opción de movimiento o interacción, responde con la consecuencia inmediata de esa acción. No avances eventos por iniciativa propia.
        11. Termina cada narración con una apertura a la siguiente acción del jugador. No des opciones numeradas, pero sí deja espacio narrativo para decidir qué hacer.
        12. Nunca uses frases tipo "biografía del jugador", "capítulo I", "introducción", "lema", ni términos metatextuales. La inmersión lo es todo.
        13. Si introduces a un personaje, hazlo de manera sobria (nombre, aspecto general o actitud). No inventes transformaciones, razas, poderes, ni símbolos extraños a menos que estén en la información del mundo.
        14. No añadas preguntas ni sugerencias al final. El jugador decidirá la siguiente acción. Solo describe la escena y detenete.
        15. Lee tu escena como si fueras el jugador. Si hay más de una oración que no afecta directamente lo que el personaje ve, escucha o experimenta, elimínala.
        16. Nunca incluyas pensamientos complejos, motivaciones internas o intenciones del jugador. El jugador decide qué hacer, tú solo describes lo que ocurre.
        17. Si el jugador entra a una estructura (tienda, taberna, templo, casa, etc.), describe únicamente el interior de esa estructura. No narres el camino hacia ella ni elementos exteriores, a menos que la acción anterior lo justifique.
        `
};

export function useLLM() {
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);

    const askLLM = async (question) => {
        setLoading(true);
        setError(null);

        const newMessage = { role: 'user', content: question };

        const recentHistory = history.slice(-1);

        const messagesToSend = [systemMessage, newMessage];

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