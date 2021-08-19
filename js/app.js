
//game object
const game = {
    myShip: null,
    canvas: document.querySelector("#game-container"),
    ctx: document.querySelector("#game-container").getContext('2d'),
    myEnemies: [],
    myLasers: [],
    enemyLasers: [],
    upPressed: false,
    downPressed: false,
    //function for creating player's ship
    createShip: ()=>{
        const ship = new Ship(game.canvas.height/2-50);
        myShip = ship;
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
                    game.myEnemies[i].xPos-=1
                    game.ctx.drawImage(game.imgEnemy,game.myEnemies[i].xPos,game.myEnemies[i].yPos ,game.myEnemies[i].width,game.myEnemies[i].height)
            }
        }
    },
    //function to draw lasers and update location as they move
    drawLasers: ()=>{
        if (game.canvas.getContext) {
            game.imgMyLaser = document.querySelector("#x-wing-laser")
            for(let i = 0; i< game.myLasers.length; i++){
                    game.myLasers[i].xPos+=.75
                    game.ctx.drawImage(game.imgMyLaser,game.myLasers[i].xPos,game.myLasers[i].yPos ,game.myLasers[i].width,game.myLasers[i].height)
            }
        }
    },
    //function to draw enemy lasers and update location as they move
    drawEnemyLasers: ()=>{
        if (game.canvas.getContext) {
            game.imgEnemyLaser = document.querySelector('#tie-fighter-laser')
            for(let j=0; j<game.enemyLasers.length; j++){
                game.enemyLasers[j].xPos-=1.5
                game.ctx.drawImage(game.imgEnemyLaser,game.enemyLasers[j].xPos,game.enemyLasers[j].yPos,game.enemyLasers[j].width,game.enemyLasers[j].height)
                
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
        let obj4

        //check for collisions between myLasers and myEnemies ships
        for(let i = 0; i< game.myLasers.length; i++){
            obj1 = game.myLasers[i]
            for(let j = 0; j< game.myEnemies.length; j++){
                obj2 =  game.myEnemies[j]
                if(game.objIntersect(obj1.xPos, obj1.yPos, obj1.width, obj1.height, obj2.xPos, obj2.yPos, obj2.width, obj2.height)){
                    explosion()
                    game.myLasers.splice(i,1)
                    game.objCollision("laser", obj2, j)
                }
                

            }
        }

        //check for collisions between myShip and myEnemies
        for(let j = 0; j< game.myEnemies.length; j++){
            obj2 =  game.myEnemies[j]
            //check if ship collides with enemy
            if(game.objIntersect(obj3.xPos, obj3.yPos, obj3.width, obj3.height, obj2.xPos, obj2.yPos, obj2.width, obj2.height)){
                explosion()
                game.objCollision("ship", obj2, j)
            }
        }
        //check for collisions between myShip and enemyLasers
        for(let k = 0; k< game.enemyLasers.length; k++){
            obj4 =  game.enemyLasers[k]
            //check if ship collides with enemy laser
            if(game.objIntersect(obj4.xPos, obj4.yPos, obj4.width, obj4.height, obj3.xPos, obj3.yPos, obj3.width, obj3.height)){
                console.log("test2")
                explosion()
                game.objCollision("laser", obj3, k)
                game.enemyLasers.splice(k,1)
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
    objCollision: (attackObj, hitObj, index) =>{
        if(attackObj === "ship"){
            game.myEnemies.splice(index,1)
            shipExplosion.play()
            game.hitShip(attackObj)
            return false
        }else if(attackObj === "laser"){
            hitObj.health-= myShip.attack
            console.log("health: "+ hitObj.health)
        }
        if(hitObj.health <= 0){
            game.myEnemies.splice(index,1)
            game.addPoints()
        }
    },
    //function for when ship is hit by enemy
    hitShip: (attackObj) =>{
        if(attackObj === "ship"){
            myShip.health-=100
        }
    },
    //function to update health bar of myShip
    updateHealthBar: () =>{
        let healthRemaining = document.querySelector('#health-remaining')
        healthRemaining.style.width = `${myShip.health/10}%`
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

        }
    },
    //function to update run the game
    gameUpdate: () =>{
        if(gameStart === true){
            game.move()
            game.updateScoreboard()
            game.collisionDetect()
            game.updateHealthBar()
            game.clearCanvas()
            game.drawShip()
            game.drawEnemy()
            game.drawLasers()
            game.drawEnemyLasers()
            game.checkResult()
        }
    },
    //spawns the enemy
    spawnEnemy: () =>{
        if(gameStart === true){
            game.myEnemies.push(new EnemyShip());
            let newEnemy = game.myEnemies[game.myEnemies.length-1]
            game.enemyLasers.push(new Laser(newEnemy.xPos, newEnemy.yPos+50))
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
    checkResult: () =>{
        if(myShip.score >= 100){
            console.log("Winner!")
            clearInterval(gameInt)
            clearInterval(enemyInt)
            game.endGameScreen("win")
        }else if(myShip.health <= 900){
            console.log("You lost!")
            clearInterval(gameInt)
            clearInterval(enemyInt)
            game.endGameScreen("lose")
        }
    },
    //change window on win or loss
    endGameScreen: (result) =>{
        song.pause()
        game.clearCanvas()
        document.querySelector("#result").style.display = "flex"
        document.querySelector("#result-image").style.display = "block"
        document.querySelector("#game-container").style.display = "none"
        health.style.display = "none"
        scoreboard.style.fontSize = "50px"
        stats.style.alignItems = "center"
        startBtn.innerHTML = "Restart"
        document.querySelector("#buttons").appendChild(startBtn)
        if(result === 'win'){
            win.play()
            document.querySelector("#result-image").src = "images/victory.gif"
        }else if(result === "lose"){
            defeat.play()
            document.querySelector("#result-image").src = "images/defeat.gif"
        }
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
    start()
    gameBegin()
    })

gameBegin = () =>{
    //intervals for game
    gameInt = setInterval(game.gameUpdate, 10)
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


//function to start the game
start= () =>{
    if(document.querySelector("#result").style.display = "flex"){
        document.querySelector("#result").style.display = "none"
        document.querySelector("#game-container").style.display = "block"
    }
    game.myShip = null
    game.myEnemies = []
    game.myLasers = []
    scoreboard.style.fontSize = "100%"
    stats.style.alignItems = "flex-start"
}