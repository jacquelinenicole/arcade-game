// creates player and initializes location
var Player = function() {
    this.xValue = 200;
    this.yValue = 400;
    this.width = 50;
    this.height = 50;
    this.sprite = 'images/char-princess-girl.png';
};

// continuously checks for a collision
Player.prototype.update = function() {
    checkForCollisions();
};

// draws the player's sprite to the screen
Player.prototype.render = function(xValue) {
    ctx.drawImage(Resources.get(this.sprite), this.xValue, this.yValue);
};


// creates enemy and randomizes speed
var Enemy = function(yValue) {
    this.xValue = randomNumber(200, 1000);
    this.yValue = yValue;
    this.width = 50;
    this.height = 50;
    this.speed = randomNumber(300, 500);
    this.sprite = 'images/enemy-bug.png';
};

// starts enemies on left side of screen and keeps them moving to the right
Enemy.prototype.update = function(xValue) {
    this.xValue += this.speed * xValue;
    if (this.xValue > 950) {
        this.xValue = -100;
        this.speed = randomNumber(300, 500);
    }
};

// draws the enemy's sprite to the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xValue, this.yValue);
};

// translates the key pressed into an action
Player.prototype.changePosition = function(key) {
    if (key === 'up') {
        this.yValue -= 83;

        // occurs when the player reaches the water
        if (this.yValue <= 0) {
            alert('Congratulations! You\'ve won!');
            location.reload();
        }
    }

    if (key === 'down') {
        // checks bottom bound
        if (this.yValue >= 318) { 
            this.yValue = 400;
        } else {
            this.yValue += 83;
        }
    }

    if (key === 'left') {
        // checks left bound
        if (this.xValue <= 100) {
            this.xValue = 0;
        } else {
            this.xValue -= 101;
        }
    }

    if (key === 'right') {
        // checks right bound
        if (this.xValue >= 300) {
            this.xValue = 400;
        } else {
            this.xValue += 101;
        }
    }
};

// instantiating variables
var player = new Player();

// 2 enemies on 1st level, 2 enemies on 2nd level, 3 enemies on 3rd level
var allEnemies = [new Enemy(55), new Enemy(55), new Enemy(55), new Enemy(140), new Enemy(140), new Enemy(225), new Enemy(225)];

// allows player to move sprite by using keyboard's arrow keys
document.addEventListener('keyup', function(event) {
    var arrowKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.changePosition(arrowKeys[event.keyCode]);
});

function checkForCollisions() {
    // if player's location is the same as any enemies' location, a collision has occurred
    for (var index = 0; index < allEnemies.length; index++) {
        if (player.xValue < allEnemies[index].xValue + allEnemies[index].width &&
            player.xValue + player.width > allEnemies[index].xValue &&
            player.yValue < allEnemies[index].yValue + allEnemies[index].height &&
            player.yValue + player.height > allEnemies[index].yValue) {
            alert('You\'ve lost. \n\nClick to retry!');
            location.reload();
        }
    }
}

// generate a random number within given range
function randomNumber(minNum, maxNum) {
    return Math.random() * (minNum - maxNum) + minNum;
}