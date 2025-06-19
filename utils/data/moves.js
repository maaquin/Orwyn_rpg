export const acciones = {
    terreno: {
        norte: ["caminar al norte", "avanzar hacia el norte", "explorar hacia el norte", "andar en dirección norte"],
        sur: ["caminar al sur", "avanzar hacia el sur", "explorar hacia el sur", "andar en dirección sur"],
        este: ["caminar al este", "avanzar hacia el este", "explorar hacia el este", "andar en dirección este"],
        oeste: ["caminar al oeste", "avanzar hacia el oeste", "explorar hacia el oeste", "andar en dirección oeste"],
        interactuar: ["interactuar con el entorno", "analizar el entorno", "examinar los alrededores", "mirar a tu alrededor"]
    },
    combate: {
        ataqueRapido: ["ataque rápido", "golpe veloz", "ataque relámpago", "asestar un golpe ligero"],
        ataqueCargado: ["ataque cargado", "golpe poderoso", "ataque fuerte", "descargar energía en un golpe"],
        defenderse: ["defenderse", "bloquear", "prepararse para recibir daño", "cubrirse"],
        huir: ["huir", "escapar", "salir corriendo", "retirarse"]
    },
    ciudad: {
        entrarEstructura: (estructuras) => {
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
                return plantillaAleatoria.replace("___", estructura);
            });
        },
        caminarCiudad: ["caminar al otro sector de la ciudad", "cambiar de zona de la ciudad", "pasar al sector opuesto de la ciudad"],
        salirCiudad: ["salir de la ciudad", "abandonar la ciudad", "irse de la ciudad", "caminar hacia las afueras"]
    },
    estructura: {
        salir: ["salir de la estructura", "abandonar el edificio", "dejar la construcción", "retirarse del lugar"],
        observar: ["observar el entorno", "mirar alrededor", "examinar el lugar", "detallar lo que te rodea"],
        hablarPrincipal: ["hablar con el NPC principal", "iniciar conversación con el personaje importante", "dirigirse al personaje principal"],
        hablarSecundario: ["hablar con un cliente o visitante", "interactuar con otro personaje", "conversar con un visitante"]
    },
    npc: {
        rumores: ["preguntar por rumores", "indagar por chismes", "averiguar noticias", "curiosear información"],
        irse: ["irse", "marcharse", "abandonar la conversación", "dar media vuelta"]
    }
};