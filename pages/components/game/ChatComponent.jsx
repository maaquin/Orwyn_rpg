'use client';

import { useState, useEffect } from 'react';
import { useLLM } from '@/hooks/useLLM';
import { responseMove } from './MoveTrue';
import { useTranslation } from 'react-i18next';

export const ChatComponent = ({ contexto, dataGame, mapData, moves, cityData, handle }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [buttons, setButtons] = useState([]);
  const [data, setData] = useState('');
  const [settings, setSettings] = useState('');
  const [npcs, setNpcs] = useState(null);
  const [visibleTexto, setVisibleTexto] = useState('');
  const { t } = useTranslation();

  const { askLLM, history, loading, error } = useLLM();

  const lastMessage = history[history.length - 1];

  useEffect(() => {
    const settingsNow = localStorage.getItem('settings');
    const settingsNew = JSON.parse(settingsNow)

    setSettings(settingsNew)
  }, [])

  useEffect(() => {
    let i = -1;
    setVisibleTexto(''); // limpiar cuando cambia el texto

    const intervalo = setInterval(() => {
      if (1 < response.length) {
        setVisibleTexto(prev => prev + response.charAt(i));
        i++;
      } else {
        clearInterval(intervalo);
      }
    }, settings.textSpeed);

    return () => clearInterval(intervalo);
  }, [response, settings]);

  useEffect(() => {
    if (cityData) {
      setNpcs(cityData.npcs)
    }
  }, [cityData])

  useEffect(() => {
    const fetchSession = async () => {
      const playerId = localStorage.getItem("playerId");
      if (!playerId) return;

      try {
        const res = await fetch(`/api/narrative/${playerId}`);
        const data = await res.json();

        if (res.ok) {
          setResponse(data.currentText);
          setButtons(data.options);
        } else {
          console.error("Not found", data.message);
        }
      } catch (err) {
        console.error("Error", err);
      }
    };

    fetchSession();
  }, [])

  useEffect(() => {
    if (!dataGame) return;

    setData(dataGame.playerData.parents)
  }, [dataGame])


  useEffect(() => {
    if (!dataGame || !mapData || !npcs) return;

    console.log('holas')

    if (dataGame.playerData.status == 'city_structure') {
      const result = getNpcNamesByKey(npcs, dataGame.playerData.structure);

      const acciones = moves(dataGame.playerData.status, result);
      const opciones = [];

      for (const clave in acciones) {
        const valor = acciones[clave];
        opciones.push(...(Array.isArray(valor) ? valor : [valor]));
      }
      setButtons(opciones);
    } else if (dataGame.playerData.status) {
      const acciones = moves(dataGame.playerData.status, mapData.structures);
      const opciones = [];

      for (const clave in acciones) {
        const valor = acciones[clave];
        opciones.push(...(Array.isArray(valor) ? valor : [valor]));
      }
      setButtons(opciones);
    }
  }, [dataGame, mapData, loading])

  useEffect(() => {
    if (history && lastMessage && lastMessage.role === 'assistant') {
      try {
        setResponse(lastMessage.content);
      } catch (e) {
        console.error("Error al parsear respuesta:", e);
      }
    }
  }, [history]);

  useEffect(() => {

    if (!dataGame) return;

    fetch(`/api/narrative/${dataGame._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentText: response || '',
        options: buttons
      })
    }).catch(console.error);

  }, [buttons, response]);


  // Mensaje inicial automático
  useEffect(() => {

    const yaEnviado = localStorage.getItem("llm_iniciado");

    if (contexto && !yaEnviado) {
      askLLM(`${contexto}\n
        Esta es la introducción del juego. Debes presentar el mundo y al personaje jugador por primera y única vez. Es la única instancia donde puedes usar datos biográficos o de origen.
        ESTRUCTURA QUE DEBES SEGUIR:
        1. Comienza con una **descripción ambiental** del lugar donde empieza la historia. Describe con claridad el entorno (visual, sonoro, cultural, etc.). Usa un estilo descriptivo y evocador, pero sobrio. No adornes en exceso.
        2. Introduce al jugador mencionando su:
          - Nombre
          - Raza
          - Rol o clase
        Todo esto debe estar integrado de forma natural en la narración, sin etiquetas ni títulos (“biografía”, “rol”, etc.).
        3. Incluye una breve mención de los padres o tutores del personaje, **en forma narrativa, integrada con el mundo**, sin listas ni formato técnico. Puedes mencionar sus profesiones y la relación que tenían con el jugador, pero de forma evocadora y contextual.
        4. A partir de esta introducción, **no debes volver a mencionar esta información** a menos que el jugador lo solicite directamente o surja de forma lógica en la historia.
        5. No inventes nombres, títulos, lugares ni eventos que no estén dados. Si un lugar aún no ha sido descrito, trátalo como desconocido o sugiere misterio.
        6. Usa un bloque narrativo continuo, sin dividir el texto en secciones ni poner subtítulos como “Capítulo I” o “Lema de la aventura”.
        7. No utilices elementos visuales (como listas, negritas, signos especiales o formato markdown). Es un juego de texto clásico.
        8. No anticipes eventos. Deja que el jugador decida qué hacer. Termina con una situación abierta o una pregunta implícita que invite a tomar una decisión, sin opciones numeradas ni comandos.
          
        Padres:\n  Padre: ${data.father.name}, profesión: ${data.father.profession}\n  Madre: ${data.mother.name}, profesión: ${data.mother.profession}\n  
        `);
      localStorage.setItem("llm_iniciado", "true");
    }
  }, [contexto]);

  function getNpcNamesByKey(npcs, targetKey) {
    return Object.values(npcs)
      .filter(npc => npc.key === targetKey)
      .map(npc => npc.name);
  }

  const handleAsk = () => {
    if (input.trim() === '') return;
    askLLM(`${contexto}\n Inicio diálogo jugador: ${input}\n Fin diálogo jugador`);
    setInput('');
  };

  const handleOptionClick = async (action) => {

    await responseMove({ key: action.key, dataGame });

    askLLM(`${contexto}\nAcción escogida: ${action.message}`);

    handle(true);
  }

  function fontSize() {
    if (!settings || !settings.fontSize) return 1;

    switch (settings.fontSize.toLowerCase()) {
      case 'small':
        return 1;
      case 'medium':
        return 1.4;
      case 'large':
        return 1.8;
      default:
        return 1.4;
    }
  }

  return (
    <div className="text-narrative-container">
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {dataGame && response && buttons && (
        <div className="text-rpg-game" style={{ fontSize: `${fontSize()}rem` }}>
          <p>{visibleTexto}</p>
          <div className='separator-moves-text' />
          <div className={response.length == visibleTexto.length ? 'moves-text-rpg-game' : 'moves-text-rpg-game ocult'}>
            {buttons.map((btn, index) => (
              <div className='option_move'>
                <img
                  src="images/ornaments/option_move.webp"
                  className='separator-game-header'
                  alt="option image"
                />
                <button
                  key={index}
                  onClick={() => handleOptionClick(btn)}
                >
                  {btn.message}
                </button>
              </div>
            ))}
          </div>
          {dataGame.playerData.status === 'npc' && (
            <div className='player_ask_to_npc'>
              <input
                type="text"
                placeholder={t('ask_player')}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className='option_move'>
                <img
                  src="images/ornaments/option_move.webp"
                  className='separator-game-header'
                  alt="option image"
                />
                <button
                  disabled={!input.trim()}
                  onClick={handleAsk}
                >
                  {t('talk')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};