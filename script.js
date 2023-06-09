// Tic-Tac-Toe Script

// Global Variable
const playBtn = document.querySelector('.play');

// Gameboard Object Module
const gameBoard = (() => {
    // Store gameboard inside an array
    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    const spaces = document.querySelectorAll('.space');

    let renderBoard = () => {
        let i = 0
        spaces.forEach((space) => {
            space.textContent = board[i]
            ++i
        })
        let container = document.querySelector('.game-container');
        container.style.display = 'grid'

        let names = document.querySelector('.player-names')
        names.style.display = 'flex'
    }

    // Module within a Module
    const listener = (() => {
        // This almost pointless function just makes it easier to add and remove the listener since it needs an argument
        function anonymous () {
            checkTaken(this)
        }

        const add = () => {
            spaces.forEach((space) => {
                space.addEventListener('click', anonymous)
            })

        }

        const remove = () => {
            spaces.forEach((space) => {
                space.removeEventListener('click', anonymous)
            })
        }

        return {add, remove}
    })()


    const checkTaken = (space) => {
        let ind = space.getAttribute('data');
        if (gameBoard.board[ind - 1] === '') {
            if (game.turn === 1) {
                player1.addMark(space);
            } else if (game.turn === 2) {
                player2.addMark(space);
            }
            game.makeMove()
        } else {
            alert('Space Taken!!')
        }
    }

    return { board, renderBoard, listener }
})()

// Player Object -- Factory Function
const Player = (name, marker, num) => {
    let addMark = (space) => {
        const ind = space.getAttribute('data') - 1;
        gameBoard.board[ind] = marker
        space.textContent = marker

        if (num === 1) {
            game.turn = 2
        } else if (num === 2) {
            game.turn = 1
        }
    }

    return { name, marker, addMark }
}

const Computer = (name, marker, num) => {
    const prototype = Player(name, marker, num) // This allows Computer to inherit from Player -- Setting proto to Player object

    const minimax = () => {
        
    }

    // Assign all the properties of proto to Comp plus adding object with Comp's own properties like usual
    return Object.assign({}, prototype, {minimax})
}

// Game Logic Object Module
const game = (() => {
    // This will be equal to which players turn it is -- Player 1 starts
    let turn = 1,
        playing = true // Is the game over?

    let createPlayers = () => {
        const vs = document.querySelector('.menu input:checked')
        if (vs.id === 'mult') {
            // Initialize player2 Object
            player2 = Player('Player 2', 'O', 2)
        } else if (vs.id === 'ai') {
            // Initialize player2 Computer Object
            player2 = Computer('Computer', 'O', 2)
            // Set the name input to be object name
            const p2Name = document.getElementById('name-2')
            p2Name.value = player2.name

            // Remove edit Icon next to Computer name
            const p2Icon = document.querySelector('#name-2 + img')
            p2Icon.style.display = 'none'
            p2Name.disabled = true
        }
    }

    const checkTurn = () => {
        if (game.turn === 1) {
            gameBoard.checkTaken(player1)
        } else if (game.turn === 2) {
            gameBoard.checkTaken(player2)
        }
    }

    // Now Checks if a particular player wins or loses and returns true or false
    let winCheck = (board, player) => {
        if (
            (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
            ) {
            return true;
        } else {
            return false;
        }
    }

    let gameOver = (player) => {
        gameBoard.listener.remove()
        alert(player + ' wins!!')
        playing = false
    }

    // This will start a new game
    let newGame = () => {
        gameBoard.listener.add()

        // Make menu disapear
        const menu = document.querySelector('.menu')
        menu.style.display = 'none'

        // Reset 
        gameBoard.board.fill('')
        game.turn = 1
        playing = true

        // Game
        createPlayers()
        gameBoard.renderBoard()
    }

    const makeMove = () => {
        if (!playing) return; // If the game is not playing, exit the function

        // Check for winner
        if (winCheck(gameBoard.board, player1.marker)) {
            gameOver(player1.name)
        } else if (winCheck(gameBoard.board, player2.marker)) {
            gameOver(player2.name)
        } else if (!gameBoard.board.includes('')) {
            gameOver('Cat')
        }

        if (!playing) return; // If the game is not playing after winCheck, exit the function

    };

    return { newGame, turn, makeMove, winCheck }
})()

// Game starts when button is pressed
playBtn.addEventListener('click', game.newGame)

// Change player names when the inputs change
const names = document.querySelectorAll('.player-names input');
names.forEach((input) => {
    if (input.id === 'name-1') {
        input.addEventListener('change', () => { player1.name = input.value })
    } else if (input.id === 'name-2') {
        input.addEventListener('change', () => { player2.name = input.value })
    }
})

// Define player
let player1 = Player('Player 1', 'X', 1),
player2;