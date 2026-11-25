import { Character } from "./character/character.js";
import { SoundFX } from "./character/SoundFX.js";
import { FeedbackManager } from "./character/FeedbackManager.js";
import { BattleEngine } from "./character/BattleEngine.js";
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
const sonido = new SoundFX();
const feedback = new FeedbackManager(canvas, ctx);
const batalla = new BattleEngine(jugador, enemigo, sonido, feedback);

const btnAtaque = document.getElementById("btnAtaque");
const btnElectrico = document.getElementById("btnElectrico");
const btnFuego = document.getElementById("btnFuego");
    btnAtaque.onclick = function() {
        batalla.startTurn("normal");
};
    btnElectrico.onclick = function() {
        batalla.startTurn("electrico");
};
    btnFuego.onclick = function() {
        batalla.startTurn("fuego");
};
function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    feedback.applyCameraShake();
    ctx.fillStyle = "#777";
    ctx.fillRect(0, 365, canvas.width, 5);
    jugador.draw(ctx);
    enemigo.draw(ctx);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Jugador: " + jugador.currentHp + " HP", 40, 40);
    ctx.fillText("Enemigo: " + enemigo.currentHp + " HP", 650, 40);
    ctx.textAlign = "center";
    ctx.fillText(batalla.message, canvas.width / 2, 90);
    ctx.restore();
feedback.drawScreenFlash();
}
function animar(tiempo) {
let dt = Math.min((tiempo - ultimoTiempo) / 1000, 0.05);
    ultimoTiempo = tiempo;
    batalla.update(dt);
dibujar();
let bloqueado = batalla.state !== "PLAYER_SELECT";
btnAtaque.disabled = bloqueado;
btnElectrico.disabled = bloqueado;
btnFuego.disabled = bloqueado;
requestAnimationFrame(animar);
}
requestAnimationFrame(animar);