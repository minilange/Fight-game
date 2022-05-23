const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let animation;

canvas.width = 1024;
canvas.height = 768;

ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "black";

const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./assets/background/background.png",
})

const shop = new Sprite({
    position: {
        x: 650,
        y: 175,
    },
    imageSrc: "./assets/decorations/shop_anim.png",
    scale: 2.4,
    framesMax: 6
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    offset: {
        x: 0,
        y: 0,
    },
    color: "lightblue",
    scale: 2.5,
    sprites: {
        idle: {
            imageSrc: "./assets/character/Mac/Idle.png",
            framesMax: 8,
            framesHold: 10,
        },
        run: {
            imageSrc: "./assets/character/Mac/Run.png",
            framesMax: 8,
            framesHold: 10,
        },
        jump: {
            imageSrc: "./assets/character/Mac/Jump.png",
            framesMax: 2,
            framesHold: 10,
        },
        fall: {
            imageSrc: "./assets/character/Mac/Fall.png",
            framesMax: 2,
            framesHold: 10,
        },
        attack: {
            imageSrc: "./assets/character/Mac/Attack1.png",
            framesMax: 6,
            framesHold: 8,
        },
        dead: {
            imageSrc: "./assets/character/Mac/death.png",
            framesMax: 6,
            framesHold: 10,
        }
    }
});

const enemy = new Fighter({
    position: {
        x: 500,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    offset: {
        x: 0,
        y: 0,
    },
    color: "violet",
    scale: 2.5,
    sprites: {
        idle: {
            imageSrc: "./assets/character/Kenji/Idle.png",
            framesMax: 4,
            framesHold: 10,
        },
        run: {
            imageSrc: "./assets/character/Kenji/Run.png",
            framesMax: 8,
            framesHold: 10,
        },
        jump: {
            imageSrc: "./assets/character/Kenji/Jump.png",
            framesMax: 2,
            framesHold: 10,
        },
        fall: {
            imageSrc: "./assets/character/Kenji/Fall.png",
            framesMax: 2,
            framesHold: 10,
        },
        attack: {
            imageSrc: "./assets/character/Kenji/Attack1.png",
            framesMax: 4,
            framesHold: 10,
        },
        dead: {
            imageSrc: "./assets/character/Kenji/death.png",
            framesMax: 7,
            framesHold: 10,
        }
    }
});

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    },
};

let timer = 10;
decreaseTimer();
animate();

window.addEventListener("keydown", (event) => {
    console.log(event.key);
    switch (event.key) {
        //player keys
        case "d":
            keys.d.pressed = true;
            player.lastKey = "d";
            break;
        case "a":
            keys.a.pressed = true;
            player.lastKey = "a";
            break;
        case "w":
            keys.w.pressed = true;
            player.lastKey = "w";
            player.jump();
            break;
        case " ":
            player.attack();
            break;

        // Enemy keys
        case "ArrowRight":
            keys.ArrowRight.pressed = true;
            enemy.lastKey = "ArrowRight";
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = "ArrowLeft";
            break;
        case "ArrowUp":
            keys.ArrowUp.pressed = true;
            enemy.lastKey = "ArrowUp";
            enemy.jump();
            break;
        case "ArrowDown":
            enemy.attack();
            break;
    }
});

window.addEventListener("keyup", (event) => {
    console.log(event.key);
    switch (event.key) {
        //player keys
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "w":
            keys.w.pressed = false;
            break;
        case " ":
            player.isAttacking = false;

        // Enemy keys

        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            break;
        case "ArrowUp":
            keys.ArrowUp.pressed = false;
            break;
        case "ArrowDown":
            enemy.isAttacking = false;
            break;
    }
});