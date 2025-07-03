import { itemsData } from "./items";

function buscarItemPorNombre(obj, name) {
  const entrada = Object.entries(obj).find(([clave, valor]) => valor.name === name);
  return entrada ? { id: entrada[0], data: entrada[1] } : null;
}

export const actions = {
    field: {
        north: [
            { message: "caminar al norte", key: "north" },
            { message: "avanzar hacia el norte", key: "north" },
            { message: "explorar hacia el norte", key: "north" },
            { message: "andar en dirección norte", key: "north" }
        ],

        south: [
            { message: "caminar al sur", key: "south" },
            { message: "avanzar hacia el sur", key: "south" },
            { message: "explorar hacia el sur", key: "south" },
            { message: "andar en dirección sur", key: "south" }
        ],

        east: [
            { message: "caminar al este", key: "east" },
            { message: "avanzar hacia el este", key: "east" },
            { message: "explorar hacia el este", key: "east" },
            { message: "andar en dirección este", key: "east" }
        ],

        west: [
            { message: "caminar al oeste", key: "west" },
            { message: "avanzar hacia el oeste", key: "west" },
            { message: "explorar hacia el oeste", key: "west" },
            { message: "andar en dirección oeste", key: "west" }
        ],

        interact: [
            { message: "interactuar con el entorno", key: "interact" },
            { message: "analizar el entorno", key: "interact" },
            { message: "examinar los alrededores", key: "interact" },
            { message: "mirar a tu alrededor", key: "interact" }
        ],

        enter: (estructuras) => {
            if (!estructuras || estructuras.length === 0) return [];

            const plantillas = [
                "entrar a ___",
                "acceder a ___",
                "dirigirte a ___",
                "ir a ___",
                "ingresar a ___"
            ];


            return estructuras.map(estructura => {
                const plantillaAleatoria = plantillas[Math.floor(Math.random() * plantillas.length)];
                return {
                    message: plantillaAleatoria.replace("___", estructura.name),
                    key: `${estructura.key}`
                }
            });
        },
    },
    combate: {
        quick: [
            { message: "ataque rápido", key: "quick" },
            { message: "golpe veloz", key: "quick" },
            { message: "ataque relámpago", key: "quick" },
            { message: "asestar un golpe ligero", key: "quick" }
        ],

        strong: [
            { message: "ataque cargado", key: "strong" },
            { message: "golpe poderoso", key: "strong" },
            { message: "ataque fuerte", key: "strong" },
            { message: "descargar energía en un golpe", key: "strong" }
        ],

        defense: [
            { message: "defenderse", key: "defense" },
            { message: "bloquear", key: "defense" },
            { message: "prepararse para recibir daño", key: "defense" },
            { message: "cubrirse", key: "defense" }
        ],

        run: [
            { message: "huir", key: "run" },
            { message: "escapar", key: "run" },
            { message: "salir corriendo", key: "run" },
            { message: "retirarse", key: "run" }
        ]
    },
    city: {
        enter: (estructuras) => {
            if (!estructuras || estructuras.length === 0) return [];

            const plantillas = [
                "entrar a ___",
                "acceder a ___",
                "dirigirte a ___",
                "ir a ___",
                "ingresar a ___"
            ];


            return estructuras.map(estructura => {
                const plantillaAleatoria = plantillas[Math.floor(Math.random() * plantillas.length)];
                return {
                    message: plantillaAleatoria.replace("___", estructura.name),
                    key: `${estructura.key}`
                }
            });
        },

        walk: [
            { message: "caminar al otro sector de la ciudad", key: "walk" },
            { message: "cambiar de zona de la ciudad", key: "walk" },
            { message: "pasar al sector opuesto de la ciudad", key: "walk" }
        ],

        out: [
            { message: "salir de la ciudad", key: "out" },
            { message: "abandonar la ciudad", key: "out" },
            { message: "irse de la ciudad", key: "out" },
            { message: "caminar hacia las afueras", key: "out" }
        ]
    },
    city_structure: {
        out: [
            { message: "salir a la ciudad", key: "out_structure" },
            { message: "regresar a la ciudad", key: "out_structure" },
            { message: "salir", key: "out_structure" },
            { message: "dejar el lugar", key: "out_structure" }
        ],

        principal: (npcs) => {
            if (!npcs) return [];

            const plantillas = [
                "hablar con ___",
                "conversar con ___",
                "dirigirse a ___"
            ];


            return npcs.map(npc => {
                const plantillaAleatoria = plantillas[Math.floor(Math.random() * plantillas.length)];
                return {
                    message: plantillaAleatoria.replace("___", npc),
                    key: 'npc'
                }
            });
        },

        items: (items) => {
            if (!items) return [];

            const plantillas = [
                "Comprar: ___"
            ];


            return items.map(item => {
                const plantillaAleatoria = plantillas[Math.floor(Math.random() * plantillas.length)];
                const itemClave = buscarItemPorNombre(itemsData, item)

                return {
                    message: `${plantillaAleatoria.replace("___", item)} | ${itemClave.data.description} | ${itemClave.data.price} Doblones`,
                    key: itemClave.id,
                    action: 'add'
                }
            });
        },
    },
    npc: {
        bye: [
            { message: "irse", key: "bye" },
            { message: "marcharse del lugar", key: "bye" },
            { message: "abandonar el edificio", key: "bye" },
            { message: "salir a la ciudad", key: "bye" }
        ],

        items: (items) => {
            if (!items) return [];

            const plantillas = [
                "Vender: ___"
            ];


            return items.map(item => {
                const plantillaAleatoria = plantillas[Math.floor(Math.random() * plantillas.length)];
                const itemClave = buscarItemPorNombre(itemsData, item)

                return {
                    message: `${plantillaAleatoria.replace("___", item)} ${itemClave.data.price} Doblones`,
                    key: itemClave.id,
                    action: 'remove'
                }
            });
        },
    }
};