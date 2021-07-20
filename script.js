const gameBoard = (() => {
    let board = ['X', 'O', 'X', 'X', 'X', 'O', 'O', 'O', 'X'];
    const render = () => {
        const boardSquares = document.getElementsByClassName('boardSquare');
        for(let i = 0; i < boardSquares.length; i++) {
            boardSquares[i].textContent = board[i];
        }
    };
    render();
    return {};
})();

const player = () => {

};

const displayController = (() => {

})();