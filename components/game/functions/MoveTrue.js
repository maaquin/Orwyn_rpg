import { itemsData } from "@/utils/data";

const specialLocations = new Set([
    "1,4", "2,4", "5,4", "6,4",
    "6,3", "7,3", "7,8", "8,8",
    "8,9", "9,6", "9,7", "10,7"
]);

const updateLocation = async (dataGame, setDataGame, deltaX, deltaY) => {
    const updatedData = {
        ...dataGame,
        location: [
            dataGame.location[0] + deltaX,
            dataGame.location[1] + deltaY
        ]
    };

    /* await fetch(`/api/player/${dataGame._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location })
    }); */

    localStorage.setItem('player', JSON.stringify(updatedData));
    setDataGame(updatedData);

    const locationKey = `${dataGame.location[0]},${dataGame.location[1]}`;
    if (specialLocations.has(locationKey)) {
        /*await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "city"
                }
            })
        });*/

        const updatedData = {
            ...dataGame,
            playerData: {
                ...dataGame.playerData,
                status: 'city'
            }
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData);
    }
};

const movimientos = {
    north: ({ dataGame, setDataGame }) => updateLocation(dataGame, setDataGame, 0, -1),
    south: ({ dataGame, setDataGame }) => updateLocation(dataGame, setDataGame, 0, 1),
    east: ({ dataGame, setDataGame }) => updateLocation(dataGame, setDataGame, 1, 0),
    west: ({ dataGame, setDataGame }) => updateLocation(dataGame, setDataGame, -1, 0),
    interact: () => console.log("Interactúas con el entorno.")
};

const combate = {
    quick: () => console.log("Realizas un ataque rápido."),
    strong: () => console.log("Lanzas un ataque fuerte."),
    defense: () => console.log("Te pones en guardia."),
    run: () => console.log("Intentas huir del combate."),
};

const ciudad = {
    walk: async ({ dataGame, setDataGame }) => {
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
                console.error("No podés desplazarte desde esta ubicación.");
                return;
        }

        /* await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: nuevaUbicacion })
        }); */

        const updatedData = {
            ...dataGame,
            location: nuevaUbicacion
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData);
    },

    out: async ({ dataGame, setDataGame }) => {
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
                console.error("No podés salir desde esta ubicación.");
                return;
        }

        /*await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                location: nuevaUbicacion,
                playerData: {
                    status: "field",
                }
            })
        }); */

        const updatedData = {
            ...dataGame,
            location: nuevaUbicacion,
            playerData: {
                ...dataGame.playerData,
                status: "field",
            }
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData);

    }
};


async function fetchCityStructure(structureName, dataGame, setDataGame) {
    /*await fetch(`/api/player/${dataGame._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            playerData: {
                status: "city_structure",
                structure: structureName
            }
        })
    }); */

    const updatedData = {
        ...dataGame,
        playerData: {
            ...dataGame.playerData,
            status: 'city_structure',
            structure: structureName
        }
    };
    localStorage.setItem('player', JSON.stringify(updatedData));
    setDataGame(updatedData);
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


    restaurant: async ({ dataGame, setDataGame }) => await fetchCityStructure("restaurant", dataGame, setDataGame),
    store: async ({ dataGame, setDataGame }) => await fetchCityStructure("store", dataGame, setDataGame),
    weapon_store: async ({ dataGame, setDataGame }) => await fetchCityStructure("weapon_store", dataGame, setDataGame),
    magic_store: async ({ dataGame, setDataGame }) => await fetchCityStructure("magic_store", dataGame, setDataGame),
    healing_center: async ({ dataGame, setDataGame }) => await fetchCityStructure("healing_center", dataGame, setDataGame),
    community_center: async ({ dataGame, setDataGame }) => await fetchCityStructure("community_center", dataGame, setDataGame),
    tavern: async ({ dataGame, setDataGame }) => await fetchCityStructure("tavern", dataGame, setDataGame),
    inn: async ({ dataGame, setDataGame }) => await fetchCityStructure("inn", dataGame, setDataGame),
    market: async ({ dataGame, setDataGame }) => await fetchCityStructure("market", dataGame, setDataGame),
    palace: async ({ dataGame, setDataGame }) => await fetchCityStructure("palace", dataGame, setDataGame),
    castle: async ({ dataGame, setDataGame }) => await fetchCityStructure("castle", dataGame, setDataGame),
    temple: async ({ dataGame, setDataGame }) => await fetchCityStructure("temple", dataGame, setDataGame),
    plaza: async ({ dataGame, setDataGame }) => await fetchCityStructure("plaza", dataGame, setDataGame),
    barracks: async ({ dataGame, setDataGame }) => await fetchCityStructure("barracks", dataGame, setDataGame),
    windmill: async ({ dataGame, setDataGame }) => await fetchCityStructure("windmill", dataGame, setDataGame),
    sanctuary: async ({ dataGame, setDataGame }) => await fetchCityStructure("sanctuary", dataGame, setDataGame),
    port: async ({ dataGame, setDataGame }) => await fetchCityStructure("port", dataGame, setDataGame),
    farmland: async ({ dataGame, setDataGame }) => await fetchCityStructure("farmland", dataGame, setDataGame),
    fisher_barracks: async ({ dataGame, setDataGame }) => await fetchCityStructure("fisher_barracks", dataGame, setDataGame),
    magic_school: async ({ dataGame, setDataGame }) => await fetchCityStructure("magic_school", dataGame, setDataGame),
    residential_area: async ({ dataGame, setDataGame }) => await fetchCityStructure("residential_area", dataGame, setDataGame),
    archive: async ({ dataGame, setDataGame }) => await fetchCityStructure("archive", dataGame, setDataGame),

    out_structure: async ({ dataGame, setDataGame }) => {
        /*await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "city",
                    structure: ''
                }
            })
        }); */


        const updatedData = {
            ...dataGame,
            playerData: {
                ...dataGame.playerData,
                status: 'city',
                structure: ''
            }
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData);
    }
};

const interaccion = {
    see: () => console.log("Observás los alrededores."),
    talk: () => console.log("Iniciás una conversación."),
    bye: async ({ dataGame, setDataGame }) => {
        /*await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "city",
                    structure: ''
                }
            })
        }); */

        const updatedData = {
            ...dataGame,
            playerData: {
                ...dataGame.playerData,
                status: 'city',
                structure: ''
            }
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData);
    },

    npc: async ({ dataGame, setDataGame }) => {
        /* await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "npc"
                }
            })
        }); */


        const updatedData = {
            ...dataGame,
            playerData: {
                ...dataGame.playerData,
                status: 'npc',
            }
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData);
    },


    goodbye: async ({ dataGame, setDataGame }) => {
        /* await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "field"
                }
            })
        }); */


        const updatedData = {
            ...dataGame,
            playerData: {
                ...dataGame.playerData,
                status: 'field',
            }
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData);
    },

    trader: async ({ dataGame, setDataGame }) => {
        /* await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "npc_event"
                }
            })
        }); */


        const updatedData = {
            ...dataGame,
            playerData: {
                ...dataGame.playerData,
                status: 'npc_event',
            }
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData);
    },

    bonfire: async ({ dataGame, setDataGame }) => {
        /* await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "bonfire"
                }
            })
        }); */


        const updatedData = {
            ...dataGame,
            playerData: {
                ...dataGame.playerData,
                status: 'bonfire',
            }
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData);
    },

    caravan: async ({ dataGame, setDataGame }) => {
        /* await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "caravan"
                }
            })
        }); */

        const updatedData = {
            ...dataGame,
            playerData: {
                ...dataGame.playerData,
                status: 'caravan',
            }
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData);
    },

    monster: async ({ dataGame, setDataGame }) => {
        /*await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "combat"
                }
            })
        });

        const updatedData = {
            ...dataGame,
            playerData: {
                ...dataGame.playerData,
                status: 'combat',
            }
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData); */
    }
};

const combat = {
    run: async ({ dataGame, setDataGame }) => {
        localStorage.removeItem('monster');
        /*await fetch(`/api/player/${dataGame._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerData: {
                    status: "field"
                }
            })
        }); */

        const updatedData = {
            ...dataGame,
            playerData: {
                ...dataGame.playerData,
                status: 'field',
            }
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData);
    },

    left: () => { return 'left'; },

    right: () => { return 'right'; },

    consumable: () => { return 'consumable'; }
}


/* const updateInventory = async ({ dataGame, item, key, action, quantityChange = 1 }) => {
    const body = {
        action: item ? action : 'update-quantity',
        item: item
            ? {
                id: key,
                name: item.name,
                img: item.img,
                description: item.description,
                price: item.price,
                quantity: 1,
                effect: item.effect ?? [],
                type: item.type
            }
            : { id: key },
        ...(quantityChange && !item && { quantityChange })
    };

    await fetch(`/api/player/${dataGame._id}/inventory`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}; */

const updateInventory = ({ dataGame, setDataGame, item, key, action, quantityChange = 1 }) => {

    const storedPlayer = JSON.parse(localStorage.getItem('player')) || dataGame;
    let inventory = storedPlayer.inventory || [];

    if (action === 'add' && item) {
        const existingItem = inventory.find(i => i.id === key);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            inventory.push({
                id: key,
                name: item.name,
                img: item.img,
                description: item.description,
                price: item.price,
                quantity: 1,
                effect: item.effect ?? [],
                type: item.type
            });
        }
    }
    else if (action === 'update-quantity' && key) {
        const existingItem = inventory.find(i => i.id === key);

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantityChange;

            if (newQuantity <= 0) {
                inventory = inventory.filter(i => i.id !== key);
            } else {
                existingItem.quantity = newQuantity;
            }
        } else {
            console.warn(`Item con id ${key} no encontrado en el inventario.`);
        }
    }
    else {
        console.warn('Acción no reconocida o datos faltantes.');
        return;
    }

    const updatedPlayer = {
        ...storedPlayer,
        inventory
    };
    localStorage.setItem('player', JSON.stringify(updatedPlayer));
    setDataGame(updatedPlayer);


    return updatedPlayer;
};


const updatePlayerMoney = async (newMoney, dataGame, setDataGame) => {
    /*await fetch(`/api/player/${playerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            playerData: { money: newMoney }
        })
    }); */

    const updatedData = {
        ...dataGame,
        playerData: {
            ...dataGame.playerData,
            money: newMoney
        }
    };
    localStorage.setItem('player', JSON.stringify(updatedData));
    setDataGame(updatedData);
};


const canAddToInventory = (currentInventory, item, existingItem) => {
    return !(currentInventory.length >= 12 && (!item.stackable || !existingItem));
};

const handlerItem = async ({ item, dataGame, setDataGame, key, action }) => {
    if (!item.portable) return;

    const currentInventory = dataGame.inventory || [];
    const existingItem = currentInventory.find(invItem => invItem.id === key);

    if (!canAddToInventory(currentInventory, item, existingItem) && action === 'add') {
        return 'inventory_full';
    }

    if (dataGame.playerData.money < item.price && action === 'add') {
        return 'no_money';
    }

    const newMoney =
        action === 'add'
            ? dataGame.playerData.money - item.price
            : dataGame.playerData.money + item.price;

    await updateInventory({
        dataGame,
        setDataGame,
        item: existingItem ? null : item,
        key,
        action,
        quantityChange: action === 'add' ? 1 : -1
    });

    await updatePlayerMoney(newMoney, dataGame, setDataGame);
};

const handlerEvent = {
    corpse: async ({ dataGame, setDataGame, action }) => {
        if (!action) return;

        const currentInventory = dataGame.inventory || [];
        const existingItem = currentInventory.find(invItem => invItem.id === action.id);

        if (!canAddToInventory(currentInventory, action, existingItem)) {
            return 'inventory_full';
        }

        await Promise.all(action.map(reward => {
            return updateInventory({
                dataGame,
                setDataGame,
                item: existingItem ? null : reward,
                key: reward.id,
                action: existingItem ? 'update-quantity' : 'add',
                quantityChange: 1
            });
        }));

    },

    ruin: async ({ dataGame, setDataGame, action }) => {
        if (!action) return;

        const currentInventory = dataGame.inventory || [];
        const existingItem = currentInventory.find(invItem => invItem.id === action.id);

        if (!canAddToInventory(currentInventory, action, existingItem)) {
            return 'inventory_full';
        }

        await Promise.all(action.map(reward => {
            return updateInventory({
                dataGame,
                setDataGame,
                item: existingItem ? null : reward,
                key: reward.id,
                action: existingItem ? 'update-quantity' : 'add',
                quantityChange: 1
            });
        }));

    }
};

const handlers = {
    ...movimientos,
    ...combate,
    ...ciudad,
    ...estructuras,
    ...interaccion,
    ...combat
};

export async function responseMove({ key, dataGame, action, setDataGame }) {

    const handler = handlers[key];
    const item = itemsData[key];
    const event = handlerEvent[key];

    if (handler) {
        try {
            const result = await handler({ dataGame, setDataGame });

            if (result) return result;
        } catch (error) {
            console.error("Error:", error);
        }
    } else if (item) {
        try {
            const result = await handlerItem({ item, dataGame, setDataGame, key, action });

            if (result) return result;
        } catch (error) {
            console.error("Error:", error);
        }
    } else if (event) {
        try {
            const result = await event({ item, dataGame, setDataGame, key, action });

            if (result) return result;
        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        console.error("Acción desconocida.");
    }
}