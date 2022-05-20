const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 768;

const gravity = 0.7;

ctx.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor({position, velocoty}) {
        this.position = position;
        this.velocity = velocoty;
        this.width = 100;
        this.height = 150;
    }
    
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y;
        
        if (this.position.y + this.height >= canvas.height) {
            this.velocity.y = 0;
            this.velocity.y += -10;
        } else {
            this.velocity.y += gravity;
        }
    }
}

const player = new Sprite({
    position: {
        x: 100,
        y: 100
    },
    velocoty: {
        x: 0,
        y: 0
    }
});

const enemy = new Sprite({
    position: {
        x: 500,
        y: 0
    },
    velocoty: {
        x: 0,
        y: 0
    }
});

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
}

animate();

window.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch (e.key) {
        case 'w':
            player.velocity.y = -10;
            break;
    }
})

console.log(player);