import { obtenerEventoAleatorio } from "./AleatoryEvents";

export const generarContexto = (dataGame, mapData, cityData) => {
  if (!dataGame) return "";
  
  let contexto = `Información e instrucciones:\n`;

  if (dataGame.playerData.status === 'npc' || dataGame.playerData.status === 'bonfire') {
    contexto += `
            Eres un personaje dentro del mundo de fantasía medieval que está interactuando directamente con el jugador. Tu objetivo es responder con naturalidad, sobriedad y precisión desde tu perspectiva como NPC.
            REGLAS OBLIGATORIAS:
            Responde en primera persona, como si tú fueras el NPC.
            1. Tu tono debe ser sobrio y creíble, sin lenguaje moderno, sin sarcasmo ni exageraciones.
            2. Nunca expliques cosas fuera del conocimiento razonable del personaje. Si no sabes algo, responde con duda o misterio, pero sin inventar hechos concretos.
            3. Mantén tus respuestas entre 20 y 60 palabras. No hagas monólogos largos.
            4. Usa el estilo verbal del mundo de fantasía medieval: directo, con un toque formal si es necesario, pero nunca artificialmente arcaico.
            5. Si el jugador pregunta por direcciones, caminos, o hechos del entorno, responde solo con lo que un personaje local sabría.
            6. No expliques quién eres salvo que te lo pregunten directamente.
            7. No hagas referencias al “jugador” o a conceptos fuera del mundo del juego (como “misiones”, “estadísticas” o “sistema de combate”).
            8. No digas "soy un NPC" ni uses frases metatextuales.
            9. Si te preguntan por un lugar conocido, responde con descripciones sencillas y con referencias geográficas o físicas (“más allá del río”, “sigue la muralla”, “cuando veas las torres…”).
            10. No termines con preguntas ni con indicaciones artificiales tipo “¿Deseas algo más?” o “¿Qué más necesitas?”. Solo detente después de hablar.
            11. Imagina que estás siendo leído en una novela de fantasía sobria, no una caricatura.
            12. Cada diálogo comienza con una línea de descripción breve que introduce al NPC (mirada, gesto, acción), seguida del diálogo directo precedido por un guión largo. No digas quién habla si no ha sido establecido, solo describe lo que hace o cómo reacciona.
            13. Nunca pongas acciones entre paréntesis. Si el personaje hace algo (mira, ríe, se rasca la barba), descríbelo antes del diálogo, como parte de la narración en prosa. Usa solo un guión largo (—) para marcar el inicio de lo que dice, NUNCA PARÉNTESIS.
            14. No inventes nombres de lugares, títulos, personajes o eventos que no estén especificados en el mapa, el entorno o en la información proporcionada. Si algo es desconocido, preséntalo como misterioso, no como un hecho definido.
            
    `
  } else {
    contexto += `
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
            11. Termina cada narración con una apertura a la siguiente acción del jugador. Nunca escribas opciones numeradas, comandos, ni sugerencias de acciones. No incluyas frases como “¿Qué haces ahora?” ni comandos tipo "digita 'hablar con...'".
            12. Nunca uses frases tipo "biografía del jugador", "capítulo I", "introducción", "lema", ni términos metatextuales. La inmersión lo es todo.
            13. Si introduces a un personaje, hazlo de manera sobria (nombre, aspecto general o actitud). No inventes transformaciones, razas, poderes, ni símbolos extraños a menos que estén en la información del mundo.
            14. No añadas preguntas ni sugerencias al final. El jugador decidirá la siguiente acción. Solo describe la escena y detenete.
            15. Lee tu escena como si fueras el jugador. Si hay más de una oración que no afecta directamente lo que el personaje ve, escucha o experimenta, elimínala.
            16. Nunca incluyas pensamientos complejos, motivaciones internas o intenciones del jugador. El jugador decide qué hacer, tú solo describes lo que ocurre.
            17. Si el jugador entra a una estructura (tienda, taberna, templo, casa, etc.), describe únicamente el interior de esa estructura. No narres el camino hacia ella ni elementos exteriores, a menos que la acción anterior lo justifique.
            `
  }

  
  contexto += `Información del jugador:\n`;
  contexto += `Nombre: ${dataGame.playerData.name}\n`;
  contexto += `Raza: ${dataGame.playerData.race}\n`;
  contexto += `Sexo: ${dataGame.playerData.sex}\n`;
  contexto += `Rol: ${dataGame.playerData.class}\n`;
  contexto += `Naturaleza: ${dataGame.playerData.nature}\n`;
  contexto += `Ciudad de origen: ${dataGame.playerData.hometown}\n`;
  contexto += `Economía (dinero): $${dataGame.playerData.money}\n`;

  if (dataGame.playerData.status === 'combate') {
    contexto += `Stats:\n`;
    for (const stat in dataGame.playerData.stats) {
      contexto += `  ${stat}: ${dataGame.playerData.stats[stat]}\n`;
    }
  }

  function structuresJoin(estructuras) {
    let estructuresStr = '';

    for (const zona in estructuras) {
      const lugares = estructuras[zona].join(', ');
      estructuresStr += `${zona}: ${lugares}\n`;
    }

    return structuresJoin;
  }

  switch (dataGame.playerData.status) {
    case 'city':
      contexto += `Te encuentras dentro de una ciudad.\n`;
      contexto += `Nombre: ${cityData.name}\nTipo: ${cityData.type}\n`;
      contexto += `Habitantes predominantes: ${cityData.population.majority.join(", ")}\n`;
      contexto += `Habitantes presentes: ${cityData.population.minorities.join(", ")}\n`;
      contexto += `Características: ${cityData.features.join(", ")}\n`;
      contexto += `Estructuras: ${structuresJoin(cityData.structures)}\n`;
      break;
    case 'city_structure':
      contexto += `Estás dentro de la estructura: ${dataGame.playerData.structure}.\n`;
      break;
    case 'npc':
      contexto += `Estás conversando con un NPC.\n`;
      contexto += 'Responde solo con el diálogo de ese personaje, poniéndote en su lugar. No generes narración, contexto, ni descripciones. Solo responde como si fueras el NPC. Los diálogos del jugador se reciben el siguiente formato: Inicio diálogo jugador: (Diálogo del jugador) Fin diálogo jugador. Interpreta que el jugador está hablando directamente y responde solo como el NPC en un diálogo coherente. El jugador no está describiendo acciones, está diciendo frases.No asumas movimiento ni narrativa adicional.'
      break;
    case 'flied':
      contexto += `Te encuentras explorando los terrenos abiertos.\n`;
      break;
  }

  contexto += `Inventario: ${dataGame.inventory.join(", ")}\n`;

  if (dataGame.history.length > 0) {
    contexto += `Historial de acciones y eventos recientes:\n`;
    dataGame.history.forEach((evento, i) => {
      contexto += `  ${i + 1}. ${evento}\n`;
    });
  }

  if (mapData) {
    contexto += `\nInformación del mapa alrededor:\n`;
    for (const [pos, tile] of Object.entries(mapData.map)) {
      contexto += `  ${pos.charAt(0).toUpperCase() + pos.slice(1)}: ${tile.descripcion}\n tipo de terreno de la casilla: ${tile.terrain}\n`;
    }
  }

  let evento = null;

  if (mapData.structures && dataGame.playerData.status === 'field') {
    contexto += 'HAZ ÉNFASIS DE LA SIGUIENTE ESTRUCTURA EN LA NARRATIVA'
    contexto += `  Estructuras presentes: ${mapData.structures}`
  } else if (!mapData.structures && dataGame.playerData.status === 'field') {

    const triggerRandomEvent = dataGame.playerData.status === 'field';
    if (triggerRandomEvent) {
      evento = obtenerEventoAleatorio();
      contexto += 'HAZ ÉNFASIS DEL SIGUIENTE EVENTO EN LA NARRATIVA'
      contexto += `\nEvento aleatorio: ${evento.nombre}\n`;
      contexto += `Descripcón del evento: ${evento.descripcion}`
    }
  }

  return {
    contexto: contexto,
    event: evento
  };
};