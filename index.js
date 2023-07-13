const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
let speed = 7;

let tileCount = 28;
let tileSize =  canvas.width / tileCount - 2;
let headX = 18;
let headY = 18;
const snakeParts =[];
let tailLength = 2;



let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let Score = 0;







//game loop
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }




    clearScreen();

    

    checkAppleCollision();
    drawApple();
    drawSnake();
    
    drawScore();

    setTimeout(drawGame, 1000/ speed);

}

function isGameOver(){
    let gameOver = false;


    if(headX < 0 ){
        gameOver = true;
    }

    else if (headX === tileCount){
        gameOver = true;
    }


    else if(headY < 0 ){
        gameOver = true;
    }

    else if (headY === tileCount){
        gameOver = true;
    }



    if (gameOver){
        ctx.fillStyle = 'white';
        ctx.font = '75px Verdana';

        var gradient = ctx.createLinearGradient (0, 0, canvas.width,0);
        gradient.addColorStop('0', 'purple');
        gradient.addColorStop('0.5', 'green');
        gradient.addColorStop('1', 'blue');

        ctx.fillStyle = gradient;

        ctx.fillText('Game Over!', canvas.width / 4.5, canvas.height / 2);
    }

    return gameOver;





}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText('Score:' + Score, 8, 20);
  }
  

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){
    ctx.fillStyle= "green";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

    ctx.fillStyle = 'blue';
    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = 'purple';
    ctx.fillRect(appleX* tileCount, appleY* tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
    if(appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        Score++;
        xVelocity+1.25;
        yVelocity+1.25;
    }
}




document.body.addEventListener('keydown', keyDown);

function keyDown(evt){
    
    if (evt.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }


    if (evt.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    

    if (evt.keyCode == 37){
        if(yVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }


    if (evt.keyCode == 39){
        if(yVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
 
 
}

drawGame();
