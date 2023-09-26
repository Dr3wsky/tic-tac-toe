# The Odin Project - JavaScript Fullstack Pathway

## Project: Library

A tic-tac-toe game build with **JavaScript**, **HTML** and **CSS**.
This project is from the Odin Project's Full Stack Develloper [curriculum](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe).

🔗 **Live preview** of the project is [here](https://dr3wsky.github.io/tic-tac-toe/) :point_left:

### Overview

#### **Features:**

- Gameplay is initialized with the **REPLAY** button which creates a new **gameBoard** array and **Player** class instances.
- **Player** instances store the number and marker for each player.
- Each placement checks the **gameBoard** array if the square is empty, places the player marker and checks for win or cat's game.
- The **gameControl** module stores round counts and game status within the closure to keep the global scope clean.
- Upon end of game (win or cat's game), the winning squares are highlighted and prompt announces the winner. Game can then be re-started with cleared **gameBoard** and new **player** class instances.

#### **New Tools:**

- JavaScript **Factory Functions** and **Module** pattern to retain information within closures and clear of global scope.
- Function assignment to variables in support of the module pattern.
- Similar dev tools as sued in the Library project, with more emphasis on clean code and **Single Responsibility** (**S**OLID principles)

#### **SKills & Learnings:**

- Continued using **ESLint** and **Prettier** to support devellopment environment with custom rules configuration.
- First time using **Factory Functions** and **Module** pattern to keep global scope free.
- Implemented **CSS _grid_** as design tool to support the gameboard display.
