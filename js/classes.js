class Sprite {
    constructor({ position, imageSrc, width, height, scale = 1, framesMax = 1 }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
    }

    draw(mirror = false) {
        ctx.save();
        if (mirror) {
            ctx.scale(-1, 1);
            ctx.drawImage(
                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                -this.position.x - this.image.width / (this.framesMax) * this.scale,
                this.position.y,
                (this.image.width / this.framesMax) * this.scale,
                this.image.height * this.scale
            );
            ctx.restore();
        } else {
            ctx.drawImage(
                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.position.x,
                this.position.y,
                (this.image.width / this.framesMax) * this.scale,
                this.image.height * this.scale
            );
        }
    }

    animateFrames() {
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }

    update() {
        this.draw();
        this.animateFrames();
    }
}

class Fighter extends Sprite {
    constructor({ position, velocity, color, offset, imageSrc, scale = 1, framesMax = 1, sprites }) {
        super({ position, imageSrc, scale, framesMax });
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.color = color;
        this.lastKey;
        this.health = 100;
        this.isAttacking;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: offset,
            width: 150,
            height: 50,
        };
        this.framesElapsed = 0;
        this.framesCurrent = 0;
        this.framesHold = 10;
        this.sprites = sprites;
        this.isDead = false;
        this.mirrorImage = false;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = this.sprites[sprite].imageSrc;
        }
    }

    update() {
        this.draw(this.mirrorImage);

        if (!this.isDead) {
            this.animateFrames()
        }

        this.image.height = 200;

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        let posOffset = 450;

        if (this.position.y + this.height >= canvas.height - posOffset) {
            this.velocity.y = 0;
            this.position.y = canvas.height - posOffset - this.height;
        } else {
            this.velocity.y += gravity;
        }
    }

    attack() {
        this.switchSprites("attack");
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 1000);
    }

    jump() {
        if (this.position.y + this.height >= canvas.height - 450 && !this.isDead) {
            this.velocity.y = -20;
        }
    }

    switchSprites(sprite) {
        if (this.image === this.sprites.dead.image || this.image === this.sprites.attack.image && this.framesCurrent < this.sprites.attack.framesMax - 1) {
            if (this.framesCurrent === this.sprites.dead.framesMax - 1) {
                this.isDead = true;
            }
            return;
        }

        switch (sprite) {
            case "idle":
                this.image = this.sprites.idle.image;
                this.framesMax = this.sprites.idle.framesMax;
                this.framesHold = this.sprites.idle.framesHold;
                break;

            case "runL":
                this.mirrorImage = true;
                this.image = this.sprites.run.image;
                this.framesMax = this.sprites.run.framesMax;
                this.framesHold = this.sprites.run.framesHold;
                break;

            case "runR":
                this.mirrorImage = false;
                this.image = this.sprites.run.image;
                this.framesMax = this.sprites.run.framesMax;
                this.framesHold = this.sprites.run.framesHold;
                break;

            case "jump":
                this.image = this.sprites.jump.image;
                this.framesMax = this.sprites.jump.framesMax;
                this.framesHold = this.sprites.jump.framesHold;
                this.framesCurrent = 0;
                break;

            case "fall":
                this.image = this.sprites.fall.image;
                this.framesMax = this.sprites.fall.framesMax;
                this.framesHold = this.sprites.fall.framesHold;
                break;

            case "attack":
                console.log("attack");
                this.image = this.sprites.attack.image;
                this.framesMax = this.sprites.attack.framesMax;
                this.framesHold = this.sprites.attack.framesHold;
                this.framesCurrent = 0;
                break;

            case "dead":
                this.image = this.sprites.dead.image;
                this.framesMax = this.sprites.dead.framesMax;
                this.framesHold = this.sprites.dead.framesHold;
                this.framesCurrent = 0;
                break;

            default:
                print("Error: returned to default");
                break;
        }
    }
}