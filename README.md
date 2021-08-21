# STARFIGHTER

> https://trantiffany21.github.io/Starfighter/

## Description
Starfighter is a space-themed web game where a player flies a spaceship and shoots at enemy spaceships. A scoreboard maintains the players score. The game will continue until the level is complete, and the boss has been defeated, or the player dies once their health reaches 0. A restart option is available. The player will have a starting health of 1000 and the player will use arrow keys to fly and the spacebar to shoot. 

#### Health Stats

>- Starting Health = 1000 health
>- 1 enemy laser hit = **-20 health**
>- 1 enemy ship hit = **-100 health**
>- 1 boss ship hit = **instant death**

#### Score System

>- 1 opponent destroyed = **+100 point**
>- 1 boss hit = **+20 points**


## Wire Frames
**Starting Screen**

![](https://cdn.discordapp.com/attachments/580937803869716480/874795917478330398/Untitled_Artwork.png)

**Gameplay**

![](https://cdn.discordapp.com/attachments/580937803869716480/874798726726701156/Untitled_Artwork.png)



## User Stories


### MVP Goals
- As a player, I want my game to shoot and land shots accurately so that the scoring is done correctly.
- As a player, I want my spaceship to be easy enough to control on first use.
- As a player, I want my game to fit the themes and be visually stimulating.
- As a player, I want my game to have both visual and audio cues to make the game exciting.

### Stretch Goals
- As a player, I would like to be able to move backwards and forwards.
- As a player, I would like to have obstacles that interfere with flying to make the game more difficult.
- As a player, I would like a 2 player option to play against someone on the same keyboard
- As a player, I would like to be able to choose my spaceship design.
- As a player, I would like to explode upon dying from enemy hits.


### Technology Used and Approaches
- The game was created using Javascript, HTML, and CSS
- The Canvas API was primarily used to animate the objects to ensure smooth animation and gameplay
- A game object stores methods of the game and functionality of scoring, checking results, and updating the game movement
- 3 classes were used to create the ship, enemy ships, and lasers within the gameplay
- Audio files were also used for audio cues

###### Credit
> Sound effects and music obtained from [zapsplat.com](https://www.zapsplat.com).
