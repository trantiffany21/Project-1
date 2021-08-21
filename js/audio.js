//audio files
class Sound{
    constructor(){
        this.song = new Audio('sounds/song.mp3')
        this.defeat = new Audio('sounds/defeat.mp3')
        this.xWingLaser = new Audio('sounds/x-wing-laser.mp3')
        this.tieFighterLaser = new Audio('sounds/tie-fighter-laser.mp3')
        this.deathStarBeam = new Audio('sounds/death-star-beam.mp3')
        this.imperialTheme = new Audio('sounds/imperial_march.mp3')
        this.rebelTheme = new Audio('sounds/rebel-theme.mp3')
        this.shipExplosion = new Audio('sounds/ship-hit.mp3')
        this.explosion = new Audio('sounds/explosion.mp3')
        this.setSounds()
        this.resetSounds()
    }
    setSounds(){
        this.song.loop = true
        this.defeat.volume = .3
        this.xWingLaser.volume =.7
        this.tieFighterLaser.volume =.7
        this.imperialTheme.loop = true
        
    }
    resetSounds(){
        this.defeat.currentTime = 0
        this.xWingLaser.currentTime = 0
        this.tieFighterLaser.currentTime = 0
        this.deathStarBeam.currentTime = 0
        this.imperialTheme.currentTime = 0
        this.rebelTheme.currentTime = 0
        this.shipExplosion.currentTime = 0
        this.explosion.currentTime = 0
        this.defeat.pause()
        this.xWingLaser.pause()
        this.tieFighterLaser.pause()
        this.deathStarBeam.pause()
        this.imperialTheme.pause()
        this.rebelTheme.pause()
        this.shipExplosion.pause()
        this.explosion.pause()
    }
}