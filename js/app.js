
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
            if(e.key == "Up" || e.key == "ArrowUp") {
                game.upPressed = true;
            }
            else if(e.key == "Down" || e.key == "ArrowDown") {
                game.downPressed = true;
            }
            if(e.keyCode ==32){
                game.spacePressed = true;
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
        let obj3 = myShip
        //check for collisions between myLasers and myEnemies ships
        for(let i = 0; i< game.myLasers.length; i++){
            obj1 = game.myLasers[i]
            for(let j = 0; j< game.myEnemies.length; j++){
                obj2 =  game.myEnemies[j]
                if(game.objIntersect(obj1.xPos, obj1.yPos, obj1.width, obj1.height, obj2.xPos, obj2.yPos, obj2.width, obj2.height)){
                    explosion()
                    game.myLasers.splice(i,1)
                    game.hitEnemy("laser", obj2, j)
                }
                //check if ship collides with enemy
                console.log("xPos Ship: " + obj3.xPos)
                console.log("yPos Ship: " + obj3.yPos)
                console.log("width Ship: " + obj3.width)
                console.log("height Ship: " + obj3.height)
                console.log("xPos enemy: " + obj2.xPos)
                console.log("yPos enemy: " +obj2.yPos)
                console.log("width enemy: " +obj2.width)
                console.log("height enemy: " +obj2.height)
                if(game.objIntersect(obj3.xPos, obj3.yPos, obj3.width, obj3.height, obj2.xPos, obj2.yPos, obj2.width, obj2.height)){
                    explosion()
                    game.hitEnemy("ship", obj2, j)
                }

            }
        }


    },
    //interesection function used by collisionDetect function
    objIntersect: (x1, y1, w1, h1, x2, y2, w2, h2) =>{
        // Check x and y for overlap
        if (x2 > w1 + x1-40 || x1 > w2 + x2-40 || y2 > h1 + y1-25 || y1 > h2 + y2-25){
            return false;
        }
        return true;
    },
    //function to attack enemy ship
    hitEnemy: (attackObj, hitObj, index) =>{
        if(attackObj === "ship"){
            hitObj.health= 0
        }else if(attackObj === "laser"){
            hitObj.health-= myShip.attack
        }
        if(hitObj.health <= 0){
            game.myEnemies.splice(index,1)
            game.addPoints()
        }
    },
    //add points for destroying ship
    addPoints: () =>{
        myShip.score+= 100
        console.log(myShip.score)
        game.updateScoreboard()
    },
    //update the scoreboard
    updateScoreboard: ()=>{
        const score = document.querySelector("#score")
        score.innerHTML = myShip.score
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
                // console.log(game.myLasers)

            }

            game.updateScoreboard()
            game.collisionDetect()
            game.clearCanvas()
            game.drawShip()
            game.drawEnemy()
            game.drawLasers()
            game.checkWin()
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
            // console.log(game.myEnemies)
        }
    },
    //clears the game canvas
    clearCanvas: () =>{
        game.ctx.clearRect(0,0,game.canvas.width, game.canvas.height)
    }, 
    //checks if the game was won and ends it
    checkWin: () =>{
        if(myShip.score === 100){
            console.log("Game over!")
            clearInterval(gameInt)
            clearInterval(enemyInt)
            game.updateVictoryStyle()
            
        }
    },
    updateVictoryStyle: () =>{
        song.pause()
        win.play()
        game.clearCanvas()
        document.querySelector("#victory").style.display = "flex"
        document.querySelector("#game-container").style.display = "none"
        health.style.display = "none"
        scoreboard.style.fontSize = "75px"
        stats.style.alignItems = "center"
        startBtn.innerHTML = "Restart"
        document.querySelector("#buttons").appendChild(startBtn)
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
        this.attack = 20
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
//scoreboard and health elements
const health = document.querySelector("#health")
const scoreboard = document.querySelector("#scoreboard")
const stats = document.querySelector("#stats")

//variable for intervals
let gameInt
let enemyInt

//start button 
const startBtn = document.querySelector("#start")
startBtn.addEventListener("click", () => {
    restart()
    gameBegin()
    })

gameBegin = () =>{
    //intervals for game
    gameInt = setInterval(game.move, 10)
    enemyInt = setInterval(game.spawnEnemy, 4000)
    game.createShip()
    startBtn.remove()
    health.style.display = "flex"
    scoreboard.style.display = "flex"
    song.play()
}
//event listener for key presses
document.addEventListener("keydown", game.keyDownHandler, false)
document.addEventListener("keyup", game.keyUpHandler,false)



restart= () =>{
    if(document.querySelector("#victory").style.display = "flex"){
        document.querySelector("#victory").style.display = "none"
        document.querySelector("#game-container").style.display = "block"
    }
    game.myShip = null
    game.myEnemies = []
    game.myLasers = []
    scoreboard.style.fontSize = "100%"
    stats.style.alignItems = "flex-start"
}