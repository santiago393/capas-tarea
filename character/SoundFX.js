export class SoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
}
init() {
if (!this.ctx) {
    this.ctx = new AudioContext();
}
if (this.ctx.state === "suspended") {
    this.ctx.resume();
    }
}
sonido(tipo, inicio, final, duracion, volumen, impacto = false) {
    if (!this.enabled) return;
        this.init();

    let ahora = this.ctx.currentTime;
    let osc = this.ctx.createOscillator();
    let gain = this.ctx.createGain();

    osc.type = tipo;
    osc.frequency.setValueAtTime(inicio, ahora);
    osc.frequency.exponentialRampToValueAtTime(final, ahora + duracion);

    gain.gain.setValueAtTime(volumen, ahora);
    gain.gain.exponentialRampToValueAtTime(0.001, ahora + duracion);
       
if (impacto) {
    let filtro = this.ctx.createBiquadFilter();
        filtro.type = "lowpass";
        filtro.frequency.setValueAtTime(800, ahora);
        filtro.frequency.exponentialRampToValueAtTime(120, ahora + duracion);
        osc.connect(filtro);
        filtro.connect(gain);
} else {
    osc.connect(gain);
}
    gain.connect(this.ctx.destination);

    osc.start(ahora);
    osc.stop(ahora + duracion);
}
playAttack() {
    this.sonido("triangle", 160, 520, 0.16, 0.25);
}
playHit() {
    this.sonido("sawtooth", 140, 35, 0.22, 0.35, true);
}
playCritical() {
    this.sonido("square", 320, 60, 0.32, 0.20);
    this.sonido("sawtooth", 640, 90, 0.32, 0.20);
    }
}
