//game object
const game = {
    myShip: null,
    canvas: document.querySelector("#game-container"),
    ctx: document.querySelector("#game-container").getContext('2d'),
    myEnemies: [],
    createShip: ()=>{
        const ship = new Ship();
        this.myShip = ship;
        gameStart = true;
        //game.showShip("ship");
        game.upPressed = false;
        game.downPressed = false;
        game.shipY = (game.canvas.height/2-50)
    },
    drawShip: ()=>{
        game.canvas.height = 500;
        game.canvas.width = 750;
        if (game.canvas.getContext) {
            game.imgShip = document.querySelector("#x-wing")
            game.imgShip.height = "100"
            game.imgShip.width = "100"
            game.ctx.drawImage(game.imgShip,0, game.shipY,100,100)
            
        }
    },
    drawEnemy: ()=>{
        if (game.canvas.getContext) {
            game.imgEnemy = document.querySelector("#tie-fighter")
            game.imgEnemy.height = "100"
            game.imgEnemy.width = "100"
            for(let i = 0; i< game.myEnemies.length; i++){
                game.myEnemies[i].xPos-=.5
                //console.log("Ship " + i +": "+ game.myEnemies[i].xPos)
                game.ctx.drawImage(game.imgEnemy,game.myEnemies[i].xPos,game.myEnemies[i].yPos ,100,100)
            }
        }
    },
    keyDownHandler(e) {
        if(gameStart === true){
            if(e.key == "Up" || e.key == "ArrowUp") {
                game.upPressed = true;
            }
            else if(e.key == "Down" || e.key == "ArrowDown") {
                game.downPressed = true;
            }
        }
    }, 
    keyUpHandler(e){
        if(gameStart === true){
            if(e.key == "Up" || e.key == "ArrowUp") {
                game.upPressed = false;
            }
            else if(e.key == "Down" || e.key == "ArrowDown") {
                game.downPressed = false;
            }
        }
    }, 
    move: () =>{
        if(gameStart === true){
            game.drawShip()
            game.drawEnemy()
            if(game.upPressed) {
                game.shipY -= 3;
                if (game.shipY <-25){
                    game.shipY = -25;
                }
            }
            else if(game.downPressed) {
                game.shipY += 3;
                if (game.shipY > game.canvas.height-game.imgShip.height+25){
                    game.shipY = game.canvas.height-game.imgShip.height+25;
                }
            }
        }
    },
    startEnemy: () =>{
        if(gameStart === true){
            game.myEnemies.push(new EnemyShip());
            game.myEnemies.forEach((x)=>{
                if(x.xPos <0){
                    game.myEnemies.shift()
                }
            }
            )
            console.log(game.myEnemies)
        }
    }
}

//Ship class
class Ship {
    constructor(){
        this.score = 0; 
        this.health = 1000; 
    }
}

//EnemyShip class
class EnemyShip{
    constructor(){
        this.health = 100
        this.yPos = this.getRandomY()
        this.xPos = 700
    }
    getRandomY(){
        return Math.floor(Math.random()*300)+25
    }
}

let gameStart = false;
const startBtn = document.querySelector("#start")
startBtn.addEventListener("click", () => {
    game.createShip()})
    
    
    document.addEventListener("keydown", game.keyDownHandler, false)
    document.addEventListener("keyup", game.keyUpHandler,false)
    const go = setInterval(game.move, 10)
    const enemyInt = setInterval(game.startEnemy, 4000)