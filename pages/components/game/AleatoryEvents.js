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
      descripcion: "Encontrás un cadáver tirado entre los arbustos, con algunos objetos aún útiles cerca suyo. ¿Qué habrá pasado? ¿Estará el peligro cerca todavía?"
    },
    {
      nombre: "Ruina abandonada",
      descripcion: "Descubrís una pequeña ruina o edificio abandonado cubierto de vegetación. Podrías explorarlo... aunque quizás no estés solo ahí dentro."
    }
  ];

  const indice = Math.floor(Math.random() * eventos.length);
  return eventos[indice];
}