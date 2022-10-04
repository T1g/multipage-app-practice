import React from 'react';
import "./minesweeper.css";

class MinesweeperButton extends React.Component {
    render() {
        return (
            <button className="minesweeper-button" onClick={() => this.props.onClick()}>{this.props.value}</button>
        );
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
        //state is numberGrid, mineGrid, flagGrid, clickedGrid, flagMode, totalClicked, and gameOver
        this.state = this.initializeState();
    }
    render() {
        return (
            <div>
                <div>
                    {this.renderGameHeader()}
                </div>
                <div>
                    {this.renderButtonRow(0)}
                    {this.renderButtonRow(1)}
                    {this.renderButtonRow(2)}
                    {this.renderButtonRow(3)}
                    {this.renderButtonRow(4)}
                    {this.renderButtonRow(5)}
                    {this.renderButtonRow(6)}
                    {this.renderButtonRow(7)}
                    {this.renderButtonRow(8)}
                    {this.renderButtonRow(9)}
                </div>
            </div>
        );
    }

    renderButtonRow(x) {
        return (
            <div>
                {this.renderButton(x, 0)}
                {this.renderButton(x, 1)}
                {this.renderButton(x, 2)}
                {this.renderButton(x, 3)}
                {this.renderButton(x, 4)}
                {this.renderButton(x, 5)}
                {this.renderButton(x, 6)}
                {this.renderButton(x, 7)}
                {this.renderButton(x, 8)}
                {this.renderButton(x, 9)}
            </div>
        );
    }

    renderButton(x, y) {
        let buttonValue = '_';
        if (this.state.flagGrid[x][y]) {
            buttonValue = 'F';
        }
        else if (this.state.clickedGrid[x][y]) {
            if (this.state.mineGrid[x][y]) {
                buttonValue = 'X';
            }
            else {
                buttonValue = this.state.numberGrid[x][y];
            }
        }

        return (
            <MinesweeperButton value={'' + buttonValue} onClick={() => this.handleButtonClick(x, y)} />
        );
    }

    handleButtonClick(x, y) {

        if (!this.state.clickedGrid[x][y] && !this.state.gameOver) {
            console.log('clicked on x: ' + x + ' y: ' + y);

            //toggle flag if unclicked
            if (this.state.flagMode) {
                let newFlagGrid = this.state.flagGrid.slice();
                newFlagGrid[x][y] = !newFlagGrid[x][y];
                this.setState({ flagGrid: newFlagGrid });
            }
            //click if theres no flag
            else if (!this.state.flagGrid[x][y]) {
                let newClickGrid = this.state.clickedGrid.slice();
                newClickGrid[x][y] = true;

                let numberClicked = this.state.totalClicked + 1;

                //lose state
                if (this.state.mineGrid[x][y]) {
                    this.setState({ gameOver: true });
                }
                //reveal adjacent tiles, if there are no mines adjacent
                else {
                    if (this.state.numberGrid[x][y] === 0) {
                        numberClicked = this.clickAdjacent(x, y, newClickGrid, numberClicked);
                    }
                    this.setState({ clickGrid: newClickGrid, totalClicked: numberClicked });
                    console.log('totalClicked: ' + numberClicked);

                    //win state
                    if (numberClicked === 90) {
                        this.setState({ gameOver: true });
                    }
                }
            }

        }

    }

    //modifies the passed in clickGrid clone and returns it
    clickAdjacent(x, y, newClickGrid, numberClicked) {

        let clicked = numberClicked;

        if (x > 0 && y > 0) {
            clicked = this.clickAdjacentHelper(x - 1, y - 1, newClickGrid, clicked);
        }
        if (x > 0 && y < 9) {
            clicked = this.clickAdjacentHelper(x - 1, y + 1, newClickGrid, clicked);
        }
        if (x < 9 && y > 0) {
            clicked = this.clickAdjacentHelper(x + 1, y - 1, newClickGrid, clicked);
        }
        if (x < 9 && y < 9) {
            clicked = this.clickAdjacentHelper(x + 1, y + 1, newClickGrid, clicked);
        }
        if (x < 9) {
            clicked = this.clickAdjacentHelper(x + 1, y, newClickGrid, clicked);
        }
        if (y < 9) {
            clicked = this.clickAdjacentHelper(x, y + 1, newClickGrid, clicked);
        }
        if (x > 0) {
            clicked = this.clickAdjacentHelper(x - 1, y, newClickGrid, clicked);
        }
        if (y > 0) {
            clicked = this.clickAdjacentHelper(x, y - 1, newClickGrid, clicked);
        }
        return clicked;
    }

    //helper function to make clickadjacent easier to read and modify since the same operation is performed 8 times essentially
    clickAdjacentHelper(x, y, newClickGrid, numberClicked) {
        if (!newClickGrid[x][y] && !this.state.flagGrid[x][y]) {
            newClickGrid[x][y] = true;
            if (this.state.numberGrid[x][y] === 0) {
                return this.clickAdjacent(x, y, newClickGrid, numberClicked + 1);
            }
            else return numberClicked + 1;
        }
        else return numberClicked;
    }

    initializeState() {
        let numbers = Array(10).fill().map(() => Array(10).fill(0));
        let mines = Array(10).fill().map(() => Array(10).fill(false));
        let flags = Array(10).fill().map(() => Array(10).fill(false));
        let clicked = Array(10).fill().map(() => Array(10).fill(false));

        let randomMines = shuffle(Array(100).fill().map((_, idx) => 0 + idx));

        for (let i = 0; i < 10; i++) {
            let mine = randomMines.pop();
            let x = mine % 10;
            let y = Math.floor((mine / 10) % 10);

            mines[x][y] = true;

            numbers[x][y] = numbers[x][y] + 1; //incrementing mine space for the hell of it


            if (x > 0 && y > 0) {
                numbers[x - 1][y - 1] = numbers[x - 1][y - 1] + 1;
            }
            if (x > 0 && y < 9) {
                numbers[x - 1][y + 1] = numbers[x - 1][y + 1] + 1;
            }

            if (x < 9 && y > 0) {
                numbers[x + 1][y - 1] = numbers[x + 1][y - 1] + 1;
            }

            if (x < 9 && y < 9) {
                numbers[x + 1][y + 1] = numbers[x + 1][y + 1] + 1;
            }
            if (x < 9) {
                numbers[x + 1][y] = numbers[x + 1][y] + 1;
            }
            if (y < 9) {
                numbers[x][y + 1] = numbers[x][y + 1] + 1;
            }
            if (x > 0) {
                numbers[x - 1][y] = numbers[x - 1][y] + 1;
            }
            if (y > 0) {
                numbers[x][y - 1] = numbers[x][y - 1] + 1;
            }

        }

        return {
            numberGrid: numbers, mineGrid: mines, flagGrid: flags,
            clickedGrid: clicked, flagMode: false, totalClicked: 0, gameOver: false
        };
    }

    renderGameHeader() {

        if (!this.state.gameOver) {
            return (
                <label>
                    <input onChange={() => { this.toggleFlags() }} type='checkbox' checked={this.state.flagMode} />
                    Place Flags
                </label>
            );
        }
        else{
            if(this.state.totalClicked === 90){
                return (
                    <label>You Win!</label>
                );
            }
            else{
                return (
                    <label>You Lose!</label>
                );
            }
        }
    }

    toggleFlags() {
        let newMode = !this.state.flagMode;
        this.setState({ flagMode: newMode });
    }

}

export default Minesweeper;