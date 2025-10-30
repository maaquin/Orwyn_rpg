function calcularDaño(atacante, defensor, tipo = 'fisico') {
    // Daño base según tipo
    let ataque = tipo === 'magico' ? atacante.magic_attack : atacante.attack;
    let defensa = tipo === 'magico' ? defensor.magic_defense : defensor.defense;

    // Variación aleatoria de ±20%
    const variacion = 0.8 + Math.random() * 0.4;

    // Fórmula de daño
    const daño = Math.max(1, Math.floor((ataque - defensa / 2) * variacion));

    return daño;
}

function atacar(atacante, defensor) {
    // Probabilidad de acertar basada en precisión + velocidad
    const probAcierto = (atacante.accuracy * 1.5 + atacante.speed) / 200; // escala 0–1 aprox
    const acierta = Math.random() < probAcierto;

    if (!acierta) return;

    // 25% de probabilidad de usar magia si tiene ataque mágico alto
    const usaMagia = atacante.magic_attack > atacante.attack && Math.random() < 0.25;
    const tipo = usaMagia ? 'magico' : 'fisico';

    const daño = calcularDaño(atacante, defensor, tipo);
    defensor.health -= daño;

    if (defensor.health <= 0) {
        defensor.health = 0;
    }
}

export function combate({ player, monster, setDataGame }) {

    let turnoJugador = player.speed >= monster.speed;

    while (player.health > 0 && monster.health > 0) {
        if (turnoJugador) atacar(player, monster);
        else atacar(monster, player);

        turnoJugador = !turnoJugador;
    }

    if (player.health > 0) {
        const updatedData = {
            ...dataGame,
            playerData: {
                ...dataGame.playerData,
                hp: 8
            }
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData);
    } else {
        const updatedData = {
            ...dataGame,
            playerData: {
                ...dataGame.playerData,
                money: dataGame.playerData.money + 40
            }
        };
        localStorage.setItem('player', JSON.stringify(updatedData));
        setDataGame(updatedData);
    }

    return player.health > 0 ? `El jugador ganó el combate a un ${monster.name}` : `El monstruo ${monster.name} ganó el combate`;
}