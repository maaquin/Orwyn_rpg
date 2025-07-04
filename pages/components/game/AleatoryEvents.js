import { monsters } from "@/utils/data/monsters";
import { itemsData } from "@/utils/data";

function obtenerItemsAleatorios(cantidad = 1) {
  const posiblesItems = [
    itemsData.item5,  // small potion
    itemsData.item8,  // water
    itemsData.item14, // bread
    itemsData.item26  // map
  ];

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

export function obtenerEventoAleatorio() {
  const eventos = [
    {
      nombre: "Comerciante ambulante",
      descripcion: "Te cruzás con un comerciante ambulante que empuja su carreta llena de objetos exóticos. Te ofrece una muestra gratuita... aunque parece sospechoso."
    },
    {
      nombre: "Caravana de personas",
      descripcion: "Una caravana de personas cansadas pasa a tu lado. Algunos te saludan, otros parecen nerviosos. Se dirigen a un pueblo lejano huyendo de algo..."
    },
    {
      nombre: "Fogata con aventurero",
      descripcion: "En el camino, ves una fogata encendida junto a un aventurero. Te invita a sentarte y compartir historias. Algo en su mirada es inquietante."
    },
    {
      nombre: "Cadáver con ítems",
      getEvento() {
        const recompensa = obtenerItemsAleatorios(Math.random() < 0.5 ? 1 : 2);
        return {
          nombre: this.nombre,
          descripcion: "Encontrás un cadáver tirado entre los arbustos, con algunos objetos aún útiles cerca suyo. ¿Qué habrá pasado? ¿Estará el peligro cerca todavía?",
          recompensa
        };
      }
    },
    {
      nombre: "Ruina abandonada",
      getEvento() {
        const recompensa = obtenerItemsAleatorios(Math.random() < 0.5 ? 1 : 2);
        return {
          nombre: this.nombre,
          descripcion: "Descubrís una pequeña ruina o edificio abandonado cubierto de vegetación. Podrías explorarlo... aunque quizás no estés solo ahí dentro.",
          recompensa
        };
      }
    },
    {
      nombre: "¡Aparece un monstruo!",
      getEvento() {
        const monsterKeys = Object.keys(monsters);
        const randomIndex = Math.floor(Math.random() * monsterKeys.length);
        const key = monsterKeys[randomIndex];
        const monstruo = monsters[key];
        return {
          nombre: this.nombre,
          descripcion: `¡Un ${monstruo.name} aparece! ${monstruo.description}`,
          monstruo
        };
      }
    }
  ];

  const indice = Math.floor(Math.random() * eventos.length);
  return eventos[indice];
}