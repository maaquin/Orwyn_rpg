export class CombatManager {
    constructor({ player, monster, equipment, onUpdate }) {
        this.player = { ...player, effects: [] };
        this.monster = { ...monster, effects: [] };
        this.equipment = equipment;
        this.turn = "player";
        this.onUpdate = onUpdate;
    }

    applyStatusEffects(actor) {
        for (const effect of actor.effects) {
            if (effect.type === "gradual_damage") {
                actor.hp -= effect.value;
                effect.duration--;
            }

            if (effect.type === "buff") {
                // Effecto temporal
                actor.stats[effect.stat] += effect.value;
                effect.duration--;
            }
        }

        // Eliminar buffs expirados
        actor.effects = actor.effects.filter(effect => {
            if (effect.duration <= 0 && effect.type === "buff") {
                actor.stats[effect.stat] -= effect.value;
            }
            return effect.duration > 0;
        });
    }


    performAttack({ item, type }) {
        const actor = this.getCurrentActor();
        const target = this.getTargetActor();

        if (item) {
            this.applyItemEffects(actor, target, item);
        }

        this.applyStatusEffects(actor);
        this.applyStatusEffects(target);

        this.onUpdate({ player: this.player, monster: this.monster });
        this.switchTurn();
    }


    performTurn({ actor, target, item, type }) {
        if (item) {
            this.applyItemEffects(actor, target, item);
        }

        this.applyStatusEffects(actor);
        this.applyStatusEffects(target);

        this.onUpdate({ player: this.player, monster: this.monster });
    }

    applyItemEffects(actor, target, item) {
        for (const effect of item.effect || []) {
            const { stat, value } = effect;

            switch (stat) {
                case "damage":
                case "magic_damage": {
                    const atkStat = stat === "damage" ? "attack" : "magic_attack";
                    const defStat = stat === "damage" ? "defense" : "magic_defense";

                    const rawDmg = actor.stats[atkStat] + value - target.stats[defStat];
                    const dmg = Math.max(0, rawDmg);
                    target.hp -= dmg;
                    break;
                }

                case "hp": {
                    actor.hp += value;
                    break;
                }

                case "gradual_damage": {
                    target.effects.push({
                        type: "gradual_damage",
                        value,
                        duration: 3, // turnos
                    });
                    break;
                }

                case "magic_attack":
                case "attack":
                case "defense":
                case "magic_defense":
                case "accuracy": {
                    // Buff/debuff temporal
                    actor.effects.push({
                        type: "buff",
                        stat,
                        value,
                        duration: 3,
                    });
                    break;
                }

                default:
                    console.warn("Efecto no reconocido:", stat);
                    break;
            }
        }
    }


    enemyAI() {
        // lógica básica, la podés hacer más compleja después
        const useMagic = Math.random() > 0.5;
        const type = useMagic ? "magic" : "attack";

        this.performAttack({ type });
    }
}