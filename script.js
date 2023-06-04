// Tic-Tac-Toe Script
// Global Variable
const spaces = document.querySelectorAll('.space');

// Gameboard Object Module
const gameBoard = (() => {
    // Store gameboard inside an array
    let board = [
        'X','X','X',
        'O','O','O',
        'X','X','X'
    ];

    let renderBoard = () => {
        const spaces = document.querySelectorAll('.space');
        let i = 0
        spaces.forEach((space) => {
            space.textContent = board[i]
            ++i
        })
    }

    return {board, renderBoard}
})()

// Player Object -- Factory Function
const Player = (name, marker) => {
    addMark = () => {
        
    }
    return {name, marker}
}

// Game Logic Object Module
const game = (() => {
    // ADD EVENT LISTENER TO THE SPACES TO RUN Player.addMark() 
})()

// TEMP
gameBoard.renderBoard()