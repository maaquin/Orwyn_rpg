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
            { message: "salir de la estructura", key: "out_structure" },
            { message: "abandonar el edificio", key: "out_structure" },
            { message: "dejar la construcción", key: "out_structure" },
            { message: "retirarse del lugar", key: "out_structure" }
        ],

        see: [
            { message: "observar el entorno", key: "see" },
            { message: "mirar alrededor", key: "see" },
            { message: "examinar el lugar", key: "see" },
            { message: "detallar lo que te rodea", key: "see" }
        ],

        principal: (npcs) => {
            console.log('npcs: ',npcs)
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

        talk: [
            { message: "hablar con alguien", key: "talk" },
            { message: "interactuar con alguien", key: "talk" },
            { message: "conversar con un alguien", key: "talk" }
        ]
    },
    npc: {
        talk: [
            { message: "preguntar por rumores", key: "ask" },
            { message: "indagar por chismes", key: "ask" },
            { message: "averiguar noticias", key: "ask" },
            { message: "curiosear información", key: "ask" }
        ],

        bye: [
            { message: "irse", key: "bye" },
            { message: "marcharse del lugar", key: "bye" },
            { message: "abandonar el edificio", key: "bye" },
            { message: "salir a la ciudad", key: "bye" }
        ]
    }
};