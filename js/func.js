function decreaseTimer() {
    if (timer > 0) {
        console.log(timer === 0 || player.health <= 0 || enemy.health <= 0);
        if (timer === 0 || player.health <= 0 || enemy.health <= 0) {
            determineWinner({ player, enemy });
            document.querySelector("#timer").innerHTML = "<p>Game Over</p>";
        } 
        timer--;
        setTimeout(decreaseTimer, 1000);
        document.querySelector("#timer").innerHTML = timer;
    }
}

function determineWinner({ player, enemy }) {
    let gameover = "<div style='display: flex; flex-direction: column'><h1>Game Over</h1>";

    if (player.health <= 0 || enemy.health <= 0 || timer <= 0) {
        let displayText = document.querySelector("#displayText");

        if (displayText.innerHTML.length < 10) {
            displayText.style.display = 'flex';
            displayText.innerHTML = gameover;

            if (player.health === enemy.health || timer === 0) {
                displayText.innerHTML += "<p>Draw</p>";

            } else if (player.health >= enemy.health || enemy.health === 0) {
                displayText.innerHTML += "<p>Player 1 Win</p>";
                playerWins++;

            } else if (player.health <= enemy.health || player.health === 0) {
                displayText.innerHTML += "<p>Player 2 Win</p>";
                enemyWins++;
            }

            displayText.innerHTML += '<button onclick="resetGame()">Restart</button><div>';
            document.querySelector("#pointCounter").innerHTML = `${playerWins} : ${enemyWins}`;
        }
    }
}

function retangularCollision({ rect1, rect2 }) {
    return (
        rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
        rect1.attackBox.position.x <= rect2.position.x + rect2.attackBox.width &&
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
        rect1.attackBox.position.y <= rect2.position.y + rect2.attackBox.height
    );
}

function resetGame() {
    player.revive()
    enemy.revive();

    player.position = { x: 0, y: 0 };
    enemy.position = { x: 500, y: 100 };

    document.querySelector("#displayText").style.display = 'none';
    document.querySelector("#displayText").innerHTML = '';

    document.querySelector("#playerHealth").style.width = player.health + "%";
    document.querySelector("#enemyHealth").style.width = enemy.health + "%";

    timer = 60;
    document.querySelector("#timer").innerHTML = timer;
}

function animate() {
    animation = window.requestAnimationFrame(animate);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ASSETS
    background.update();
    shop.update();

    // PLAYERS
    player.update();
    enemy.update();

    // PLAYER MOVEMENT
    player.velocity.x = 0;
    player.switchSprites("idle");

    if (!player.isDead) {

        if (keys.a.pressed && player.lastKey === "a") {
            player.velocity.x -= 5;
            player.switchSprites("runL")
        }

        if (keys.d.pressed && player.lastKey === "d") {
            player.velocity.x += 5;
            player.switchSprites("runR")
        }

        if (player.velocity.y < 0) {
            player.switchSprites("jump");
            player.isJumping = true;
        } else if (player.velocity.y > 0) {
            player.switchSprites("fall");
            player.isJumping = false;
        }

        if (player.isAttacking && retangularCollision({ rect1: player, rect2: enemy })) {
            player.isAttacking = true;
            enemy.health -= HITDMG;
            enemy.switchSprites("hit")
            document.querySelector("#enemyHealth").style.width = enemy.health + "%";
            console.log("player hit 💀" + player.health);
        }
    }

    // ENEMY MOVEMENT
    enemy.velocity.x = 0;
    enemy.switchSprites("idle")
    if (!enemy.isDead) {

        if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
            enemy.velocity.x -= 5;
            enemy.switchSprites("runL")
        }

        if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
            enemy.velocity.x += 5;
            enemy.switchSprites("runR")
        }

        if (enemy.velocity.y < 0) {
            enemy.switchSprites("jump");
            enemy.isJumping = true;
        } else if (enemy.velocity.y > 0) {
            enemy.switchSprites("fall");
            enemy.isJumping = false;
        }

        if (enemy.isAttacking && retangularCollision({ rect1: enemy, rect2: player })) {
            enemy.isAttacking = true;
            player.health -= HITDMG;
            player.switchSprites("hit")
            document.querySelector("#playerHealth").style.width = player.health + "%";
            console.log("Enemy hit 🔥" + enemy.health);
        }
    }

    if (enemy.health <= 0 || player.health <= 0 || timer <= 0) {
        determineWinner({ player, enemy });
        if (enemy.health <= 0 && !enemy.isDead) {
            enemy.switchSprites("dead");
        } else if (player.health <= 0 && !player.isDead) {
            player.switchSprites("dead");
        }
    }
}
