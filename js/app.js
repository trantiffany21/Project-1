//game object
const game = {
    myShip: null,
    canvas: document.querySelector("#game-container"),
    createShip: ()=>{
        const ship = new Ship();
        this.myShip = ship;
        gameStart = true;
        game.showShip();
        game.upPressed = false;
        game.downPressed = false;
        game.shipY = (game.canvas.height/2)
    },
    showShip: ()=>{
        game.canvas.height = 500;
        game.canvas.width = 750;
        if (game.canvas.getContext) {
            const ctx = game.canvas.getContext('2d');
            game.imgShip = document.querySelector("#x-wing")
            game.imgShip.height = "100"
            game.imgShip.width = "100"
            ctx.drawImage(game.imgShip,0, game.shipY,100,100)
            
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
            game.showShip()
            if(game.upPressed) {
                game.shipY -= 3;
                if (game.shipY <-25){
                    game.shipY = -25;
                }
            }
            else if(game.downPressed) {
                game.shipY += 3;
                // console.log(game.canvas.height)
                // console.log("height " + game.imgShip.height)
                // console.log("shipY " + game.shipY)
                if (game.shipY > game.canvas.height-game.imgShip.height+25){
                    game.shipY = game.canvas.height-game.imgShip.height+25;
                }
            }
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

let gameStart = false;
const startBtn = document.querySelector("#start")
startBtn.addEventListener("click", () => {
    game.createShip()})


document.addEventListener("keydown", game.keyDownHandler, false)
document.addEventListener("keyup", game.keyUpHandler,false)
const go = setInterval(game.move, 10)
    

