export class BattleEngine {
    constructor(jugador, enemigo, sonido, feedback) {
        this.jugador = jugador;
        this.enemigo = enemigo;
        this.sonido = sonido;
        this.feedback = feedback;
        this.state = "PLAYER_SELECT";
        this.timer = 0;
        this.hitstopTimer = 0;
        this.tipo = "normal";
        this.message = "Selecciona un ataque";
}
startTurn(tipo) {
    if (this.state !== "PLAYER_SELECT") return;
        this.tipo = tipo;
        this.state = "PLAYER_ATTACK";
        this.message = "Turno del jugador";
        this.jugador.startAttackAnimation();
        this.sonido.playAttack();
}
impacto(personaje, tipo) {
    if (tipo === "electrico") {
         personaje.takeDamage(20);
        this.feedback.impact(18, "255, 220, 50");
        this.sonido.playCritical();
        this.message = "Super eficaz";
} else if (tipo === "fuego") {
        personaje.takeDamage(5);
        this.feedback.impact(4, "150, 150, 150", 0.20);
        this.sonido.playHit();
        this.message = "Poco eficaz";
} else {
 personaje.takeDamage(10);
    this.feedback.impact();
    this.sonido.playHit();
    this.message = "Golpe normal";
}
this.hitstopTimer = 0.065;
}
update(dt) {
    this.feedback.update(dt);
if (this.hitstopTimer > 0) {
    this.hitstopTimer = Math.max(0, this.hitstopTimer - dt);
return;
}
    this.jugador.update(dt);
    this.enemigo.update(dt);
if (this.state === "PLAYER_ATTACK") {
if (this.jugador.attackProgress >= 0.5) {
    this.impacto(this.enemigo, this.tipo);
    this.state = "IMPACT_PAUSE";
    this.timer = 0.7;
}
} else if (this.state === "IMPACT_PAUSE") {
    this.timer -= dt;
if (this.timer <= 0) {
if (this.enemigo.currentHp <= 0) {
    this.state = "CHECK";
    this.timer = 0;
} else {
    this.state = "ENEMY_ATTACK";
    this.message = "Turno del enemigo";
    this.enemigo.startAttackAnimation();
    this.sonido.playAttack();
    }
}
} else if (this.state === "ENEMY_ATTACK") {
    if (this.enemigo.attackProgress >= 0.5) {
        this.impacto(this.jugador, "normal");
        this.state = "CHECK";
        this.timer = 0.7;
}
} else if (this.state === "CHECK") {
        this.timer -= dt;
if (this.timer <= 0) {
if (this.enemigo.currentHp <= 0) {
    this.message = "Victoria";
    this.state = "FINISHED";
} else if (this.jugador.currentHp <= 0) {
    this.message = "Derrota";
    this.state = "FINISHED";
} else {
    this.state = "PLAYER_SELECT";
    this.message = "Selecciona un ataque";
                }
            }
        }
    }
}
