const gameBoard = (() => {
    let board = ['', '', '', 
                 '', '', '', 
                 '', '', ''];
    return {board};
})();

const player = name => {
    const getName = () => name;
    const addMarker = boardSquare => {
        if(boardSquare.className === 'boardSquare') {
            boardSquare.textContent = name;
            gameBoard.board[Array.prototype.indexOf.call(displayController.boardSquares, boardSquare)] = name;
            boardSquare.classList.toggle('disabled');
            displayController.render();
            displayController.checkGameOver();
            if(!displayController.over) {
                displayController.switchPlayer();
            }
        }
    }
    return {getName, addMarker};
};

const displayController = (() => {
    const boardSquares = document.getElementsByClassName('boardSquare');
    const restart = document.getElementById('restart');
    const players = document.getElementsByClassName('player');
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const winner = document.getElementById('winner');
    const x = player('X');
    const o = player('O');
    let currentPlayer = x;
    let over = false;
    const render = () => {
        for(let i = 0; i < boardSquares.length; i++) {
            boardSquares[i].textContent = gameBoard.board[i];
        }
    };
    const switchPlayer = () => {
        if(currentPlayer.getName() === 'X') {
            player1.setAttribute('style', 'color: white; font-weight: normal;');
            currentPlayer = o;
            player2.setAttribute('style', 'color: chartreuse; font-weight: bold;');
        } else {
            player2.setAttribute('style', 'color: white; font-weight: normal;');
            currentPlayer = x;
            player1.setAttribute('style', 'color: chartreuse; font-weight: bold;');
        }
    }
    const restartGame = () => {
        if(over) {
            for(let i = 0; i < players.length; i++) {
                if(players[i].className === 'player hidden') {
                    players[i].classList.toggle('hidden');
                }
            }
            if(winner.className === 'winner') {
                winner.classList.toggle('hidden');
                winner.setAttribute('style', 'color: chartreuse;');
            }
        }
        for(let i = 0; i < gameBoard.board.length; i++) {
            gameBoard.board[i] = '';
            if(boardSquares[i].className === 'boardSquare disabled') {
                boardSquares[i].classList.toggle('disabled');
            }
            boardSquares[i].setAttribute('style', 'color: white;');
        }
        if(currentPlayer.getName() === 'O') {
            switchPlayer();
        }
        render();
    }
    const bind = () => {
        for(let i = 0; i < boardSquares.length; i++) {
            boardSquares[i].addEventListener('click', () => currentPlayer.addMarker(boardSquares[i]));
        }
        restart.addEventListener('click', restartGame);
    }
    bind();
    const checkGameOver = () => {
        over = false;
        for(let i = 0; i < 3; i++) {
            // check row
            let start = 3 * i;
            if(gameBoard.board[start] === 'X' || gameBoard.board[start] === 'O') {
                if(gameBoard.board[start] === gameBoard.board[start + 1] && gameBoard.board[start] === gameBoard.board[start + 2]) {
                    over = true;
                    gameWon(start, start + 1, start + 2);
                    break;
                }
            }
            // check column
            start = i;
            if(gameBoard.board[start] === 'X' || gameBoard.board[start] === 'O') {
                if(gameBoard.board[start] === gameBoard.board[start + 3] && gameBoard.board[start] === gameBoard.board[start + 6]) {
                    over = true;
                    gameWon(start, start + 3, start + 6);
                    break;
                }
            }
        }
        // check two diagonals
        if(!over) {
            let start = 0;
            if(gameBoard.board[start] === 'X' || gameBoard.board[start] === 'O') {
                if(gameBoard.board[start] === gameBoard.board[start + 4] && gameBoard.board[start] === gameBoard.board[start + 8]) {
                    over = true;
                    gameWon(start, start + 4, start + 8);
                }
            }
        }
        if(!over) {
            start = 2;
            if(gameBoard.board[start] === 'X' || gameBoard.board[start] === 'O') {
                if(gameBoard.board[start] === gameBoard.board[start + 2] && gameBoard.board[start] === gameBoard.board[start + 4]) {
                    over = true;
                    gameWon(start, start + 2, start + 4);
                }
            }
        }
        // check Tie
        if(!over) {
            if(gameBoard.board.every(boardSquare => (boardSquare === 'X' || boardSquare === 'O'))) {
                over = true;
                for(let i = 0; i < players.length; i++) {
                    players[i].classList.toggle('hidden');
                }
                winner.classList.toggle('hidden');
                winner.textContent = 'Tie!';
                winner.setAttribute('style', 'color: gold;');
            }
        }
    }
    const gameWon = (firstSquare, secondSquare, thirdSquare) => {
        if(gameBoard.board[firstSquare] === 'X') {
            winner.textContent = `${player1.textContent} is the winner!`;
        } else {
            winner.textContent = `${player2.textContent} is the winner!`;
        }
        for(let i = 0; i < players.length; i++) {
            players[i].classList.toggle('hidden');
        }
        winner.classList.toggle('hidden');
        for(let i = 0; i < boardSquares.length; i++) {
            if(i === firstSquare || i === secondSquare || i === thirdSquare) {
                boardSquares[i].setAttribute('style', 'color: chartreuse');
            }
            if(boardSquares[i].className === 'boardSquare') {
                boardSquares[i].classList.toggle('disabled');
            }
        }
    }
    return {boardSquares, render, switchPlayer, checkGameOver, over};
})();