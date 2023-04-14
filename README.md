# Project's name

[Click here to see deployed game](https://sarahpst.github.io/game/)

## Description

Poopy Game is a game where the player has to eat all the food by moving on the different plateforms without being killed by an ennemy.

After eating a certain number of food a text on the screen inform the player that his stomach is full.
To empty his stomach and continue the game a go to the poopzone is mandatory.

When the game end, the player is informed of hiw win or lose, his score appears and a button to restart the game is displayed.

## MVP

- Game has one player that moves vertically and horizontally.
- Game has four plateforms.
- Game has food on the plateform.
- Game has a timer
- Game has a score
- Player can poop by pressing a key
- Game has a measuring tool for poop (stomach)depending on the score(the food eaten).
- Eating more food than the stomach capacity max will end the game.
- Timer at 0 will end the game.
- All food eaten/ score at its max will end the game.
- Reload time.
- Reload score.
- Reload stomach.

## Backlog

_List of features you might implement after the MVP_

- Game has a player choice + player can enter its name.
- Game has food that appear randomly on the plateforms.
- Game has enemies that appear randomly on the plateforms.
- Player can poop only on a certain plateform/poopzone.
- At the end of the game : win window and gameOver window + restart button + Name.
- sound added during click on button, jump, poop, eat, endgame's windows.

## Data structure

_List of classes and methods_

class bloc

- drawImage()

class player

- goLeft ()
- goRight ()
- goUp ()
- goDown ()
- drawImage ()
- drawScore ()
- eatFood ()
- drawStomach ()
- doPoop ()
- drawPoop ()
- win ()
- gameOver()

class food

- drawImage ()

class poop

class ennemy

- goLeft ()
- goRight ()
- drawImage ()
- killPlayer()
- move()

## States y States Transitions

_List of states (views) of your game_
- Screen1 => intro
- Screen2 => create a player
- Screen3 => game
- Screen4 => win or gameOver window

## Links

- [Slides Link](https://docs.google.com/presentation/d/17jbwiZKHieGNFMV_hjvmLGIvan5fAPXQU5donFFny60/edit#slide=id.g22dd756ec6a_1_46)
- [Github repository Link](https://github.com/sarahpst/PoopyGame)
- [Deployment Link](https://sarahpst.github.io/PoopyGame/)
