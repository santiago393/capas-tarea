export class FeedbackManager {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.screenShakeTimer = 0;
        this.screenShakeDuration = 0.25;
        this.screenShakeMagnitude = 0;
        this.screenFlashTimer = 0;
        this.screenFlashDuration = 0.08;
        this.screenFlashColor = "255, 255, 255";
        this.flashAlpha = 0.65;
}
impact(magnitude = 9, color = "255, 255, 255", alpha = 0.65) {
    this.screenShakeMagnitude = magnitude;
    this.screenShakeTimer = this.screenShakeDuration;
    this.screenFlashColor = color;
    this.screenFlashTimer = this.screenFlashDuration;
    this.flashAlpha = alpha;
}
update(dt) {
    this.screenShakeTimer = Math.max(0, this.screenShakeTimer - dt);
    this.screenFlashTimer = Math.max(0, this.screenFlashTimer - dt);
}
applyCameraShake() {
if (this.screenShakeTimer > 0) {
    let factor = this.screenShakeTimer / this.screenShakeDuration;
    let mag = this.screenShakeMagnitude * factor * factor;
    let dx = (Math.random() * 2 - 1) * mag;
    let dy = (Math.random() * 2 - 1) * mag;
    this.ctx.translate(dx, dy);
    }
}
drawScreenFlash() {
    if (this.screenFlashTimer > 0) {
        let alpha = (this.screenFlashTimer / this.screenFlashDuration)
          * this.flashAlpha;
            this.ctx.save();
            this.ctx.fillStyle = `rgba(${this.screenFlashColor}, ${alpha})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
    }
}
