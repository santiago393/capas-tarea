export class Character {
constructor({ name, maxHp, baseX, baseY, width, height, spriteSrc, isPlayer }) {
    this.name = name;
    this.maxHp = maxHp;
    this.currentHp = maxHp;
    this.displayedHp = maxHp;

    this.baseX = baseX;
    this.baseY = baseY;
    this.x = baseX;
    this.y = baseY;

    this.width = width;
    this.height = height;
    this.isPlayer = isPlayer;

    this.image = new Image();
    this.isLoaded = false;
    this.image.onload = () => this.isLoaded = true;
    this.image.src = spriteSrc;

    this.scaleX = 1;
    this.scaleY = 1;
    this.offsetX = 0;
    this.offsetY = 0;

    this.shakeTimer = 0;
    this.tintTimer = 0;
    this.attackProgress = -1;
    this.idleTimer = 0;
}
takeDamage(amount, flags = { squashShake: true, tint: true }) {
    this.currentHp = Math.max(0, this.currentHp - amount);
        if (flags.squashShake) {
        this.scaleX = 1.33;
        this.scaleY = 0.75;
        this.shakeTimer = 0.35;
}
if (flags.tint) {
    this.tintTimer = 0.25;
}
}
startAttackAnimation() {
    this.attackProgress = 0;
}
update(dt, flags = { squashShake: true, tint: true }) {
    this.idleTimer += dt * 3.5;
    this.offsetX = 0;
    this.offsetY = 0;
    
let respirar = Math.sin(this.idleTimer) * 0.035;
    this.scaleY = 1 + respirar;
    this.scaleX = 1 - respirar * 0.5;

if (this.attackProgress >= 0) {
    this.attackProgress += dt * 2.8;
let p = this.attackProgress;
let dir = this.isPlayer ? 1 : -1;
if (p < 0.25) {             
    this.offsetX = -dir * 18 * (p / 0.25);
    this.scaleY = 1.15;
} else if (p < 0.65) {           
    this.offsetX = -dir * 18 + dir * 70 * ((p - 0.25) / 0.4);
        this.scaleY = 0.85;
} else if (p < 1) {        
    this.offsetX = dir * 52 * (1 - (p - 0.65) / 0.35);
    this.scaleY = 1;
} else {
    this.attackProgress = -1;
}
if (flags.squashShake) {
    this.scaleX = 1 / this.scaleY;
}
    }
if (this.shakeTimer > 0) {
    this.shakeTimer = Math.max(0, this.shakeTimer - dt);
if (flags.squashShake) {
let fuerza = this.shakeTimer / 0.35;
    this.offsetX += (Math.random() - 0.5) * 28 * fuerza;
    this.offsetY = (Math.random() - 0.5) * 14 * fuerza;
    this.scaleY = 1 - 0.25 * fuerza;
    this.scaleX = 1 / this.scaleY;
}
    }
if (this.tintTimer > 0) {
    this.tintTimer = Math.max(0, this.tintTimer - dt);
}
    this.x = this.baseX + this.offsetX;
    this.y = this.baseY + this.offsetY;
}
draw(ctx, flags = { squashShake: true, tint: true }) {
if (!this.isLoaded) return;
    ctx.save();
    ctx.translate(this.x, this.y);
if (flags.squashShake) {
    ctx.scale(this.scaleX, this.scaleY);
}
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.ellipse(0, 0, this.width * 0.35, 12, 0, 0, Math.PI * 2);
    ctx.fill();  
if (flags.tint && this.tintTimer > 0) {
    ctx.filter = "brightness(1.8) sepia(1) saturate(6) hue-rotate(-50deg)";
}
ctx.drawImage(
    this.image,
    -this.width / 2,
    -this.height,
    this.width,
    this.height
);

ctx.restore();
    }
}
