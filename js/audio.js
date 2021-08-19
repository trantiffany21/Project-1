//audio files

let song = new Audio('sounds/song.mp3')
song.loop = true
let win = new Audio('sounds/win.mp3')
let defeat = new Audio('sounds/defeat.mp3')
let xWingLaser = new Audio('sounds/x-wing-fighter.mp3')
xWingLaser.volume = .5
let tieFighterLaser = new Audio('sounds/tie-fighter-laser.mp3')
let shipExplosion = new Audio('sounds/ship-hit.mp3')
explosion = () =>{
    let audio1 = new Audio('sounds/explosion.mp3')
    audio1.play()
}