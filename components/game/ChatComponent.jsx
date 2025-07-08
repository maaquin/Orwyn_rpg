'use client';

import { useState, useEffect, useRef } from 'react';
import { useLLM } from '@/hooks/useLLM';
import { responseMove } from './MoveTrue';
import { generarContexto } from "./GenerateContext";
import { useTranslation } from 'react-i18next';

export const ChatComponent = ({ dataGame, mapData, moves, cityData, handle, items }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [data, setData] = useState('');
  const [settings, setSettings] = useState('');
  const [buttons, setButtons] = useState([]);
  const [npcs, setNpcs] = useState(null);
  const [visibleTexto, setVisibleTexto] = useState('');
  const [event, setEvent] = useState("");
  const { t } = useTranslation();

  const [hola, setHola] = useState(false);

  const { askLLM, history, loading, error } = useLLM();

  const lastMessage = history[history.length - 1];

  useEffect(() => {
    const settingsNow = localStorage.getItem('settings');
    const settingsNew = JSON.parse(settingsNow)

    setSettings(settingsNew)
  }, [])

  useEffect(() => {
    let i = -1;
    let cancelled = false;
    setVisibleTexto('');

    function escribirLetra() {
      if (cancelled || i >= response.length) return;

      setVisibleTexto(prev => prev + response.charAt(i));
      i++;

      setTimeout(escribirLetra, settings.textSpeed);
    }

    escribirLetra();
    return () => {
      cancelled = true;
    };

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
    if (!dataGame || !mapData || !items) return;

    const { status, structure } = dataGame.playerData;
    const { inventory } = dataGame;

    const getOpciones = (acciones) => {
      const opciones = [];
      for (const clave in acciones) {
        const valor = acciones[clave];
        opciones.push(...(Array.isArray(valor) ? valor : [valor]));
      }
      return opciones;
    };

    let acciones = null;

    switch (status) {
      case 'city_structure': {
        if (!npcs) return;

        const npcsDisponibles = getNamesByKey(npcs, structure);
        const itemsUnicos = filterNonStackableDuplicates(items, inventory)
        const itemsDisponibles = getNamesByKeyAndCity(itemsUnicos, structure, mapData.city);
        const itemsNews = getRandomUniqueItems(itemsDisponibles, 3);

        acciones = moves('city_structure', {
          principal: npcsDisponibles,
          items: itemsNews,
        });
        break;
      }

      case 'npc_event': {
        const itemsUnicos = filterNonStackableDuplicates(items, inventory)
        const itemsDisponibles = getNamesByKey(itemsUnicos, 'trader',);
        const itemsNews = getRandomUniqueItems(itemsDisponibles, 3);

        acciones = moves('npc_event', {
          items: itemsNews,
        });
        break;
      }

      case 'npc': {
        const itemsDisponibles = Object.values(inventory).map(obj => obj.name);
        acciones = moves('npc', {
          items: itemsDisponibles,
        });
        break;
      }

      case 'caravan': {
        const itemsDisponibles = Object.values(inventory).map(obj => obj.name);
        acciones = moves('npc', {
          items: itemsDisponibles,
        });
        break;
      }

      case 'field': {
        if (event) {
          acciones = moves('field', {
            event,
            enterField: mapData.structures
          });
        } else {
          acciones = moves('field', {
            enterField: mapData.structures
          });
        }
        break;
      }

      default: {
        if (status) {
          acciones = moves(status, {
            enter: mapData.structures,
          });
        }
      }
    }

    if (acciones) {
      const opciones = getOpciones(acciones);
      setButtons(opciones);
    }

    setHola(false)

  }, [mapData, loading, event, hola]);


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
        currentText: response || 'response',
        options: buttons
      })
    }).catch(console.error);

  }, [buttons, response]);


  // Mensaje inicial automático
  useEffect(() => {

    const yaEnviado = localStorage.getItem("llm_iniciado");

    const contextoTemp = generarContexto(dataGame, mapData, cityData);
    setEvent(contextoTemp.event);

    if (!yaEnviado && data) {

      askLLM(`${contextoTemp.contexto}\n
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
  }, [data]);

  function getNamesByKey(objects, targetKey) {
    return Object.values(objects)
      .filter(object => {
        if (Array.isArray(object.key)) {
          return object.key.includes(targetKey);
        }
        return object.key === targetKey;
      })
      .map(object => object.name);
  }

  function getNamesByKeyAndCity(objects, targetKey, targetCity) {
    return Object.values(objects)
      .filter(object => {
        const keyMatch = Array.isArray(object.key) && object.key.includes(targetKey);
        const cityMatch = Array.isArray(object.city) && object.city.includes(targetCity);
        return keyMatch && cityMatch;
      })
      .map(object => object.name);
  }

  function filterNonStackableDuplicates(items, inventory) {
    const result = {};

    for (const [id, itemData] of Object.entries(items)) {
      const isInInventory = inventory.some(invItem => invItem.id === id);
      const isStackable = itemData.stackable ?? true;

      if (!isInInventory || isStackable) {
        result[id] = itemData;
      }
    }

    return result;
  }

  function getRandomUniqueItems(array, count) {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  const handleAsk = () => {
    if (input.trim() === '') return;

    const contextoTemp = generarContexto(dataGame, mapData, cityData);
    setEvent(contextoTemp.event);

    askLLM(`${contextoTemp.contexto}\n Inicio diálogo jugador: ${input}\n Fin diálogo jugador`);
    setInput('');
  };

  const handleOptionClick = async (action) => {

    const result = await responseMove({ key: action.key, action: action.action || '', dataGame });

    if (result === 'inventory_full') {
      const contextoTemp = generarContexto(dataGame, mapData, cityData, 'inventory_full');
      setEvent(contextoTemp.event);
      askLLM(contextoTemp.contexto);
      return;

    } else if (result === 'no_money') {
      const contextoTemp = generarContexto(dataGame, mapData, cityData, 'no_money');
      setEvent(contextoTemp.event);
      askLLM(contextoTemp.contexto);
      return;

    } else if (action.key === 'ruin' || action.key === 'corpse') {
      const res = Array.isArray(action.action) && action.action.length > 0
        ? action.action.map(i => i.name).join(", ")
        : null;
      const contextoTemp = generarContexto(dataGame, mapData, cityData, 'rewards', res);
      setEvent(contextoTemp.event);

      setHola(true)
      handle(true);

      askLLM(contextoTemp.contexto);
      return;
    }


    const contextoTemp = generarContexto(dataGame, mapData, cityData);
    setEvent(contextoTemp.event);

    if (action.narrative) {
      askLLM(`${contextoTemp.contexto}\nAcción escogida: ${action.message}`);
    }

    handle(true);
  }

  function fontSize() {
    if (!settings || !settings.fontSize) return 1;

    switch (settings.fontSize.toLowerCase()) {
      case 'small':
        return .9;
      case 'medium':
        return 1.2;
      case 'large':
        return 1.4;
      default:
        return 1.2;
    }
  }

  return (
    <div className="text-narrative-container">
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {dataGame && response && buttons && (
        <div className="text-rpg-game" style={{ fontSize: `${fontSize()}rem` }}>
          <div className='p-container'>
            <p>{visibleTexto}</p>
          </div>
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
          {(dataGame.playerData.status === 'npc' || dataGame.playerData.status === 'bonfire') && (
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