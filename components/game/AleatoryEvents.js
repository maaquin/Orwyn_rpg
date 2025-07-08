import { monsters } from "@/utils/data/monsters";
import { itemsData } from "@/utils/data";

function obtenerItemsAleatorios(cantidad = 1) {

  const itemKeys = ['item5', 'item8', 'item14', 'item26'];

  const posiblesItems = itemKeys.map(key => {
    return {
      ...itemsData[key],
      id: key
    };
  });

  const itemsElegidos = [];

  const indicesElegidos = new Set();
  while (itemsElegidos.length < cantidad && indicesElegidos.size < posiblesItems.length) {
    const index = Math.floor(Math.random() * posiblesItems.length);
    if (!indicesElegidos.has(index)) {
      indicesElegidos.add(index);
      itemsElegidos.push(posiblesItems[index]);
    }
  }

  return itemsElegidos;
}

function getReward() {
  const action = obtenerItemsAleatorios(Math.random() < 0.5 ? 1 : 2);
  return {
    action
  };
}

export function obtenerEventoAleatorio() {
  const eventos = [
    {
      nombre: "Comerciante ambulante",
      descripcion: "Te cruzás con un comerciante ambulante que empuja su carreta llena de objetos exóticos. Te ofrece una muestra gratuita... aunque parece sospechoso.",
      key: "trader"
    },
    {
      nombre: "Caravana de personas",
      descripcion: "Una caravana de personas cansadas pasa a tu lado. Algunos te saludan, otros parecen nerviosos. Se dirigen a un pueblo lejano huyendo de algo...",
      key: "caravan"
    },
    {
      nombre: "Fogata con aventurero",
      descripcion: "En el camino, ves una fogata encendida junto a un aventurero. Te invita a sentarte y compartir historias. Algo en su mirada es inquietante.",
      key: "bonfire"
    },
    {
      nombre: "Campamento abandonado",
      descripcion: "El jugador se ha encontrado un campamento abandonado, con algunos objetos aún útiles cerca suyo. parece que la fogata ha sido apagada hace no mucho",
      key: "corpse",
      action: getReward()
    },
    {
      nombre: "Ruina abandonada",
      descripcion: "Descubrís una pequeña ruina o edificio abandonado cubierto de vegetación. Podrías explorarlo... aunque quizás no estés solo ahí dentro.",
      action: getReward(),
      key: "ruin"
    },
    {
      nombre: "¡Aparece un monstruo!",
      getEvento() {
        const monsterKeys = Object.keys(monsters);
        const randomIndex = Math.floor(Math.random() * monsterKeys.length);
        const key = monsterKeys[randomIndex];
        const monster = monsters[key];
        return {
          nombre: this.nombre,
          descripcion: `¡Un ${monster.name} aparece! ${monster.description}`,
          monster,
          key: "monster"
        };
      }
    }
  ];

  const indice = Math.floor(Math.random() * eventos.length);
  return eventos[indice];
}