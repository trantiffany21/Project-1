
//game object
const game = {
    myShip: null,
    canvas: document.querySelector("#game-container"),
    ctx: document.querySelector("#game-container").getContext('2d'),
    myEnemies: [],
    enemyCount: 0,
    myLasers: [],
    enemyLasers: [],
    finalLevel: 0,
    upPressed: false,
    downPressed: false,
    leftPressed: false,
    rightPressed: false,
    gameWon: false,
    //reset game object
    reset: ()=>{
        game.myShip = null
        game.canvas = document.querySelector("#game-container")
        game.ctx = document.querySelector("#game-container").getContext('2d')
        game.myEnemies = []
        game.enemyCount = 0
        game.myLasers = []
        game.enemyLasers = []
        game.finalLevel = 0
        game.upPressed = false
        game.downPressed = false
        game.leftPressed = false
        game.rightPressed = false
        game.gameWon = false
    },
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
    //spawns the enemy
    spawnEnemy: () =>{
        if(gameStart === true){
            game.myEnemies.push(new EnemyShip("tie fighter"));
            game.enemyCount++
            let newEnemy = game.myEnemies[game.myEnemies.length-1]
            game.enemyLasers.push(new Laser(newEnemy.xPos, newEnemy.yPos+50))
            sound.tieFighterLaser.play()
            game.myEnemies.forEach((x)=>{
                if(x.xPos <0){
                    game.myEnemies.shift()
                }
            })
            // console.log(game.myEnemies)
        }
    },
    //spawns the boss Death Star
    spawnDeathStar: () =>{
        if(game.gameWon === false && game.finalLevel===0 && game.enemyCount>2){
            sound.imperialTheme.play()
            game.myEnemies.push(new EnemyShip("death star"));
            game.finalLevel++
            enemyInt = setInterval(game.deathStarLaserSpawn,2000)
            console.log("level: " + game.finalLevel)
            console.log("enemy: " + game.enemyCount)
        }
    },
    //function to draw enemy ships and update location as they move
    drawEnemy: ()=>{
        if (game.canvas.getContext) {
            
            for(let i = 0; i< game.myEnemies.length; i++){
                if(game.myEnemies[i].type === "tie fighter"){
                    game.imgEnemy = document.querySelector("#tie-fighter")
                    game.myEnemies[i].xPos-=1
                }else if(game.myEnemies[i].type === "death star"){
                    game.imgEnemy = document.querySelector("#death-star")
                    if(game.myEnemies[i].xPos >=550){
                        game.myEnemies[i].xPos-=1
                    }else if(game.myEnemies[i].xPos<550){
                        game.myEnemies[i].enemyMove()
                    }
                }
                game.ctx.drawImage(game.imgEnemy,game.myEnemies[i].xPos,game.myEnemies[i].yPos ,game.myEnemies[i].width,game.myEnemies[i].height)
            }
        }
    },
    //function to draw lasers and update location as they move
    drawLasers: ()=>{
        if (game.canvas.getContext) {
            game.imgMyLaser = document.querySelector("#x-wing-laser")
            for(let i = 0; i< game.myLasers.length; i++){
                game.myLasers[i].xPos+=1
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
                if(game.myEnemies.length>0 &&game.myEnemies[0].type === "death star"){
                    game.enemyLasers[j].yPos+=.75
                }
                game.ctx.drawImage(game.imgEnemyLaser,game.enemyLasers[j].xPos,game.enemyLasers[j].yPos,game.enemyLasers[j].width,game.enemyLasers[j].height)
                
            }
        }
    },
    deathStarLaserSpawn: ()=>{
        sound.deathStarBeam.play()
        const i = game.myEnemies.length-1
        game.enemyLasers.push(new Laser(game.myEnemies[i].xPos, game.myEnemies[i].yPos+50))
        game.enemyLasers.push(new Laser(game.myEnemies[i].xPos+10, game.myEnemies[i].yPos+49.5))
        game.enemyLasers.push(new Laser(game.myEnemies[i].xPos+20, game.myEnemies[i].yPos+49))
        game.enemyLasers.push(new Laser(game.myEnemies[i].xPos+30, game.myEnemies[i].yPos+48.5))
        game.enemyLasers.push(new Laser(game.myEnemies[i].xPos+40, game.myEnemies[i].yPos+48))
        game.enemyLasers.push(new Laser(game.myEnemies[i].xPos+50, game.myEnemies[i].yPos+47.5))
        game.enemyLasers.push(new Laser(game.myEnemies[i].xPos+60, game.myEnemies[i].yPos+47))
        
    },
    //draw explosion
    drawExplosion: (x,y,w,h)=>{
        let i =0
        if (game.canvas.getContext) {
            game.imgExplosion = document.querySelector('#explosion')
            const explodeInt = setInterval(()=>{
                game.ctx.drawImage(game.imgExplosion,x,y,w,h)
                i++
                if(i>100){
                    clearInterval(explodeInt)
                }
            },10)
            
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
            }else if(e.key == "Left" || e.key == "ArrowLeft") {
                game.leftPressed = true;
            }else if(e.key == "Right" || e.key == "ArrowRight") {
                game.rightPressed = true;
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
            }else if(e.key == "Left" || e.key == "ArrowLeft") {
                game.leftPressed = false;
            }else if(e.key == "Right" || e.key == "ArrowRight") {
                game.rightPressed = false;
            }
            if(e.keyCode ==32){
                game.spacePressed = false;
            }
        }
    }, 
    //collision detection function to detect if lasers hit
    collisionDetect: () =>{

        //check for collisions between myLasers and myEnemies ships
        for(let i = 0; i< game.myLasers.length; i++){
            let myLaser = game.myLasers[i]
            for(let j = 0; j< game.myEnemies.length; j++){
                let enemyShip =  game.myEnemies[j]
                if(enemyShip.type === "death star"){
                    if(game.objIntersect(enemyShip.xPos, enemyShip.yPos, enemyShip.width+25, enemyShip.height+25,myLaser.xPos, myLaser.yPos, myLaser.width+25, myLaser.height+25)){
                        sound.explosion.play()
                        game.myLasers.splice(i,1)
                        game.objCollision("laser", enemyShip, j)
                        game.destroyEnemy(enemyShip,j)
                    }
                }else{
                    if(game.objIntersect(myLaser.xPos, myLaser.yPos, myLaser.width, myLaser.height, enemyShip.xPos, enemyShip.yPos, enemyShip.width, enemyShip.height)){
                        sound.explosion.play()
                        game.myLasers.splice(i,1)
                        game.objCollision("laser", enemyShip, j)
                        game.destroyEnemy(enemyShip,j)
                    }
                }
            }
        }
        //check for collisions between myShip and myEnemies
        for(let j = 0; j< game.myEnemies.length; j++){
            let enemyShip =  game.myEnemies[j]
            //check if ship collides with enemy
            if(game.objIntersect(myShip.xPos, myShip.yPos, myShip.width-26, myShip.height-26, enemyShip.xPos, enemyShip.yPos, enemyShip.width-26, enemyShip.height-26)){
                sound.explosion.play()
                game.objCollision("ship", enemyShip, j)
            }
        }
        //check for collisions between myShip and enemyLasers
        for(let k = 0; k< game.enemyLasers.length; k++){
            let enemyLaser =  game.enemyLasers[k]
            //check if ship collides with enemy laser
            if(game.objIntersect(enemyLaser.xPos, enemyLaser.yPos, enemyLaser.width+11, enemyLaser.height, myShip.xPos, myShip.yPos, myShip.width+11, myShip.height)){
                sound.explosion.play()
                game.objCollision("laser", myShip, k)
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
    //function for object collision to reduce health
    objCollision: (attackObj, hitObj, index) =>{
        if(attackObj === "ship" && hitObj.type === "tie fighter"){
            game.myEnemies.splice(index,1)
            sound.shipExplosion.play()
            myShip.health-=1
            return false
        }else if(attackObj === "ship" && hitObj.type === "death star"){
            game.myEnemies.splice(index,1)
            sound.shipExplosion.play()
            myShip.health=0
            gameStart = false
            return false
        }else if(attackObj === "laser" && hitObj.type === "tie fighter"){
            hitObj.health-= myShip.attack
            console.log("health: "+ hitObj.health)
        }else if(attackObj === "laser" && hitObj.type === "death star"){
            hitObj.health-= myShip.attack
            game.addPoints()
            console.log("health: "+ hitObj.health)
        }else{
            hitObj.health-= myShip.attack
            console.log("my health: "+ hitObj.health)
        }
    },
    //function to check if enemy ship should be destroyed
    destroyEnemy: (enemyShip, index) =>{
        if(enemyShip.health <= 0){
            game.drawExplosion(enemyShip.xPos, enemyShip.yPos, enemyShip.width, enemyShip.height)
            game.myEnemies.splice(index,1)
            game.addPoints()
            if(enemyShip.type === "death star"){
                game.gameWon = true
                gameStart = false
            }
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
            myShip.yPos -= 2;
            if (myShip.yPos <-25){
                myShip.yPos = -25;
            }
        }
        else if(game.downPressed) {
            myShip.yPos += 2;
            if (myShip.yPos > game.canvas.height-game.imgShip.height+25){
                myShip.yPos = game.canvas.height-game.imgShip.height+25;
            }
        }else if(game.rightPressed){
            myShip.xPos +=2;
            if (myShip.xPos > game.canvas.width-game.imgShip.width+25){
                myShip.xPos = game.canvas.width-game.imgShip.width+25;
            }
        }else if(game.leftPressed){
            myShip.xPos -=2;
            if (myShip.xPos < -25){
                myShip.xPos = -25
            }
        }
        if(game.spacePressed){
            
            game.myLasers.push(new Laser(myShip.xPos+70,myShip.yPos+25))
            game.myLasers.push(new Laser(myShip.xPos+70,myShip.yPos+71))
            sound.xWingLaser.play()
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
    //clears the game canvas
    clearCanvas: () =>{
        game.ctx.clearRect(0,0,game.canvas.width, game.canvas.height)
    }, 
    //checks if the game was won and ends it
    checkResult: () =>{
        //console.log("checking")
        if(myShip.health <= 900){
            game.drawExplosion(myShip.xPos, myShip.yPos, myShip.width, myShip.height)
            console.log("You lost!")
            clearInterval(gameInt)
            clearInterval(enemyInt)
            game.endGameScreen("lose")
        }else if(game.enemyCount > 2 && game.gameWon === false && game.finalLevel === 0){
            //if(game.finalLevel===0){
                clearInterval(enemyInt)
            //}
            setTimeout(game.spawnDeathStar,5000)
            // console.log("check")
        }else if(game.gameWon === true){
            console.log("You won!")
            gameStart = false
            clearInterval(gameInt)
            clearInterval(enemyInt)
            game.endGameScreen("win")
        }
    },
    //change window on win or loss
    endGameScreen: (result) =>{
        const end = setTimeout(()=>{
            sound.song.pause()
            game.clearCanvas()
            document.querySelector("#result").style.display = "flex"
            document.querySelector("#result-image").style.display = "block"
            document.querySelector("#game-container").style.display = "none"
            health.style.display = "none"
            scoreboard.style.fontSize = "25px"
            stats.style.alignItems = "center"
            startBtn.innerHTML = "Restart"
            document.querySelector("#buttons").appendChild(startBtn)
            if(result === 'win'){
                sound.imperialTheme.pause()
                sound.win.play()
                document.querySelector("#result-image").src = "images/victory.gif"
            }else if(result === "lose"){
                sound.imperialTheme.play()
                sound.defeat.play()
                document.querySelector("#result-image").src = "images/defeat.gif"
            }

        },1500)

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
    constructor(type){
        this.type = type
        this.setStats()
    }
    setStats(){
        if(this.type === "tie fighter"){
            this.health = 100
            this.yPos = this.getRandomY()
            this.xPos = 700
            this.width = 100
            this.height = 100
        }else if(this.type === "death star"){
            this.health = 500
            this.yPos = this.getRandomY()
            this.xPos = 700
            this.width = 200
            this.height = 200
            this.setDirection()
            this.movementSpeed = .5
        }
    }
    getRandomY(){
        if(this.type === "death star"){
            return Math.floor(Math.random()*10)+150
        }
        return Math.floor(Math.random()*450)
    }
    setDirection(){
        if(this.yPos>=250){
            this.vertical = "up"
            this.horizontal = "left"
        }else if(this.yPos<=250){
            this.vertical = "down"
            this.horizontal = "left"
        }
    }
    enemyMove(){
        if(this.vertical === "down"){
            this.yPos+=this.movementSpeed
            if(this.yPos >=Math.floor(Math.random()*250+300) ||this.yPos >= 350){
                this.vertical = "up"
                this.movementSpeed+=.1
            }
        }else if(this.vertical === "up"){
            this.yPos-=this.movementSpeed
            if(this.yPos <=0 || this.yPos <= Math.floor(Math.random()*50)){
                this.vertical = "down"
                this.movementSpeed+=.1
            }
        }
        if(this.horizontal === "left"){
            this.xPos-=this.movementSpeed
            if(this.xPos <=250){
                this.horizontal = "right"
                this.movementSpeed+=.1
            }
        }else if(this.horizontal === "right"){
            this.xPos+=this.movementSpeed
            if(this.xPos >=500){
                this.horizontal = "left"
                this.movementSpeed+=.1
            }
        }
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
let sound = new Sound()

//variable for intervals
let gameInt
let enemyInt

//start button 
const startBtn = document.querySelector("#start")
startBtn.addEventListener("click", () => {
    setGame()
    gameBegin()
    })

//function to setup the game
setGame= () =>{
    gameStart = false
    if(document.querySelector("#result").style.display = "flex"){
        document.querySelector("#result").style.display = "none"
        document.querySelector("#game-container").style.display = "block"
    }
    gameInt = null
    enemyInt = null
    sound.resetSounds()
    game.reset()
    scoreboard.style.fontSize = "100%"
    stats.style.alignItems = "flex-start"
    }
gameBegin = () =>{
    //intervals for game
    gameInt = setInterval(game.gameUpdate, 10)
    enemyInt = setInterval(game.spawnEnemy, 4000)
    game.createShip()
    startBtn.remove()
    health.style.display = "flex"
    scoreboard.style.display = "flex"
    sound.song.play()
}
//event listener for key presses
document.addEventListener("keydown", game.keyDownHandler, false)
document.addEventListener("keyup", game.keyUpHandler,false)

