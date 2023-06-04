// Tic-Tac-Toe Script

// Gameboard Object Module
const Game = (() => {
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
const Player = () => {

}