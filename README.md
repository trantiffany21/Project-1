# STARFIGHTER

> https://trantiffany21.github.io/Starfighter/

## Description
:space_invader:Starfighter is a space-themed web game where a player flies a spaceship, avoids enemies, and shoots at enemy spaceships. A scoreboard maintains the players score. The game will continue until the level is complete, and the boss has been defeated, or the player dies once their health reaches 0. A restart option is available. The player will have a starting health of 1000 and the player will use arrow keys to fly and the spacebar to shoot. :space_invader:

#### Health Stats

> :hospital: Starting Health = 1000 health
>
> :boom: 1 enemy laser hit = **-20 health**
>
> :space_invader: enemy ship hit = **-100 health**
> 
> :skull_and_crossbones: 1 boss ship hit = **instant death**

#### Score System

> :space_invader: 1 opponent destroyed = **+100 point**
> 
> :boom: 1 boss hit = **+20 points**

#### Player Controls
> :arrow_up: Up Arrow: Move Ship Up
> 
> :arrow_right: Up Arrow: Move Ship Right
> 
> :arrow_down: Up Arrow: Move Ship Down
> 
> :arrow_left: Up Arrow: Move Ship Left

> :rocket: Spacebar: Shoot laser at enemy


## Wire Frames
**Starting Screen**

![](https://cdn.discordapp.com/attachments/580937803869716480/874795917478330398/Untitled_Artwork.png)

**Gameplay**

![](https://cdn.discordapp.com/attachments/580937803869716480/874798726726701156/Untitled_Artwork.png)



## User Stories


### MVP Goals
- As a player, I want my game to shoot and land shots accurately so that the scoring is done correctly. :white_check_mark:
- As a player, I want my spaceship to be easy enough to control on first use. :white_check_mark:
- As a player, I want my game to fit the themes and be visually stimulating. :white_check_mark:
- As a player, I want my game to have both visual and audio cues to make the game exciting. :white_check_mark:

### Stretch Goals
- As a player, I would like to be able to move backwards and forwards. :white_check_mark:
- As a player, I would like to explode upon dying from enemy hits. :white_check_mark:
- As a player, I would like to have a final boss to defeat (added). :white_check_mark:

> Upcoming features
>> - As a player, I would like to have obstacles that interfere with flying to make the game more difficult. 
>> - As a player, I would like a 2 player option to play against someone on the same keyboard
>> - As a player, I would like to be able to choose my spaceship design.


### Technology Used and Approaches
- The game was created using Javascript, HTML, and CSS
- The Canvas API was primarily used to animate the objects to ensure smooth animation and gameplay
- A game object stores methods of the game and functionality of scoring, checking results, and updating the game movement
- 3 classes were used to create the ship, enemy ships, and lasers within the gameplay
- Audio files were also used for audio cues

### Inspiration
I made this web game to learn and explore the Canvas API and animation capabilities. I was inspired by retro arcade spaceship games and wanted to put my own spin with classic movie references. 

###### Credit
> Sound effects and music obtained from [zapsplat.com](https://www.zapsplat.com).
