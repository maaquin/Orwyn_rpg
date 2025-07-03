import { obtenerEventoAleatorio } from "./AleatoryEvents";

export const generarContexto = (dataGame, mapData, cityData) => {
  if (!dataGame) return "";

  let contexto = `Información del jugador:\n`;
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

  switch (dataGame.playerData.status) {
    case 'city':
      contexto += `Te encuentras dentro de una ciudad.\n`;
      contexto += `Nombre: ${cityData.name}\nTipo: ${cityData.type}\n`;
      contexto += `Habitantes predominantes: ${cityData.population.majority.join(", ")}\n`;
      contexto += `Habitantes presentes: ${cityData.population.minorities.join(", ")}\n`;
      contexto += `Características: ${cityData.features.join(", ")}\n`;
      break;
    case 'city_structure':
      contexto += `Estás dentro de la estructura: ${dataGame.playerData.structure}.\n`;
      break;
    case 'npc':
      contexto += `Estás conversando con un NPC.\n`;
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
      contexto += `  ${pos.charAt(0).toUpperCase() + pos.slice(1)} (Coordenada ${tile.coordinate}): ${tile.descripcion}\n tipo de terreno de la casilla: ${tile.terrain}\n`;
    }
  }

  if (mapData.structures) {
    contexto += `  Estructuras presentes: ${mapData.structures}`
  }



  const triggerRandomEvent = dataGame.playerData.status === 'field' && Math.random() < 0.25;

  if (triggerRandomEvent) {
    const evento = obtenerEventoAleatorio();
    contexto += `\nEvento aleatorio: ${evento.nombre}\n`;
    contexto += `Descripcón del evento: ${evento.descripcion}`
  }

  return contexto;
};