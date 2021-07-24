const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
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
            displayController.switchPlayer();
        }
    }
    return {getName, addMarker};
};

const displayController = (() => {
    const boardSquares = document.getElementsByClassName('boardSquare');
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
            currentPlayer = o;
        } else {
            currentPlayer = x;
        }
    }
    const bind = () => {
        for(let i = 0; i < boardSquares.length; i++) {
            boardSquares[i].addEventListener('click', () => currentPlayer.addMarker(boardSquares[i]));
        }
    }
    bind();
    return {boardSquares, render, switchPlayer};
})();