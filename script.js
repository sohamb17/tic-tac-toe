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
            if(!displayController.checkGameOver()) {
                displayController.switchPlayer();
            }
        }
    }
    return {getName, addMarker};
};

const displayController = (() => {
    const boardSquares = document.getElementsByClassName('boardSquare');
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const render = () => {
        for(let i = 0; i < boardSquares.length; i++) {
            boardSquares[i].textContent = gameBoard.board[i];
        }
    };
    const x = player('X');
    const o = player('O');
    let currentPlayer = x;
    const switchPlayer = () => {
        if(currentPlayer.getName() === 'X') {
            player1.setAttribute('style', 'color: white; font-weight: normal;');
            currentPlayer = o;
            player2.setAttribute('style', 'color: greenyellow; font-weight: bold;');
        } else {
            player2.setAttribute('style', 'color: white; font-weight: normal;');
            currentPlayer = x;
            player1.setAttribute('style', 'color: greenyellow; font-weight: bold;');
        }
    }
    const bind = () => {
        for(let i = 0; i < boardSquares.length; i++) {
            boardSquares[i].addEventListener('click', () => currentPlayer.addMarker(boardSquares[i]));
        }
    }
    bind();
    const checkGameOver = () => {
        let over = false;
        for(let i = 0; i < 3; i++) {
            // check row
            let start = 3 * i;
            if(gameBoard.board[start] === 'X' || gameBoard.board[start] === 'O') {
                if(gameBoard.board[start] === gameBoard.board[start + 1] && gameBoard.board[start] === gameBoard.board[start + 2]) {
                    over = true;
                    gameOver(start, start + 1, start + 2);
                    break;
                }
            }
            // check column
            start = i;
            if(gameBoard.board[start] === 'X' || gameBoard.board[start] === 'O') {
                if(gameBoard.board[start] === gameBoard.board[start + 3] && gameBoard.board[start] === gameBoard.board[start + 6]) {
                    over = true;
                    gameOver(start, start + 3, start + 6);
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
                    gameOver(start, start + 4, start + 8);
                }
            }
            start = 2;
            if(gameBoard.board[start] === 'X' || gameBoard.board[start] === 'O') {
                if(gameBoard.board[start] === gameBoard.board[start + 2] && gameBoard.board[start] === gameBoard.board[start + 4]) {
                    over = true;
                    gameOver(start, start + 2, start + 4);
                }
            }
        }
        // check Tie
        if(!over) {
            if(gameBoard.board.every(boardSquare => (boardSquare === 'X' || boardSquare === 'O'))) {
                over = true;
                console.log('Tie');
            }
        }
        return over;
    }
    const gameOver = (firstSquare, secondSquare, thridSquare) => {
        console.log(firstSquare, secondSquare, thridSquare);
        console.log(`Winner: ${gameBoard.board[firstSquare]}`);
        for(let i = 0; i < boardSquares.length; i++) {
            if(boardSquares[i].className === 'boardSquare') {
                boardSquares[i].classList.toggle('disabled');
            }
        }
    }
    return {boardSquares, render, switchPlayer, checkGameOver};
})();