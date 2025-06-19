export const generarContexto = (dataGame, mapData, cityData) => {
  if (!dataGame) return "";

  let contexto = `Información del jugador:\n`;
  contexto += `Nombre: ${dataGame.playerData.name}\n`;
  contexto += `Raza: ${dataGame.playerData.race}\n`;
  contexto += `Sexo: ${dataGame.playerData.sex}\n`;
  contexto += `Rol: ${dataGame.playerData.class}\n`;
  contexto += `Naturaleza: ${dataGame.playerData.nature}\n`;
  contexto += `Estatus: ${dataGame.playerData.status}\n`;
  contexto += `Ciudad de origen: ${dataGame.playerData.hometown}\n`;
  contexto += `Economía (dinero): $${dataGame.playerData.money}\n`;

  if (dataGame.playerData.status === 'combate') {
    contexto += `Stats:\n`;
    for (const stat in dataGame.playerData.stats) {
      contexto += `  ${stat}: ${dataGame.playerData.stats[stat]}\n`;
    }
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
    if (mapData.city) {
      contexto += `  Ciudad cercana o actual: ${mapData.city}\n`;
    }
  }

  if (cityData) {
    contexto += `\nDetalles de la ciudad actual:\n`;
    contexto += `Nombre: ${cityData.name}\nTipo: ${cityData.type}\n`;
    contexto += `Habitantes predominantes: ${cityData.population.majority.join(", ")}\n`;
    contexto += `Habitantes presentes: ${cityData.population.minorities.join(", ")}\n`;
    contexto += `Características: ${cityData.features.join(", ")}\n`;
    contexto += `NPCs principales:\n`;
    for (const key in cityData.npcs) {
      const npc = cityData.npcs[key];
      contexto += `  ${npc.name} (${npc.race}) - ${npc.profession}\n`;
    }
  }

    if (mapData.structures) {
      contexto += `  Estructuras presentes: ${mapData.structures}`
    }

  return contexto;
};