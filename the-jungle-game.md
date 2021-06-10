# The Jungle

**Writer: Jenny C**

# Table of contents

- [Story Overview](#Story-Overview)
- [Game Controls](#Game-Controls)
- [Third party applications](#Third-party-applications)
- [Scenes](#Scenes)
- [HUD system](#HUD-system)
- [Player characters](#Player-characters)
  - [Player](#Player)
  - [Enemies](#Enemies)
- [Player skills](#Player-skills)
- [Health](#Health)
- [Scoring](#Scoring)

## Story Overview

Tyga go to an adventure in the jungle to find treasure chests In the uphill journey to find the tresure, Tyga will face some obstacles and enemies that he have to avoid or kill. He will gain coins through the way to the tresure chest of each level and doble points when he kill the jungle's monsters. 

## Game Controls

![image]()

- Use arrow keys to move Tyga
- Space bar to jump
  
### Third party applications

- Phaser framework
- JavaScript ES6 Modules
- HTML5
- Webpack
- Babel
- Phaser


## Scenes
- **Opening scene** It displays a form to fill in your name, a play button, and the jungle image as a background

![Homepage Screenshot]()

- **Main Scene**.- The player's helicopter shows up in the middle and then enemy jets start entering the air space with their bombs
- **Game Over**.- When the player's helicopter is hit, the game over scene will show up. It displays your score, as well as options to play again or view the leaderboard.
- **Leader board**.- Display only the top 5 gamers. From here, you have an option to play again.

## HUD system 
There's no any health status, but we could see a score displaying each time player explode or kill an enemy 

## Player characters
  ### Player
    
 ![Player's image]()

  This is the player, called Tyga, designed to move all over directions

  ### Enemies

  **Enemy 1**

 ![Enemy 1 : Gorila](./assets/)

  It will be coming down towards Tyga, throwing coconuts and stones.

  **Enemy 2**

 ![Enemy 2](./assets/)

  It will be coming down towards Tyga,throwing coconuts and stones.

  
## Player skills


**Player**.- Moves in any directions around the game scene, he can do a double jump and he can use his sword against the enemies.

**Enemy 1 and 2**.- Can accelerate and throw coconuts and stone agains the player

## Health 

**Player**.- Dies with 3 coconuts and stones, have one life and game ends

**Enemy 1 and 2**.-Dies, turns read and disappear once it is hit

## Scoring

  The player scores 0.05 points once they destroy the enemy bombs; whereas, when the player shoots down a jet, 0.1 points are scored.