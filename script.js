// Tic-Tac-Toe Script
// Global Variable
const spaces = document.querySelectorAll('.space')

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
    let winCheck = () => {
        if (gameBoard.board[0] === gameBoard.board[1] && gameBoard.board[1] === gameBoard.board[2]) { // Check top row
            if (gameBoard.board[0] === player1.marker) {
                gameOver(player1.name)
            } else if (gameBoard.board[0] === player2.marker) {
                gameOver(player2.name)
            }
        } else if (gameBoard.board[0] === gameBoard.board[3] && gameBoard.board[3] === gameBoard.board[6]) { // Check left side
            if (gameBoard.board[0] === player1.marker) {
                gameOver(player1.name)
            } else if (gameBoard.board[0] === player2.marker) {
                gameOver(player2.name)
            }
        } else if (gameBoard.board[0] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[8]) { // Check diagonal right
            if (gameBoard.board[0] === player1.marker) {
                gameOver(player1.name)
            } else if (gameBoard.board[0] === player2.marker) {
                gameOver(player2.name)
            }
        } else if (gameBoard.board[3] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[5]) { // Check middle row
            if (gameBoard.board[3] === player1.marker) {
                gameOver(player1.name)
            } else if (gameBoard.board[3] === player2.marker) {
                gameOver(player2.name)
            }
        } else if (gameBoard.board[6] === gameBoard.board[7] && gameBoard.board[7] === gameBoard.board[8]) { // Check bottom row
            if (gameBoard.board[6] === player1.marker) {
                gameOver(player1.name)
            } else if (gameBoard.board[6] === player2.marker) {
                gameOver(player2.name)
            }
        } else if (gameBoard.board[1] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[7]) { // Check middle column
            if (gameBoard.board[1] === player1.marker) {
                gameOver(player1.name)
            } else if (gameBoard.board[1] === player2.marker) {
                gameOver(player2.name)
            }
        } else if (gameBoard.board[2] === gameBoard.board[5] && gameBoard.board[5] === gameBoard.board[8]) { // Check right column
            if (gameBoard.board[2] === player1.marker) {
                gameOver(player1.name)
            } else if (gameBoard.board[2] === player2.marker) {
                gameOver(player2.name)
            }
        } else if (gameBoard.board[2] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[6]) { // Check diagonal left
            if (gameBoard.board[2] === player1.marker) {
                gameOver(player1.name)
            } else if (gameBoard.board[2] === player2.marker) {
                gameOver(player2.name)
            }
        }
    }

    let gameOver = (player) => {
        alert(player + ' wins!!')
    }

    return {winCheck}
})()

// TEMP
gameBoard.renderBoard()
let player1 = Player('Player 1', 'X')