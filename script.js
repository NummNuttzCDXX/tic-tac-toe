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

    const getEmptySpaces = () => {
        let emptySpaces = []; // Define array to hold indices of empty spaces
        for (let i = 0; i < board.length; ++i) { // Loop through board
            // If space is empty, add the index to the array
            if (board[i] === '') {
                emptySpaces.push(i)
            }
        }

        return emptySpaces;
    }

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
                // This function only runs when a space is clicked
                // so we cant do the ai's turn in this function
                // Only multiplayer
                if (player2.ai) {
                    return
                } else {player2.addMark(space);}
            }
            game.makeMove()
        } else {
            alert('Space Taken!!')
        }
    }

    return { board, renderBoard, listener, getEmptySpaces }
})()

// Player Object -- Factory Function
const Player = (name, marker, num) => {
    let score = 0

    let addMark = (space) => {
        try {
            const ind = space.getAttribute('data') - 1;
            gameBoard.board[ind] = marker
            space.textContent = marker
        } catch (error) {
            if (space === null) throw 'No empty spaces';
        }
        

        if (num === 1) {
            game.turn = 2
        } else if (num === 2) {
            game.turn = 1
        }
    }

    return { name, marker, addMark, score }
}

const Computer = (name, marker, num, dif) => {
    const prototype = Player(name, marker, num) // This allows Computer to inherit from Player -- Setting proto to Player object

    const ai = true; // Give property of ai to test if player is an ai

    const minimax = (board, player) => {
        // Get empty spaces
        let emptySpaces = gameBoard.getEmptySpaces()

        // Check for Terminal States such as win, lose, or tie and return a value accordingly
        if (game.winCheck(board, player1.marker)) { // if player1 wins, sets the space score to -10
            return {score: -10}
        } else if (game.winCheck(board, player2.marker)) {
            return {score: 10}
        } else if (emptySpaces.length === 0) { // If no more empty spaces set the space score to 0
            return {score: 0}
        }

        // An array to collect all the move Objects
        let moves = [];

        // Loop through empty spots
        for (let i = 0; i < emptySpaces.length; i++) {
            // Create an Object for each and store the index of that spot
            let move = {}
            // move.index = board[emptySpaces[i]]; // This sets index property of move{} to the value of the emptySpace indice
            move.index = emptySpaces[i]

            // Set the empty space to the current player marker
            board[emptySpaces[i]] = player.marker
            
            /* Collect the score resulted from calling minimax
               on the oponent of the current player */
            if (player === player2) {
                let result = minimax(board, player1)
                move.score = result.score
            } else if (player === player1) {
                let result = minimax(board, player2) 
                move.score = result.score
            }

            // Reset the spot to empty
            board[emptySpaces[i]] = ''

            // Push the Object to the Array
            moves.push(move)
        }

        // If it is the computers turn loop over the moves and choose the move with the highest score
        let bestMove;
        if (player === player2) {
            let bestScore = -Infinity
            for (let i = 0; i < moves.length; ++i) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score
                    bestMove = i
                }
            }
        } else if (player === player1) { // If it is the users turn choose the move with lowest score
            let bestScore = Infinity
            for (let i = 0; i < moves.length; ++i) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score
                    bestMove = i
                }
            }
        }

        // Return the chosen move (object) from the moves array
        return moves[bestMove]
    }

    const getRandomNumber = (x) => {
        return Math.floor(Math.random() * x); // Get random number from 0 to x
    }

    const getSpace = () => {
        let index = minimax(gameBoard.board, player2).index;
        let space = document.querySelector('.space[data="' + (index + 1) + '"')
        return space
    }

    const takeTurn = () => {
        if (dif === 0) {
            setTimeout(() => {
                // Get the indices of the empty spaces
                const emptySpaces = gameBoard.getEmptySpaces();
                /* Get the number of empty spaces there are
                and choose a random number up to num of empty
                then choose that number in the array */
                let index = emptySpaces[getRandomNumber(emptySpaces.length - 1)];
                let space = document.querySelector('.space[data="' + (index + 1) + '"]')

                player2.addMark(space)
                game.makeMove()
            }, 500)
            
        } else if (dif === 1) { // Impossible
            // Run this code after 500 millisecond delay -- To simulate thinking
            setTimeout(() => {
                player2.addMark(getSpace())
                game.makeMove()
            }, 500)
        }
    }

    // Assign all the properties of proto to Comp plus adding object with Comp's own properties like usual
    return Object.assign({}, prototype, {ai, dif, takeTurn})
}

// Game Logic Object Module
const game = (() => {
    // This will be equal to which players turn it is -- Player 1 starts
    let turn = 1,
        playing = true, // Is the game over?
        times = 0;

    let createPlayers = () => {
        const vs = document.querySelector('.menu input:checked')
        if (vs.id === 'mult') {
            // Initialize player2 Object
            player2 = Player('Player 2', 'O', 2)
        } else if (vs.id === 'ai') {
            // This will get the index of the selected difficulty option
            const dif = document.querySelector('select').selectedIndex;

            // Initialize player2 Computer Object
            player2 = Computer('Computer', 'O', 2, dif)

            // Set the name input to be object name
            const p2Name = document.getElementById('name-2')
            p2Name.value = player2.name

            // Remove edit Icon next to Computer name
            const p2Icon = document.querySelector('#name-2 + img')
            p2Icon.style.visibility = 'hidden'
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
        turn = 0
        updateScoreboard(player)
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
        if (times === 0) {createPlayers(); times += 1} else times += 1
        gameBoard.renderBoard()
    }

    const makeMove = () => {
        if (!playing) return; // If the game is not playing, exit the function

        // If player2 is a computer and its computers turn -- Computer plays
        if (player2.ai && game.turn === 2) {
            player2.takeTurn()
        }

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

    const updateScoreboard = (winner) => {
        // Get Player containers to hold name/score
        const p1 = document.querySelector('.player1'),
        p2 = document.querySelector('.player2'),
        tie = document.querySelector('.tie')

        // Show player names on the board
        p1.textContent = player1.name + ':';
        p2.textContent = player2.name + ':';

        if (winner === player1.name) {
            player1.score += 1
            p1.textContent += ' ' + player1.score;
            p2.textContent += ' ' + player2.score;
        } else if (winner === player2.name) {
            player2.score += 1
            p2.textContent += ' ' + player2.score;
            p1.textContent += ' ' + player1.score;
        } else {
            scoreTie += 1
            tie.textContent = 'Tie: '
            tie.textContent += scoreTie
            tie.style.display = 'block'
            p1.textContent += ' ' + player1.score;
            p2.textContent += ' ' + player2.score;
        }

        score1 = player1.score
        score2 = player2.score
    }

    return { newGame, turn, makeMove, winCheck }
})()

// Game starts when button is pressed
playBtn.addEventListener('click', game.newGame)

// Change player names when the inputs change
const names = document.querySelectorAll('.player-names input');
names.forEach((input) => {
    if (input.id === 'name-1') {
        input.addEventListener('change', () => {
            player1.name = input.value
            document.querySelector('.player1').textContent = input.value + ': ' + score1
            if (input.value === '') {document.querySelector('.player1').textContent = 'Player 1'}
        })
    } else if (input.id === 'name-2') {
        input.addEventListener('change', () => { 
            player2.name = input.value
            document.querySelector('.player2').textContent = input.value + ': ' + score2
            if (input.value === '') {document.querySelector('.player2').textContent = 'Player 2'}
        })
    }
})

// Define player
let player1 = Player('Player 1', 'X', 1),
player2,
score1 = 0,
score2 = 0,
scoreTie = 0