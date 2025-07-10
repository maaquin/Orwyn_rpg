import { itemsData } from "./items";

function buscarItemPorNombre(obj, name) {
    const entrada = Object.entries(obj).find(([clave, valor]) => valor.name === name);
    return entrada ? { id: entrada[0], data: entrada[1] } : null;
}

export const actions = {
    field: {
        north: [
            { message: "caminar al norte", key: "north", narrative: true },
            { message: "avanzar hacia el norte", key: "north", narrative: true },
            { message: "explorar hacia el norte", key: "north", narrative: true },
            { message: "andar en dirección norte", key: "north", narrative: true }
        ],

        south: [
            { message: "caminar al sur", key: "south", narrative: true },
            { message: "avanzar hacia el sur", key: "south", narrative: true },
            { message: "explorar hacia el sur", key: "south", narrative: true },
            { message: "andar en dirección sur", key: "south", narrative: true }
        ],

        east: [
            { message: "caminar al este", key: "east", narrative: true },
            { message: "avanzar hacia el este", key: "east", narrative: true },
            { message: "explorar hacia el este", key: "east", narrative: true },
            { message: "andar en dirección este", key: "east", narrative: true }
        ],

        west: [
            { message: "caminar al oeste", key: "west", narrative: true },
            { message: "avanzar hacia el oeste", key: "west", narrative: true },
            { message: "explorar hacia el oeste", key: "west", narrative: true },
            { message: "andar en dirección oeste", key: "west", narrative: true }
        ],

        event: (event) => {

            if (!event) return [];

            const optionsByKey = {
                trader: [
                    "Acercarte al comerciante",
                    "Hablarle al vendedor",
                    "Preguntar algo al vendedor",
                ],
                caravan: [
                    "Saludar a la caravana",
                    "Preguntar rutas a la caravana",
                    "Acercarte a la caravana",
                ],
                bonfire: [
                    "Sentarte con el aventurero",
                    "Hablarle al aventurero",
                    "Acercarte al aventurero",
                ],
                corpse: [
                    "Examinar el campamento",
                    "Revisar objetos del campamento",
                    "Buscar ítems en el campamento",
                ],
                ruin: [
                    "Entrar a explorar la ruina",
                    "Acercarte a la ruina",
                    "Inspeccionar la ruina",
                ],
                monster: [
                    "Atacar",
                    "Emboscar",
                ]
            };

            if (!event?.key || !optionsByKey[event.key]) return [];

            const messages = optionsByKey[event.key];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];

            return {
                message: randomMessage,
                key: event.key,
                action: event.action?.action || null,
                narrative: event.key === 'monster' ? false : true
            };

        },

        enterField: (estructuras) => {
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
                    key: `${estructura.key}`,
                    narrative: true
                }
            });
        },
    },
    combat: {
        attack: [
            { message: "ataque físico", key: "attack", narrative: false }
        ],

        magic_attack: [
            { message: "ataque mágico", key: "magic_attack", narrative: false }
        ],

        defense: [
            { message: "defender", key: "defense", narrative: false }
        ],

        consumable: [
            { message: "usar consumible", key: "consumable", narrative: false }
        ],

        run: [
            { message: "escapar", key: "run", narrative: false }
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
                    key: `${estructura.key}`,
                    narrative: true
                }
            });
        },

        walk: [
            { message: "caminar al otro sector de la ciudad", key: "walk", narrative: true },
            { message: "cambiar de zona de la ciudad", key: "walk", narrative: true },
            { message: "pasar al sector opuesto de la ciudad", key: "walk", narrative: true }
        ],

        out: [
            { message: "salir de la ciudad", key: "out", narrative: true },
            { message: "abandonar la ciudad", key: "out", narrative: true },
            { message: "irse de la ciudad", key: "out", narrative: true },
            { message: "caminar hacia las afueras", key: "out", narrative: true }
        ]
    },
    city_structure: {
        out: [
            { message: "salir a la ciudad", key: "out_structure", narrative: true },
            { message: "regresar a la ciudad", key: "out_structure", narrative: true },
            { message: "salir", key: "out_structure", narrative: true },
            { message: "dejar el lugar", key: "out_structure", narrative: true }
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
                    key: 'npc',
                    narrative: true
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
                let narrative;

                if (itemClave.data.portable) {
                    narrative = false;
                } else {
                    narrative = true;
                }

                return {
                    message: `${plantillaAleatoria.replace("___", item)} | ${itemClave.data.description} | ${itemClave.data.price} Doblones`,
                    key: itemClave.id,
                    action: 'add',
                    narrative
                }
            });
        },
    },
    npc_event: {
        items: (items) => {
            if (!items) return [];

            const plantillas = [
                "Comprar: ___"
            ];


            return items.map(item => {
                const plantillaAleatoria = plantillas[Math.floor(Math.random() * plantillas.length)];
                const itemClave = buscarItemPorNombre(itemsData, item)
                let narrative;

                if (itemClave.data.portable) {
                    narrative = false;
                } else {
                    narrative = true;
                }

                return {
                    message: `${plantillaAleatoria.replace("___", item)} | ${itemClave.data.description} | ${itemClave.data.price} Doblones`,
                    key: itemClave.id,
                    action: 'add',
                    narrative
                }
            });
        },
        goodbye: [
            { message: "seguir con tu camino", key: "goodbye", narrative: true },
            { message: "continuar caminando", key: "goodbye", narrative: true },
            { message: "despedirte del comerciante", key: "goodbye", narrative: true },
        ],
    },
    bonfire: {
        gooodbye: [
            { message: "seguir con tu camino", key: "goodbye", narrative: true },
            { message: "continuar caminando", key: "goodbye", narrative: true },
            { message: "despedirte del aventurero", key: "goodbye", narrative: true },
        ],
    },
    caravan: {
        gooodbye: [
            { message: "seguir con tu camino", key: "goodbye", narrative: true },
            { message: "continuar caminando", key: "goodbye", narrative: true },
            { message: "despedirte del aventurero", key: "goodbye", narrative: true },
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
                    message: `${plantillaAleatoria.replace("___", item)} | ${itemClave.data.price} Doblones`,
                    key: itemClave.id,
                    action: 'remove',
                    narrative: false
                }
            });
        },
    },
    npc: {
        bye: [
            { message: "irse", key: "bye", narrative: true },
            { message: "marcharse del lugar", key: "bye", narrative: true },
            { message: "abandonar el edificio", key: "bye", narrative: true },
            { message: "salir a la ciudad", key: "bye", narrative: true }
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
                    message: `${plantillaAleatoria.replace("___", item)} | ${itemClave.data.price} Doblones`,
                    key: itemClave.id,
                    action: 'remove',
                    narrative: false
                }
            });
        },
    }
};