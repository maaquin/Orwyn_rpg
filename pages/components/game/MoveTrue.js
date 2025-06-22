const specialLocations = new Set([
    "1,4", "2,4", "5,4", "6,4",
    "6,3", "7,3", "7,8", "8,8",
    "8,9", "9,6", "9,7", "10,7"
]);

const updateLocation = async (dataGame, deltaX, deltaY) => {
    const location = [...dataGame.location];
    location[0] += deltaX;
    location[1] += deltaY;

    await fetch(`/api/player/${dataGame._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location })
    });

    const locationKey = `${location[0]},${location[1]}`;
    if (specialLocations.has(locationKey)) {
        await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "city"
                }
            })
        });
    }
};

const movimientos = {
    north: (dataGame) => updateLocation(dataGame, 0, -1),
    south: (dataGame) => updateLocation(dataGame, 0, 1),
    east: (dataGame) => updateLocation(dataGame, 1, 0),
    west: (dataGame) => updateLocation(dataGame, -1, 0),
    interact: () => console.log("Interactúas con el entorno.")
};

const combate = {
    quick: () => console.log("Realizas un ataque rápido."),
    strong: () => console.log("Lanzas un ataque fuerte."),
    defense: () => console.log("Te pones en guardia."),
    run: () => console.log("Intentas huir del combate."),
};

const ciudad = {
    walk: async (dataGame) => {
        const [x, y] = dataGame.location;
        let nuevaUbicacion;

        switch (`${x},${y}`) {
            case "1,4": // Oeste de Drakmir
                nuevaUbicacion = [2, 4];
                break;
            case "2,4": // Este de Drakmir
                nuevaUbicacion = [1, 4];
                break;
            case "5,4": // Oeste de Valdoren
                nuevaUbicacion = [6, 4];
                break;
            case "6,4": // Este de Valdoren
                nuevaUbicacion = [5, 4];
                break;
            case "6,3": // Oeste de Myrrwood
                nuevaUbicacion = [7, 3];
                break;
            case "7,3": // Este de Myrrwood
                nuevaUbicacion = [6, 3];
                break;
            case "7,8": //Silvareth profundo
                nuevaUbicacion = [8, 8];
                break;
            case "8,8": // Centro de Silvareth
                nuevaUbicacion = [8, 9];
                break;
            case "8,9": // Sur de Silvareth
                nuevaUbicacion = [7, 8];
                break;
            case "9,6": // Norte de Nymbria
                nuevaUbicacion = [9, 7];
                break;
            case "9,7": // Centro de Nymbria
                nuevaUbicacion = [10, 7];
                break;
            case "10,7": // Este de Nymbria
                nuevaUbicacion = [9, 6];
                break;
            default:
                console.log("No podés desplazarte desde esta ubicación.");
                return;
        }

        await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: nuevaUbicacion })
        });
    },

    out: async (dataGame) => {
        const [x, y] = dataGame.location;
        let nuevaUbicacion;

        switch (`${x},${y}`) {
            case "1,4": // Drakmir oeste
                nuevaUbicacion = [1, 5];
                break;
            case "2,4": // Drakmir este
                nuevaUbicacion = [3, 4];
                break;
            case "5,4": // Valdoren oeste
                nuevaUbicacion = [4, 4];
                break;
            case "6,4": // Valdoren este
                nuevaUbicacion = [6, 5];
                break;
            case "6,3": // Myrrwood oeste
                nuevaUbicacion = [6, 2];
                break;
            case "7,3": // Myrrwood este
                nuevaUbicacion = [7, 4];
                break;
            case "7,8": // Sylvareth profundo
                nuevaUbicacion = [6, 8];
                break;
            case "8,8": // Sylvareth centro
                nuevaUbicacion = [9, 8];
                break;
            case "8,9": // Sylvareth sur
                nuevaUbicacion = [7, 9];
                break;
            case "9,6": // Nymbria norte
                nuevaUbicacion = [8, 6];
                break;
            case "9,7": // Nymbria centro
                nuevaUbicacion = [9, 8];
                break;
            case "10,7": // Nymbria este
                nuevaUbicacion = [10, 8];
                break;
            default:
                console.log("No podés salir desde esta ubicación.");
                return;
        }

        await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                location: nuevaUbicacion,
                playerData: {
                    status: "field",
                }
            })
        });
    }
};


async function fetchCityStructure(structureName, dataGame) {
    await fetch(`/api/player/${dataGame._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            playerData: {
                status: "city_structure",
                structure: structureName
            }
        })
    });
}

const estructuras = {

    abandoned_mine: () => console.log("Estructura: Mina Abandonada"),
    temple_fire: () => console.log("Estructura: Abismo Ardak"),
    cobblestone_bridge: () => console.log("Estructura: Puente de Piedra"),
    wooden_bridge: () => console.log("Estructura: Puente de Madera"),
    temple_wooden: () => console.log("Estructura: Santuario de Madera"),
    monolith: () => console.log("Estructura: Monolito"),
    temple_desert: () => console.log("Estructura: Templo del Desierto"),
    island: () => console.log("Estructura: Isla Viviente"),


    restaurant: async (dataGame) => await fetchCityStructure("restaurant", dataGame),
    store: async (dataGame) => await fetchCityStructure("store", dataGame),
    weapon_store: async (dataGame) => await fetchCityStructure("weapon_store", dataGame),
    magic_store: async (dataGame) => await fetchCityStructure("magic_store", dataGame),
    healing_center: async (dataGame) => await fetchCityStructure("healing_center", dataGame),
    community_center: async (dataGame) => await fetchCityStructure("community_center", dataGame),
    tavern: async (dataGame) => await fetchCityStructure("tavern", dataGame),
    inn: async (dataGame) => await fetchCityStructure("inn", dataGame),
    market: async (dataGame) => await fetchCityStructure("market", dataGame),
    palace: async (dataGame) => await fetchCityStructure("palace", dataGame),
    castle: async (dataGame) => await fetchCityStructure("castle", dataGame),
    temple: async (dataGame) => await fetchCityStructure("temple", dataGame),
    plaza: async (dataGame) => await fetchCityStructure("plaza", dataGame),
    barracks: async (dataGame) => await fetchCityStructure("barracks", dataGame),
    windmill: async (dataGame) => await fetchCityStructure("windmill", dataGame),
    sanctuary: async (dataGame) => await fetchCityStructure("sanctuary", dataGame),
    port: async (dataGame) => await fetchCityStructure("port", dataGame),
    farmland: async (dataGame) => await fetchCityStructure("farmland", dataGame),
    fisher_barracks: async (dataGame) => await fetchCityStructure("fisher_barracks", dataGame),
    magic_school: async (dataGame) => await fetchCityStructure("magic_school", dataGame),
    residential_area: async (dataGame) => await fetchCityStructure("residential_area", dataGame),
    archive: async (dataGame) => await fetchCityStructure("archive", dataGame),

    out_structure: async (dataGame) => {
        await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "city",
                    structure: ''
                }
            })
        });
    },

    npc: async (dataGame) => {
        await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "npc"
                }
            })
        });
    }
};

const interaccion = {
    see: () => console.log("Observás los alrededores."),
    talk: () => console.log("Iniciás una conversación."),
    bye: async (dataGame) => {
        await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "city"
                }
            })
        });
    }
};

const handlers = {
    ...movimientos,
    ...combate,
    ...ciudad,
    ...estructuras,
    ...interaccion,
};

export async function responseMove({ key, dataGame }) {
    console.log(key)
    const handler = handlers[key];

    if (handler) {
        try {
            await handler(dataGame);
        } catch (error) {
            console.error("Ocurrió un error durante la acción:", error);
        }
    } else {
        console.log("Acción desconocida.");
    }
}