export const GeneratedData = (playerData) => {

    const profesionesPorCiudad = {
        Valdoren: [
            "Consejero",
            "Guardia",
            "Comerciante",
            "Hechicero",
            "Noble",
            "Tabernero"
        ],
        Drakmir: [
            "Herrero",
            "Consejero",
            "Guardia",
            "Comerciante",
            "Tabernero",
            "Explorador"
        ],
        Myrrwood: [
            "Sanador",
            "Recolector",
            "Artesano",
            "Narrador",
            "Cocinero",
            "Guardabosques"
        ],
        Nymbria: [
            "Pescador",
            "Gobernador",
            "Carpintero",
            "Sacerdote",
            "Comerciante",
            "Tabernero"
        ],
        Sylvareth: [
            "Hechicero",
            "Erudito",
            "Guardia",
            "Maestro de magia",
            "Trovador",
            "Custodio del Monolito"
        ]
    };

    function getCiudadPorRaza(raza) {
        const prob = Math.random();

        switch (raza) {
            case 'humano':
                if (prob < 0.2) return 'Silvareth';
                if (prob < 0.4) return 'Drakmir';
                if (prob < 0.6) return 'Myrrwood';
                if (prob < 0.8) return 'Nymbria';
                return 'Valdoren';

            case 'elfo':
                if (prob < 0.6) return 'Silvareth';
                if (prob < 0.8) return 'Valdoren';
                return 'Myrrwood';

            case 'dwarf':
                if (prob < 0.6) return 'Drakmir';
                if (prob < 0.8) return 'Valdoren';
                return 'Nymbria';

            case 'warewolf':
                if (prob < 0.6) return 'Myrrwood';
                if (prob < 0.8) return 'Valdoren';
                return 'Nymbria';

            case 'sprite':
                if (prob < 0.6) return 'Myrrwood';
                if (prob < 0.8) return 'Valdoren';
                return 'Silvareth';

            case 'seafolk':
                if (prob < 0.7) return 'Nymbria';
                return 'Valdoren';

            default:
                return 'Valdoren';
        }
    }

    const statsByRace = {
        human: { attack: 10, magic_attack: 10, defense: 10, magic_defense: 10, speed: 10, accuracy: 10, health: 100 },
        elf: { attack: 8, magic_attack: 14, defense: 8, magic_defense: 12, speed: 12, accuracy: 14, health: 90 },
        seafolk: { attack: 9, magic_attack: 13, defense: 9, magic_defense: 11, speed: 11, accuracy: 12, health: 95 },
        warewolf: { attack: 11, magic_attack: 6, defense: 8, magic_defense: 6, speed: 14, accuracy: 9, health: 90 },
        dwarf: { attack: 13, magic_attack: 6, defense: 14, magic_defense: 8, speed: 7, accuracy: 7, health: 120 },
        sprite: { attack: 7, magic_attack: 14, defense: 6, magic_defense: 12, speed: 13, accuracy: 10, health: 80 },
    };

    const statsByClass = {
        hermit: { attack: 10, magic_attack: 10, defense: 10, magic_defense: 10, speed: 10, accuracy: 10, health: 100 },
        wizard: { attack: 6, magic_attack: 15, defense: 6, magic_defense: 14, speed: 9, accuracy: 12, health: 85 },
        hunter: { attack: 14, magic_attack: 9, defense: 7, magic_defense: 6, speed: 14, accuracy: 14, health: 90 },
        squire: { attack: 9, magic_attack: 6, defense: 15, magic_defense: 14, speed: 6, accuracy: 7, health: 115 },
    };

    // Mapas de ciudades según raza
    const ciudad = getCiudadPorRaza(playerData.race) || 'Valdoren';

    // Naturaleza aleatoria
    const naturalezas = ['courage', 'power', 'wisdom'];
    const nature = naturalezas[Math.floor(Math.random() * naturalezas.length)];

    // Padres generados aleatoriamente (puedes hacer esto más profundo si quieres)
    const nombresPadres = ['Aelric', 'Dorn', 'Kael', 'Thorne', 'Cairos', 'Elandor', 'Malrik', 'Taren', 'Varek', 'Rowan'];
    const nombresMadres = ['Lyra', 'Mira', 'Seris', 'Velia', 'Elowen', 'Nyra', 'Sylis', 'Thalira', 'Ysolde', 'Amarien'];

    const profesiones = profesionesPorCiudad[ciudad];
    const shuffled = [...profesiones].sort(() => 0.5 - Math.random());
    const profesionPadre = shuffled[0];
    const profesionMadre = shuffled[1] || shuffled[0];

    const father = {
        name: nombresPadres[Math.floor(Math.random() * nombresPadres.length)],
        profession: profesionPadre
    };

    const mother = {
        name: nombresMadres[Math.floor(Math.random() * nombresMadres.length)],
        profession: profesionMadre
    };

    // Economía o dinero inicial
    const money = (() => {
        const p = Math.random();
        if (p < 0.05) return 114;
        return Math.floor(p * 30 + 15);
    })();

    const status = (() => {
        return 'city';
    })();

    // Stats del personaje
    const stats = (() => {
        const raceStats = statsByRace[playerData.race];
        const classStats = statsByClass[playerData.class];

        if (!raceStats || !classStats) {
            throw new Error("Invalid race or class name");
        }

        const combinedStats = {};
        for (let stat in raceStats) {
            combinedStats[stat] = Math.round((raceStats[stat] + classStats[stat]) / 2);
        }

        return combinedStats;
    })();

    return {
        hometown: ciudad,
        nature,
        parents: { father, mother },
        money,
        status,
        stats
    };
}