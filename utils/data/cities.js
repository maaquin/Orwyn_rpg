export function getValdoren() {
    return {
        name: "Valdoren",
        type: "Capital del Reino",
        coordinates: ["5,4", "6,4"],
        population: {
            majority: ["Humanos"],
            minorities: ["Todas las razas"]
        },
        layout: {
            government: {
                type: "Monarquía con consejo de representantes",
                details: "El rey humano gobierna desde el castillo. Hay un representante por cada especie, todos elegidos en Valdoren y parte de la nobleza."
            }
        },
        structures: {
            Castillo: [
                "Castillo de Valdoren",
                "Templo de la Luz Ancestral",
                "Plaza Central de los Héroes",
                "Cuartel de la Guardia Real"
            ],
            Ciudadela: [
                "Taberna El Dragón Dorado",
                "Posada La Media Luna",
                "Tienda de armas El Yunque de Brann",
                "Tienda de objetos mágicos El Reflejo de Arcana",
                "Tienda general El Bazar del Viajero"
            ]
        },
        npcs: {
            npc1: { name: "Thalric de Marwen", race: "Humano", profession: "Tabernero de El Dragón Dorado", key:"tavern" },
            npc2: { name: "Elira Sombraluz", race: "Elfa", profession: "Posadera en La Media Luna", key:"inn" },
            npc3: { name: "Brann Martillero", race: "Dwarf", profession: "Herrero en El Yunque de Brann", key:"weapon_store" },
            npc4: { name: "Yareen Lunargema", race: "Warewolf", profession: "Encargada de El Reflejo de Arcana", key:"magic_store" },
            npc5: { name: "Hobbin el Práctico", race: "Sprite", profession: "Dueño de El Bazar del Viajero", key:"store" },
            npc6: { name: "Sir Cedrick Halbrant", race: "Humano", profession: "Comandante del Cuartel de la Guardia Real", key:"barracks" },
            npc7: { name: "Hermana Lyseth", race: "Humana", profession: "Sacerdotisa del Templo de la Luz Ancestral", key:"temple" },
            npc8: { name: "Kaelran Miraluz", race: "Elfo", profession: "Orador en la Plaza Central de los Héroes", key:"plaza" },
            npc9: { name: "Rey Aldemar IV", race: "Humano", profession: "Monarca en el Castillo de Valdoren", key:"castle" }
        },
        features: [
            "Centro político, comercial y cultural",
            "Comercio vibrante con productos de todo el reino",
            "Ciudadela: vida común, gran diversidad racial",
            "Castillo: nobleza y líderes raciales"
        ]
    };
}

export function getDrakmir() {
    return {
        name: "Drakmir",
        type: "Ciudadela fortificada",
        coordinates: ["1,4", "2,4"],
        population: {
            majority: ["Humanos", "Dwarfs"],
            minorities: ["Visitantes y comerciantes de paso"]
        },
        layout: {
            government: {
                type: "Consejo",
                details: "No hay un líder fijo. El consejo toma decisiones por consenso entre las familias más influyentes."
            }
        },
        structures: {
            Comercial: [
                "Taberna La Arena y el Acero",
                "Tienda general Ojos del Desierto",
                "Posada La Sombra del Sol",
                "Mercado de Especias"
            ],
            Capitolio: [
                "Palacio de Arena Rojiza",
                "Consejo de las Dunas"
            ]
        },
        npcs: {
            npc1: { name: "Erduin Silhaj", race: "Dwarf", profession: "Cantinero en La Arena y el Acero", key:"tavern" },
            npc2: { name: "Karessa Vientoseco", race: "Humana", profession: "Encargada de Ojos del Desierto", key:"store" },
            npc3: { name: "Omarz el Silente", race: "Humano", profession: "Posadero en La Sombra del Sol", key:"inn" },
            npc4: { name: "Goran Rojacobre", race: "Dwarf", profession: "Especiero del Mercado de Especias", key:"market" },
            npc5: { name: "Selma de las Dunas", race: "Humana", profession: "Regente del Consejo de las Dunas", key:"palace" },
            npc6: { name: "Tymbar Marpiedra", race: "Dwarf", profession: "Custodio del Palacio de Arena Rojiza", key:"palace" }
        },
        features: [
            "Inspirada en la ciudad Gerudo de Ocarina of Time",
            "Cercana a la mina abandonada de Miokonos",
            "Ambiente árido y defensivo",
            "Antiguo centro minero, hoy más artesanal y defensivo"
        ]
    };
}

export function getMyrrwood() {
    return {
        name: "Myrrwood",
        type: "Comuna oculta",
        coordinates: ["6,2", "6,3", "7,3"],
        population: {
            majority: ["Warewolfs", "Sprites"],
            minorities: ["Elfos disidentes", "Algunos humanos"]
        },
        layout: {
            government: {
                type: "Comunal",
                details: "Decisiones colectivas entre las especies mágicas. Armonía natural."
            }
        },
        structures: {
            Comuna: [
                "Tienda de hierbas El Brote del Bosque",
                "Tienda de objetos rúnicos Hojas del Recuerdo",
                "Restaurante La Sopa de Hongos",
                "Centro de Sanación de los Espíritus",
                "Casa Comunal del Bosque"
            ]
        },
        npcs: {
            npc1: { name: "Eilindra Broteverde", race: "Warewolf", profession: "Herbolaria en El Brote del Bosque", key:"store" },
            npc2: { name: "Nalen Arcoluz", race: "Elfo", profession: "Tallador de runas en Hojas del Recuerdo", key:"magic_store" },
            npc3: { name: "Toren Zarzal", race: "Warewolf", profession: "Chef de La Sopa de Hongos", key:"restaurant" },
            npc4: { name: "Liriandel", race: "Sprite", profession: "Sanadora en el Centro de los Espíritus", key:"healing_center" },
            npc5: { name: "Veyda Brisalenta", race: "Sprite", profession: "Guardiana de la Casa Comunal del Bosque", key:"community_center" },
            npc6: { name: "Therandel Musgoluz", race: "Warewolf", profession: "Sanador Anciano Maestro en Myrrwood", key:"store" }
        },
        features: [
            "Oculta en el denso bosque de Fungarlith",
            "Casas seta y puentes vivos",
            "Difícil acceso para humanos",
            "Fuerte bioluminiscencia nocturna",
            "Cultura libre, mágica y descentralizada"
        ]
    };
}

export function getNymbria() {
    return {
        name: "Nymbria",
        type: "Puerto del sur",
        coordinates: ["8,6", "9,6", "9,7"],
        population: {
            majority: ["Seafolks", "Humanos"],
            minorities: ["Dwarfs retirados", "Warewolfs exiliados"]
        },
        layout: {
            government: {
                type: "Gobernador elegido por el pueblo",
                details: "El gobernador es un seafolk. El pueblo elige uno nuevo cada vez que el anterior envejece."
            }
        },
        structures: {
            Portuaria: [
                "Puerto de Nymbria",
                "Sector de Cultivos",
                "Barracas de los Pescadores"
            ],
            Comercial: [
                "Posada Brisa del Mar",
                "Taberna El Kraken Azul",
                "Tienda de armas Espadas del Acantilado",
                "Santuario de las Mareas",
                "Gran Plaza Central",
                "Molino de la Plaza"
            ]
        },
        npcs: {
            npc1: { name: "Captain Narei", race: "Seafolk", profession: "Gobernadora y líder portuaria", key:"port" },
            npc2: { name: "Mirko Escamaquebrada", race: "Seafolk", profession: "Pescador jefe en las Barracas", key:"port" },
            npc3: { name: "Jorra Algaazul", race: "Seafolk", profession: "Cultivadora en el Sector de Cultivos", key:"farmland" },
            npc4: { name: "Varek Mareaoscura", race: "Humano", profession: "Tabernero de El Kraken Azul", key:"tavern" },
            npc5: { name: "Lenna Brisaviva", race: "Humana", profession: "Posadera en Brisa del Mar", key:"inn" },
            npc6: { name: "Garran Rocafilo", race: "Dwarf", profession: "Armero en Espadas del Acantilado", key:"weapon_store" },
            npc7: { name: "Tarel Ondaluz", race: "Seafolk", profession: "Guardiana del Santuario de las Mareas", key:"sanctuary" },
            npc8: { name: "Jonkas el Curioso", race: "Warewolf", profession: "Vendedor ambulante en la Gran Plaza Central", key:"plaza" },
            npc9: { name: "Ebron Molinoalto", race: "Humano", profession: "Molenero del Molino de la Plaza", key:"windmill" },
            npc10: { name: "Maelor del Abismo Tranquilo", race: "Seafolk", profession: "Sabio del Santuario de las Mareas", key:"sanctuary" },
            // npc11: { name: "Aerthyn la Que Respira", race: "Isla Viviente", profession: "Guardián ancestral del conocimiento del mar", key:"" }
        },
        features: [
            "Importante centro comercial marítimo",
            "Segundo mayor mercado del reino después de Valdoren",
            "Tradición pesquera y artesanal",
            "Cercana a una isla viviente recientemente emergida",
            "Comunidad unida y democrática"
        ]
    };
}

export function getSylvareth() {
    return {
        name: "Sylvareth",
        type: "Ciudad élfica oculta",
        coordinates: ["7,8", "8,8", "7,9", "8,9"],
        population: {
            majority: ["Elfos"],
            minorities: ["Sprites", "Algunos humanos"]
        },
        layout: {
            government: {
                type: "Monarquía élfica",
                details: "Realeza tradicional y técnicas mágicas de ocultamiento. Reservados con otras razas."
            }
        },
        structures: {
            Ciudadela: [
                "Escuela de Magia Sylvana",
                "Casas residenciales élficas",
                "Plaza de los Cantos Antiguos",
                "Tienda de magia y hechicería Sir Lancelot"
            ],
            Acrópolis: [
                "Palacio Real",
                "Templo Lunar de Éleath",
                "Archivo de Runas y Hechizos"
            ]
        },
        npcs: {
            npc1: { name: "Aelirë Thandoriel", race: "Elfa", profession: "Sacerdotisa del Templo de Éleath", key:"temple" },
            npc2: { name: "Thirion Lunargenta", race: "Elfo", profession: "Archivista del Archivo de Runas y Hechizos", key:"archive" },
            npc3: { name: "Reina Selanwe", race: "Elfa", profession: "Monarca del Palacio Real", key:"palace" },
            npc4: { name: "Sir Lancelot", race: "Humano", profession: "Dueño de la Tienda de Magia y Hechicería", key:"magic_store" },
            npc5: { name: "Vanyra Cantoluz", race: "Elfa", profession: "Maestra de la Escuela de Magia Sylvana", key:"magic_school" },
            npc6: { name: "Nymis de la Niebla", race: "Sprite", profession: "Místico en la Plaza de los Cantos Antiguos", key:"plaza" }
        },
        features: [
            "Inspirada en los elfos del Señor de los Anillos y los Minish de Zelda",
            "Combinación de elegancia y ocultamiento",
            "Protegida por magia élfica, no por el entorno",
            "Cercana al Monolito de Sylvareth, monumento con un idioma élfico antiguo aún sin descifrar",
            "Altamente custodiada, difícil acceso"
        ]
    };
}