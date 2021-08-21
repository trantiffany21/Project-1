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
            this.xPos = 800
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