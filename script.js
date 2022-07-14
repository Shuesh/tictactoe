// Tic-Tac-Toe Grid factory function
const tttGrid = (filling) => {
    // Instantiate with whatever the filling is 
    let boardState = [filling,filling,filling,filling,filling,filling,filling,filling,filling];

    const getState = () => {
        return boardState;
    }

    // Reset the board to the initial settings (including 2nd level boards, if applicable)
    const resetBoard = () => {
        boardState = [filling,filling,filling,filling,filling,filling,filling,filling,filling];
    }

    // Clear the board so it is just a 1D tic tac toe board
    const clearBoard = () => {
        boardState = ['','','','','','','','',''];
    }

    // This adds either marker to any valid position
    const makeMove = (marker, position) => {
        // May run into issues here in 2D games. Will troubleshoot later if it's a problem
        if (boardState[position] == filling) {
            boardState[position] = marker;
        }
    }

    // 8 possible ways to win. Just hard-code possibilities to check them all
    const checkWin = () => {
        // Check the three columns
        if (boardState[0] === boardState[3] && boardState[3] === boardState[6]){
            return boardState[0];
        } else if (boardState[1] === boardState[4] && boardState[4] === boardState[7]) {
            return boardState[1];
        } else if (boardState[2] === boardState[5] && boardState[5] === boardState[8]){
            return boardState[2];
        } 
        // Check the three rows
        else if (boardState[0] === boardState[1] && boardState[1] === boardState[2]){
            return boardState[0];
        } else if (boardState[3] === boardState[4] && boardState[4] === boardState[5]){
            return boardState[3];
        } else if (boardState[6] === boardState[7] && boardState[7] === boardState[8]){
            return boardState[6];
        } 
        // Check the two diagonals
        else if (boardState[0] === boardState[4] && boardState[4] === boardState[8]){
            return boardState[0];
        } else if (boardState[2] === boardState[4] && boardState[4] === boardState[6]){
            return boardState[2];
        } 
        // If no wins, return false
        else {
            return false;
        }
    }

    return {getState, resetBoard, clearBoard, makeMove, checkWin};
}

// Initialize a 1D grid
const gameBoard = tttGrid('');

// Initialize a flow controller for the game
const flowControl1D = (() => {
    // Track whose turn it is
    let activePlayer = 'X';

    // toggle whose turn it is
    const toggleActivePlayer = () => {
        if (activePlayer === 'X'){
            activePlayer = 'O';
        } else {
            activePlayer = 'X';
        }
    }

    // Make a move
    const makeMove = (position) => {
        gameBoard.makeMove(activePlayer, position);
        gameBoard.checkWin();
        toggleActivePlayer();
    }

    // Getter for the active player
    const getActivePlayer = () => {
        return activePlayer;
    }

    return {makeMove, getActivePlayer};
})();

// Add and update elements in the DOM
const dom = () => {
    
    const addBoard = () => {
        
    }
}


window.onload = dom.update();