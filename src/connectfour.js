import React from 'react';
import './connectfour.css'

class Column extends React.Component {
    render() {
        //the chip in the 0 position is at the bottom of the stack
        return (
            <div className='c4_column'
                onClick={() => this.props.onClick()}>
                {this.renderCircle(5)}
                {this.renderCircle(4)}
                {this.renderCircle(3)}
                {this.renderCircle(2)}
                {this.renderCircle(1)}
                {this.renderCircle(0)}
            </div>
        );
    }

    renderCircle(circleNumber) {
        let colors = [{ backgroundColor: '#555' }, { backgroundColor: 'red' }, { backgroundColor: 'black' }];

        return (<div className='c4_circle' style={colors[this.props.stack[circleNumber]]}></div>);
    }
}

class ConnectFour extends React.Component {

    //red chips are '1', black chips are '2', and no chip is '0'
    constructor(props) {
        super(props);
        this.state = {
            board: Array(7).fill().map(() => Array(6).fill(0)),
            redsTurn: true,
            gameOver: false
        };
    }


    render() {
        return (
            <div>
                <div>{this.renderHeader()}</div>
                <div className='c4_board'>
                    {this.renderColumn(0)}
                    {this.renderColumn(1)}
                    {this.renderColumn(2)}
                    {this.renderColumn(3)}
                    {this.renderColumn(4)}
                    {this.renderColumn(5)}
                    {this.renderColumn(6)}
                </div>
            </div>
        );
    }

    renderColumn(columnNumber) {
        return (
            <Column stack={this.state.board[columnNumber]} onClick={() => this.handleClick(columnNumber)} />
        );
    }

    renderHeader() {
        if (!this.state.gameOver) {
            return (<label>It is {this.state.redsTurn ? 'Red' : 'Black'}'s turn</label>);
        }
        else {
            return (<label>{this.state.redsTurn ? 'Red' : 'Black'} Wins!</label>);
        }
    }

    handleClick(columnNumber) {
        //if there isnt room in the column dont do anything
        if (this.state.board[columnNumber][5] === 0 && !this.state.gameOver) {
            let color = this.state.redsTurn ? 1 : 2;
            for (let i = 0; i < 6; i++) {
                if (this.state.board[columnNumber][i] === 0) {
                    let newState = this.state.board.slice();
                    let newTurn = !this.state.redsTurn;
                    newState[columnNumber][i] = color;
                    //do not update who's turn it is if the game is over, it will be easier to display winner
                    if (calculateWinner(newState) !== 0) {
                        this.setState({ board: newState, gameOver: true });
                    }
                    else {
                        this.setState({ board: newState, redsTurn: newTurn });
                    }
                    break;
                }
            }
        }
    }
}


//this is from the tictactoe code, might use a similar implementation for calculating a winner for this
//its annoying writing out so many possible states, but it would also run faster than iterating over the possibilities
function calculateWinner(board) {

    //the Board consists of a 7 x 6 array. max value of x is 6, max value of y is 5
    //these are all the possible combinations that result in 4 chips in a row.
    const vertical = [
        [[0, 0], [0, 1], [0, 2], [0, 3]],
        [[0, 4], [0, 1], [0, 2], [0, 3]],
        [[0, 4], [0, 5], [0, 2], [0, 3]],

        [[1, 0], [1, 1], [1, 2], [1, 3]],
        [[1, 4], [1, 1], [1, 2], [1, 3]],
        [[1, 4], [1, 5], [1, 2], [1, 3]],

        [[2, 0], [2, 1], [2, 2], [2, 3]],
        [[2, 4], [2, 1], [2, 2], [2, 3]],
        [[2, 4], [2, 5], [2, 2], [2, 3]],

        [[3, 0], [3, 1], [3, 2], [3, 3]],
        [[3, 4], [3, 1], [3, 2], [3, 3]],
        [[3, 4], [3, 5], [3, 2], [3, 3]],

        [[4, 0], [4, 1], [4, 2], [4, 3]],
        [[4, 4], [4, 1], [4, 2], [4, 3]],
        [[4, 4], [4, 5], [4, 2], [4, 3]],

        [[5, 0], [5, 1], [5, 2], [5, 3]],
        [[5, 4], [5, 1], [5, 2], [5, 3]],
        [[5, 4], [5, 5], [5, 2], [5, 3]],

        [[6, 0], [6, 1], [6, 2], [6, 3]],
        [[6, 4], [6, 1], [6, 2], [6, 3]],
        [[6, 4], [6, 5], [6, 2], [6, 3]]
    ];
    const horizontal = [
        [[0, 0], [1, 0], [2, 0], [3, 0]],
        [[4, 0], [1, 0], [2, 0], [3, 0]],
        [[4, 0], [5, 0], [2, 0], [3, 0]],
        [[4, 0], [5, 0], [6, 0], [3, 0]],

        [[0, 1], [1, 1], [2, 1], [3, 1]],
        [[4, 1], [1, 1], [2, 1], [3, 1]],
        [[4, 1], [5, 1], [2, 1], [3, 1]],
        [[4, 1], [5, 1], [6, 1], [3, 1]],

        [[0, 2], [1, 2], [2, 2], [3, 2]],
        [[4, 2], [1, 2], [2, 2], [3, 2]],
        [[4, 2], [5, 2], [2, 2], [3, 2]],
        [[4, 2], [5, 2], [6, 2], [3, 2]],

        [[0, 3], [1, 3], [2, 3], [3, 3]],
        [[4, 3], [1, 3], [2, 3], [3, 3]],
        [[4, 3], [5, 3], [2, 3], [3, 3]],
        [[4, 3], [5, 3], [6, 3], [3, 3]],

        [[0, 4], [1, 4], [2, 4], [3, 4]],
        [[4, 4], [1, 4], [2, 4], [3, 4]],
        [[4, 4], [5, 4], [2, 4], [3, 4]],
        [[4, 4], [5, 4], [6, 4], [3, 4]],

        [[0, 5], [1, 5], [2, 5], [3, 5]],
        [[4, 5], [1, 5], [2, 5], [3, 5]],
        [[4, 5], [5, 5], [2, 5], [3, 5]],
        [[4, 5], [5, 5], [6, 5], [3, 5]]
    ];
    const downLeft = [
        [[0, 0], [1, 1], [2, 2], [3, 3]],
        [[1, 0], [2, 1], [3, 2], [4, 3]],
        [[2, 0], [3, 1], [4, 2], [5, 3]],
        [[3, 0], [4, 1], [5, 2], [6, 3]],

        [[0, 1], [1, 2], [2, 3], [3, 4]],
        [[1, 1], [2, 2], [3, 3], [4, 4]],
        [[2, 1], [3, 2], [4, 3], [5, 4]],
        [[3, 1], [4, 2], [5, 3], [6, 4]],

        [[0, 2], [1, 3], [2, 4], [3, 5]],
        [[1, 2], [2, 3], [3, 4], [4, 5]],
        [[2, 2], [3, 3], [4, 4], [5, 5]],
        [[3, 2], [4, 3], [5, 4], [6, 5]]
    ];
    const downRight = [
        [[6, 0], [5, 1], [4, 2], [3, 3]],
        [[5, 0], [4, 1], [3, 2], [2, 3]],
        [[4, 0], [3, 1], [2, 2], [1, 3]],
        [[3, 0], [2, 1], [1, 2], [0, 3]],

        [[6, 1], [5, 2], [4, 3], [3, 4]],
        [[5, 1], [4, 2], [3, 3], [2, 4]],
        [[4, 1], [3, 2], [2, 3], [1, 4]],
        [[3, 1], [2, 2], [1, 3], [0, 4]],

        [[6, 2], [5, 3], [4, 4], [3, 5]],
        [[5, 2], [4, 3], [3, 4], [2, 5]],
        [[4, 2], [3, 3], [2, 4], [1, 5]],
        [[3, 2], [2, 3], [1, 4], [0, 5]]
    ];

    for (let i = 0; i < vertical.length; i++) {
        if (calculateWinnerHelper(board, vertical[i])) {
            console.log('vertical Winner');
            return true;
        }
    }
    for (let i = 0; i < horizontal.length; i++) {
        if (calculateWinnerHelper(board, horizontal[i])) {
            console.log('horizontal Winner');
            return true;
        }
    }
    for (let i = 0; i < downLeft.length; i++) {
        if (calculateWinnerHelper(board, downLeft[i])) {
            console.log('downLeft Winner');
            return true;
        }
    }
    for (let i = 0; i < downRight.length; i++) {
        if (calculateWinnerHelper(board, downRight[i])) {
            console.log('downRight Winner');
            return true;
        }
    }
    return 0;
}

//helper function to make the loop look cleaner
function calculateWinnerHelper(board, linePoints) {
    let x0 = linePoints[0][0];
    let y0 = linePoints[0][1];
    let x1 = linePoints[1][0];
    let y1 = linePoints[1][1];
    let x2 = linePoints[2][0];
    let y2 = linePoints[2][1];
    let x3 = linePoints[3][0];
    let y3 = linePoints[3][1];

    let circle0 = board[x0][y0];
    let circle1 = board[x1][y1];
    let circle2 = board[x2][y2];
    let circle3 = board[x3][y3];

    return (circle0 === circle1 && circle0 === circle2 && circle0 === circle3 && circle0 !== 0);
}


export default ConnectFour;