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

    let addListeners = (player) => {                               // Use an anonymous function that calls a function to run a function with a parameter
        spaces.forEach((space) => {space.addEventListener('click', function() {
            if (space.textContent === 'X' || space.textContent === 'O') {
                alert('Space taken!')
            } else {
                player.addMark(space)
            }
        })})
    }

    return {board, renderBoard, addListeners}
})()

// Player Object -- Factory Function
const Player = (name, marker) => {
    let addMark = (space) => {
        space.textContent = marker
    }
    return {name, marker, addMark}
}

// Game Logic Object Module
const game = (() => {

})()

// TEMP
gameBoard.renderBoard()
player1 = Player('Player 1', 'X')