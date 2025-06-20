export function responseMove (key) {
    switch (key) {
        case "north":
            console.log("Te mueves hacia el norte.");
            break;
        case "south":
            console.log("Te mueves hacia el sur.");
            break;
        case "east":
            console.log("Te mueves hacia el este.");
            break;
        case "west":
            console.log("Te mueves hacia el oeste.");
            break;
        case "interact":
            console.log("Interactúas con el entorno.");
            break;
        case "quick":
            console.log("Realizas un ataque rápido.");
            break;
        case "strong":
            console.log("Lanzas un ataque fuerte.");
            break;
        case "defense":
            console.log("Te pones en guardia.");
            break;
        case "run":
            console.log("Intentas huir del combate.");
            break;
        case "walk":
            console.log("Te desplazas por la ciudad.");
            break;
        case "out":
            console.log("Sales del lugar en el que estás.");
            break;
        case "see":
            console.log("Observas los alrededores.");
            break;
        case "talk":
            console.log("Inicias una conversación.");
            break;
        case "bye":
            console.log("Te despides y te retiras.");
            break;
        default:
            console.log("Acción desconocida.");
    }
}