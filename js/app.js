//game object
const game = {
    myShip: null,
    canvas: document.querySelector("#game-container"),
    ctx: document.querySelector("#game-container").getContext('2d'),
    myEnemies: [],
    myLasers: [],
    upPressed: false,
    downPressed: false,
    //function for creating player's ship
    createShip: ()=>{
        const ship = new Ship(game.canvas.height/2-50);
        this.myShip = ship;
        gameStart = true;
    },
    //function to draw ship and update location as player moves
    drawShip: ()=>{
        game.canvas.height = 500;
        game.canvas.width = 750;
        if (game.canvas.getContext) {
            game.imgShip = document.querySelector("#x-wing")
            game.imgShip.height = "100"
            game.imgShip.width = "100"
            game.ctx.drawImage(game.imgShip,myShip.xPos, myShip.yPos,myShip.width,myShip.height)
            
        }
    },
    //function to draw enemy ships and update location as they move
    drawEnemy: ()=>{
        if (game.canvas.getContext) {
            game.imgEnemy = document.querySelector("#tie-fighter")
            for(let i = 0; i< game.myEnemies.length; i++){
                    game.myEnemies[i].xPos-=.5
                    game.ctx.drawImage(game.imgEnemy,game.myEnemies[i].xPos,game.myEnemies[i].yPos ,game.myEnemies[i].width,game.myEnemies[i].height)
            }
        }
    },
    //function to draw lasers and update location as they move
    drawLasers: ()=>{
        if (game.canvas.getContext) {
            game.imgMyLaser = document.querySelector("#x-wing-laser")
            for(let i = 0; i< game.myLasers.length; i++){
                    game.myLasers[i].xPos+=.5
                    game.ctx.drawImage(game.imgMyLaser,game.myLasers[i].xPos,game.myLasers[i].yPos ,game.myLasers[i].width,game.myLasers[i].height)
                
            }
        }
    },
    //function for keydown event, changes pressed variables to true
    keyDownHandler:(e) =>{
        if(gameStart === true){
            console.log(e.keyCode)
            if(e.key == "Up" || e.key == "ArrowUp") {
                game.upPressed = true;
            }
            else if(e.key == "Down" || e.key == "ArrowDown") {
                game.downPressed = true;
            }
            if(e.keyCode ==32){
                game.spacePressed = true;
                console.log("space pressed")
            }
        }
    }, 
    //function for keyup event, changes pressed variables to false
    keyUpHandler: (e)=>{
        if(gameStart === true){
            if(e.key == "Up" || e.key == "ArrowUp") {
                game.upPressed = false;
            }
            else if(e.key == "Down" || e.key == "ArrowDown") {
                game.downPressed = false;
            }
            if(e.keyCode ==32){
                game.spacePressed = false;
            }
        }
    }, 
    //collision detection function to detect if lasers hit
    collisionDetect: () =>{
        //temp variables to detect collision
        let obj1
        let obj2

        //check for collisions
        for(let i = 0; i< game.myLasers.length; i++){
            obj1 = game.myLasers[i]
            for(let j = 0; j< game.myEnemies.length; j++){
                obj2 =  game.myEnemies[j]
                if(game.objIntersect(obj1.xPos, obj1.yPos, obj1.width, obj1.height, obj2.xPos, obj2.yPos, obj2.width, obj2.height)){
                    game.myLasers.splice(i,1)
                    game.myEnemies.splice(j,1)
                }

            }
        }

    },
    //interesection function used be collisionDetect function
    objIntersect: (x1, y1, w1, h1, x2, y2, w2, h2) =>{
        // Check x and y for overlap
        if (x2 > w1 + x1-40 || x1 > w2 + x2-40 || y2 > h1 + y1-25 || y1 > h2 + y2-25){
            return false;
        }
        document.querySelector("#explosion").play()
        return true;
    },
    //function to move the ships and lasers
    move: () =>{
        if(gameStart === true){
            
            if(game.upPressed) {
                myShip.yPos -= 3;
                if (myShip.yPos <-25){
                    myShip.yPos = -25;
                }
            }
            else if(game.downPressed) {
                myShip.yPos += 3;
                if (myShip.yPos > game.canvas.height-game.imgShip.height+25){
                    myShip.yPos = game.canvas.height-game.imgShip.height+25;
                }
            }
            if(game.spacePressed){
                
                game.myLasers.push(new Laser(myShip.xPos+100,myShip.yPos+50))
                game.spacePressed = false;
                game.myLasers.forEach((x)=>{
                    if(x.xPos >game.canvas.width){
                        game.myLasers.shift()
                    }
                })
                console.log(game.myLasers)

            }
            game.collisionDetect()
            game.clearCanvas()
            game.drawShip()
            game.drawEnemy()
            game.drawLasers()
        }
    },
    //spawns the enemy
    spawnEnemy: () =>{
        if(gameStart === true){
            game.myEnemies.push(new EnemyShip());
            game.myEnemies.forEach((x)=>{
                if(x.xPos <0){
                    game.myEnemies.shift()
                }
            })
            console.log(game.myEnemies)
        }
    },
    //clears the game canvas
    clearCanvas: () =>{
        game.ctx.clearRect(0,0,game.canvas.width, game.canvas.height)
    }
}

//Ship class
class Ship {
    constructor(yPos){
        this.score = 0; 
        this.health = 1000; 
        this.xPos = 0
        this.yPos = yPos
        this.width = 100
        this.height = 100
    }
}

//EnemyShip class
class EnemyShip{
    constructor(){
        this.health = 100
        this.yPos = this.getRandomY()
        this.xPos = 700
        this.width = 100
        this.height = 100
    }
    getRandomY(){
        return Math.floor(Math.random()*450)
    }
}
//Laser class
class Laser{
    constructor(x, y){
        this.xPos = x
        this.yPos = y
        this.width = 10
        this.height = 3
    }
}

let gameStart = false;

//start button 
const startBtn = document.querySelector("#start")
startBtn.addEventListener("click", () => {
    game.createShip()
    startBtn.remove()})
    

//event listener for key presses
document.addEventListener("keydown", game.keyDownHandler, false)
document.addEventListener("keyup", game.keyUpHandler,false)

//intervals for game
const go = setInterval(game.move, 10)
const enemyInt = setInterval(game.spawnEnemy, 4000)