'use client';

import { useState, useEffect } from 'react';
import { useLLM } from '@/hooks/useLLM';
import { generarContexto } from "./functions/GenerateContext";
import { Ask } from './buttons/Ask';
import { Moves } from './buttons/Moves';
import { Combat } from './buttons/Combat';
import { Handles } from './functions/Handles';

export const ChatComponent = ({ dataGame, mapData, moves, cityData, handle, items }) => {
  const [input, setInput] = useState(null);
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [npcs, setNpcs] = useState(null);
  const [visibleTexto, setVisibleTexto] = useState('');
  const [buttons, setButtons] = useState([]);
  const [event, setEvent] = useState(null);
  const [monster, setMonster] = useState(null);
  const [action, setAction] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const [hola, setHandle] = useState(false);

  const { askLLM, history, loading, error } = useLLM();
  const {
    getNamesByKey, getNamesByKeyAndCity, getRandomUniqueItems,
    filterNonStackableDuplicates, fontSize } =
    Handles({
      setEvent, askLLM, dataGame, mapData, cityData,
      setHandle, handle, input, setInput, settings
    });

  const lastMessage = history[history.length - 1];

  useEffect(() => {
    // Obtener settings y fetch inicial
    const settingsNow = localStorage.getItem('settings');
    const settingsNew = JSON.parse(settingsNow);
    setSettings(settingsNew);

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
  }, []); // Solo al montar

  useEffect(() => {
    // Cambiar monstruo si hay evento
    if (event) {
      setMonster(event.monster);
    }
  }, [event]);

  useEffect(() => {
    // Texto tipo máquina de escribir
    if (dataGame?.playerData?.status === 'combat' || !response) return;

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
    // Actualiza botones según el estado del juego
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
        const itemsUnicos = filterNonStackableDuplicates(items, inventory);
        const itemsDisponibles = getNamesByKeyAndCity(itemsUnicos, structure, mapData.city);
        const itemsNews = getRandomUniqueItems(itemsDisponibles, 3);

        acciones = moves('city_structure', {
          principal: npcsDisponibles,
          items: itemsNews,
        });
        break;
      }

      case 'npc_event': {
        const itemsUnicos = filterNonStackableDuplicates(items, inventory);
        const itemsDisponibles = getNamesByKey(itemsUnicos, 'trader');
        const itemsNews = getRandomUniqueItems(itemsDisponibles, 3);

        acciones = moves('npc_event', { items: itemsNews });
        break;
      }

      case 'npc':
      case 'caravan': {
        const itemsDisponibles = Object.values(inventory).map(obj => obj.name);
        acciones = moves('npc', { items: itemsDisponibles });
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

    setHandle(false);
  }, [dataGame, mapData, event, npcs, hola, loading]); // quité `hola` y `loading` si no se usan realmente

  useEffect(() => {
    // Si cambia history y hay respuesta del asistente
    if (history && lastMessage && lastMessage.role === 'assistant') {
      try {
        setResponse(lastMessage.content);
      } catch (e) {
        console.error("Error al parsear respuesta:", e);
      }
    }
  }, [history]);

  useEffect(() => {
    // Actualizar narrativa con response y botones
    if (!dataGame) return;

    fetch(`/api/narrative/${dataGame._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentText: response || 'response',
        options: buttons
      })
    }).catch(console.error);
  }, [buttons, response, dataGame]);

  useEffect(() => {
    // Si hay cityData o dataGame
    if (cityData) {
      setNpcs(cityData.npcs);
    }

    if (dataGame) {
      setData(dataGame.playerData.parents);
    }
  }, [cityData, dataGame]);


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

  return (
    <div className="text-narrative-container">
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {dataGame && response && buttons && (
        <div className="text-rpg-game" style={{ fontSize: `${fontSize()}rem` }}>
          <div className='p-container'>
            {dataGame.playerData.status !== 'combat' ? (
              <p>{visibleTexto}</p>
            ) : (
              <Combat
                mapData={mapData}
                dataGame={dataGame}
                monster={monster}
                action={action}
                animKey={animKey}
              />
            )}
          </div>
          <div className='separator-moves-text' />
          <Moves
            response={response}
            visibleTexto={visibleTexto}
            buttons={buttons}
            dataGame={dataGame}
            mapData={mapData}
            cityData={cityData}
            setEvent={setEvent}
            askLLM={askLLM}
            setHandle={setHandle}
            handle={handle}
            setAction={setAction}
            setAnimKey={setAnimKey}
          />
          <Ask
            dataGame={dataGame}
            input={input}
            setInput={setInput}
            mapData={mapData}
            cityData={cityData}
          />
        </div>
      )}
    </div>
  );
};