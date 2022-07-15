// Tic-Tac-Toe Grid factory function
const tttGrid = (filling) => {
    // Instantiate with whatever the filling is 
    let boardState = [filling,filling,filling,filling,filling,filling,filling,filling,filling];

    const gameType = () => {
        return document.getElementById('difficulty').value;
    }

    const getState = () => {
        return boardState;
    }

    // Populate the board with a given state
    const populateBoard = (state) => {
        boardState = state;
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
            dom.updateBoard(document.getElementById('game-area'));
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

    return {gameType, getState, populateBoard, resetBoard, clearBoard, makeMove, checkWin};
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
    const makeMove = (gridCell) => {
        let position = gridCell.parentNode.children.findIndex(
            function(child){
                return child === this;
            }
        );
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
const dom = (() => {
    
    const addNewBoard = (parent) => {
        let newGrid = document.createElement('div');
        newGrid.classList.add('grid-wrapper');
        let newGridCells = [];
        for (let i = 0; i < 9; i++){
            newGridCells[i] = document.createElement('div');
            if (i === 0 || i === 1 || i === 3 || i === 4 || i === 6 || i === 7){
                newGridCells[i].classList.add('right-border');
            }
            if (i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5){
                newGridCells[i].classList.add('bottom-border');
            }
            newGridCells[i].classList.add('ttt-cell');
            addClickListener(newGridCells[i]);
            newGrid.appendChild(newGridCells[i]);
        }
        parent.appendChild(newGrid);
    }

    const updateBoard = (parent) => {
        const currentState = gameBoard.getState();
        let gridWrapper = parent.children[0];
        let gridCells = gridWrapper.children;

        for(let i = 0; i < currentState.length; i++) {
            if (typeof(currentState[i]) === 'string'){
                gridCells[i].textContent = currentState[i];
                removeClickListener(gridCells[i]);
            } else if (typeof(currentState[i]) === 'object'){
                updateBoard(gridCells[i]);
            } else {
                console.log('Board state type error.');
            }
        };
    }

    const addClickListener = (gridCell) => {
        gridCell.addEventListener("click", flowControl1D.makeMove(this));
    }

    const removeClickListener = (gridCell) => {
        gridCell.removeEventListener("click", flowControl1D.makeMove(this));
    }

    return {addNewBoard, updateBoard};
})();


// Initialize the grid to a 1D game
window.onload = dom.addNewBoard(document.getElementById('game-area'));