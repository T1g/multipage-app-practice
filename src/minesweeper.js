import React from 'react';
import "./minesweeper.css";

let board = [];
let mineButtonBoard = [];
let clickBoard = [];
let revealedButtons = 0;
let flagMode = false;
let hasWon = false;
let hasLost = false;

//props used for this are x, y, value, hasMine
class MineButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            hasFlag: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.clicked = false;
        this.hasFlag = false;
    }
    render() {

        //might have to change this to this.clicked
        if (this.state.clicked === true) {
            return (
                <button className="minesweeper-button" id={"buttonx" + this.props.x + "y" + this.props.y} onClick={() => { this.handleClick() }}>{this.props.hasMine ? '*' : this.props.value}</button>
            );
        }
        return (
            <button className="minesweeper-button" id={"buttonx" + this.props.x + "y" + this.props.y} onClick={() => { this.handleClick() }}>{this.hasFlag ? 'F' : '_'}</button>
        );
    }

    handleClick() {
        if (this.clicked === false && !hasLost && !hasWon) {
            console.log('clicked on x: ' + this.props.x + ' y: ' + this.props.y);
            //toggle flag if unclicked
            if (flagMode) {
                this.hasFlag = !this.hasFlag;
                let flag = this.hasFlag;
                this.setState({ hasFlag: { flag } });
            }
            else if (this.hasFlag === false) {
                this.setState({ clicked: true });
                this.clicked = true;
                clickBoard[this.props.x][this.props.y] = 1;
                revealedButtons = revealedButtons + 1;

                //lose state
                if (this.props.hasMine === true) {
                    hasLost = true;
                    this.props.gameEnded();
                }
                //reveal adjacent tiles
                else if (this.props.value === 0) {
                    this.clickAdjacent();
                }
            }


            //win state
            if (revealedButtons === 90) {
                hasWon = true;
                this.props.gameEnded();
            }
        }
    }

    clickAdjacent() {
        let i = this.props.x;
        let j = this.props.y;
        if (i > 0 && j > 0) {
            if(clickBoard[i-1][j-1] === 0)
            document.getElementById("buttonx" + (i - 1) + "y" + (j - 1)).click();
        }
        if (i > 0 && j < 9) {
            if(clickBoard[i-1][j+1] === 0)
            document.getElementById("buttonx" + (i - 1) + "y" + (j + 1)).click();
        }
        if (i < 9 && j > 0) {
            if(clickBoard[i+1][j-1] === 0)
            document.getElementById("buttonx" + (i + 1) + "y" + (j - 1)).click();
        }
        if (i < 9 && j < 9) {
            if(clickBoard[i+1][j+1] === 0)
            document.getElementById("buttonx" + (i + 1) + "y" + (j + 1)).click();
        }
        if (i < 9) {
            if(clickBoard[i+1][j] === 0)
            document.getElementById("buttonx" + (i + 1) + "y" + (j)).click();
        }
        if (j < 9) {
            if(clickBoard[i][j+1] === 0)
            document.getElementById("buttonx" + (i) + "y" + (j + 1)).click();
        }
        if (i > 0) {
            if(clickBoard[i-1][j] === 0)
            document.getElementById("buttonx" + (i - 1) + "y" + (j)).click();
        }
        if (j > 0) {
            if(clickBoard[i][j-1] === 0)
            document.getElementById("buttonx" + (i) + "y" + (j - 1)).click();
        }
    }
}


function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

class Minesweeper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flagModeEnabled: false,
            gameOver: false
        };
        this.initializeBoard(() => {this.gameEnded()});
    }

    
    render() {
        return (
            <div>
                {this.renderBoardHeader()}
                <div>
                    {this.generateBoardJSX(0)}
                    {this.generateBoardJSX(1)}
                    {this.generateBoardJSX(2)}
                    {this.generateBoardJSX(3)}
                    {this.generateBoardJSX(4)}
                    {this.generateBoardJSX(5)}
                    {this.generateBoardJSX(6)}
                    {this.generateBoardJSX(7)}
                    {this.generateBoardJSX(8)}
                    {this.generateBoardJSX(9)}
                </div>
            </div>
        );
    }

    renderBoardHeader() {
        if (!hasWon && !hasLost) {
            return (
                <div id='minesweeperBoardHeader'>
                    <label>Placing Flags {flagMode ? 'Enabled' : 'Disabled'} </label>
                    <button onClick={() => this.toggleFlagMode()}>Toggle Flags</button>
                </div>
            );
        }
        else if (hasWon) {
            return (
                <div id='minesweeperBoardHeader'>
                    <label>You have Won!</label>
                </div>
            );
        }
        else if (hasLost) {
            return (
                <div id='minesweeperBoardHeader'>
                    <label>You have Lost!</label>
                </div>
            );
        }
    }

    generateBoardJSX(row) {
        return (
            <div>
                {mineButtonBoard[0][row]}
                {mineButtonBoard[1][row]}
                {mineButtonBoard[2][row]}
                {mineButtonBoard[3][row]}
                {mineButtonBoard[4][row]}
                {mineButtonBoard[5][row]}
                {mineButtonBoard[6][row]}
                {mineButtonBoard[7][row]}
                {mineButtonBoard[8][row]}
                {mineButtonBoard[9][row]}
            </div>
        );
    }


    initializeBoard(gameEnded) {
        console.log('initializing board!');
        console.log('game over state before starting game: ' + this.state.gameOver);
        console.log('flag mode state before starting game: ' + this.state.flagModeEnabled);
        hasWon = false;
        hasLost = false;
        revealedButtons = 0;
        let tiles = [];
        for (let i = 0; i < 10; i++) {
            tiles.push(-1);
            board.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            clickBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            mineButtonBoard.push([]);
        }
        for (let i = 0; i < 90; i++) {
            tiles.push(0);
        }

        shuffle(tiles);

        //first pass through sets the numbers, does a second pass through to generate the buttons
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let tile = tiles[(i * 10) + j];
                if (tile === -1) {
                    if (i > 0 && j > 0) {
                        board[i - 1][j - 1] = board[i - 1][j - 1] + 1;
                    }
                    if (i > 0 && j < 9) {
                        board[i - 1][j + 1] = board[i - 1][j + 1] + 1;
                    }

                    if (i < 9 && j > 0) {
                        board[i + 1][j - 1] = board[i + 1][j - 1] + 1;
                    }

                    if (i < 9 && j < 9) {
                        board[i + 1][j + 1] = board[i + 1][j + 1] + 1;
                    }
                    if (i < 9) {
                        board[i + 1][j] = board[i + 1][j] + 1;
                    }
                    if (j < 9) {
                        board[i][j + 1] = board[i][j + 1] + 1;
                    }
                    if (i > 0) {
                        board[i - 1][j] = board[i - 1][j] + 1;
                    }
                    if (j > 0) {
                        board[i][j - 1] = board[i][j - 1] + 1;
                    }
                }
            }
        }
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let tile = tiles[(i * 10) + j];
                mineButtonBoard[i].push(<MineButton gameEnded={() => gameEnded()} x={i} y={j} value={board[i][j]} hasMine={tile === -1 ? true : false} />);

                if (tile === -1) {
                    board[i][j] = '*';
                }
            }
        }
    }


    toggleFlagMode() {
        flagMode = !flagMode;
        this.setState({ flagModeEnabled: { flagMode } });
    }

    gameEnded() {
        console.log('game over state before ending game: ' + this.state.gameOver);
        console.log('flag mode state before ending game: ' + this.state.flagModeEnabled);
        console.log('game over!');
        this.setState({ gameOver: true });
    }
}


export default Minesweeper;