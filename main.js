import { Character } from "./character/character.js";
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const jugador = new Character({
    name: "Jugador",
    maxHp: 100,
    baseX: 345,
    baseY: 365,
    width: 100,
    height: 150,
    spriteSrc: "sprites/jugador.png",
    isPlayer: true
});
const enemigo = new Character({
    name: "Enemigo",
    maxHp: 100,
    baseX: 495,
    baseY: 365,
    width: 100,
    height: 150,
    spriteSrc: "sprites/enemigo.png",
    isPlayer: false
});
let ultimoTiempo = 0;
let hitstopTimer = 0;
let golpeJugador = false;
let golpeEnemigo = false;

document.getElementById("btnAtaque").onclick = function() {
if (jugador.attackProgress === -1) {
    jugador.startAttackAnimation();
    golpeJugador = false;
    }
};

document.getElementById("btnDanio").onclick = function() {
if (enemigo.attackProgress === -1) {
    enemigo.startAttackAnimation();
    golpeEnemigo = false;
    }
};
function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#777";
    ctx.fillRect(0, 365, canvas.width, 5);
    jugador.draw(ctx);
    enemigo.draw(ctx);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Jugador: " + jugador.currentHp + " HP", 40, 40);
    ctx.fillText("Enemigo: " + enemigo.currentHp + " HP", 650, 40);
}
function animar(tiempo) {
    let dt = Math.min((tiempo - ultimoTiempo) / 1000, 0.05);
    ultimoTiempo = tiempo;
if (hitstopTimer > 0) {
    hitstopTimer = Math.max(0, hitstopTimer - dt);
} else {
    jugador.update(dt);
    enemigo.update(dt);
if (jugador.attackProgress >= 0.5 && !golpeJugador) {
    enemigo.takeDamage(10);
    golpeJugador = true;
    hitstopTimer = 0.065;
        }
if (enemigo.attackProgress >= 0.5 && !golpeEnemigo) {
    jugador.takeDamage(10);
    golpeEnemigo = true;
    hitstopTimer = 0.065;
        }
    }
dibujar();
requestAnimationFrame(animar);
}
requestAnimationFrame(animar);