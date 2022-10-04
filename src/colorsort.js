import React from 'react';
import './colorsort.css';



class ColorStack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let color = { backgroundColor: '#777' };
        if(this.props.isSelected){
            color = { backgroundColor: '#aaa' };
        }
        //if won background green
        if(this.props.isFinished){
            color = { backgroundColor: 'green' };
        }

        return (
            <div className='stack_container' style = {color}
                onClick={() => this.props.onClick()}>
                {this.renderCircle(3)}
                {this.renderCircle(2)}
                {this.renderCircle(1)}
                {this.renderCircle(0)}
            </div>
        );
    }
    /**
     * since I can't align the circles at the bottom of their stack
     * in css, i instead create a transparent circle at the top of the
     * stack based on the stacks size
     */
    renderCircle(circleNumber) {
        let colors = [{ backgroundColor: '#0000' }, { backgroundColor: 'red' }, { backgroundColor: 'yellow' }, { backgroundColor: 'blue' }];
        if (this.props.stack.length <= circleNumber) {
            return (
                <div className='circle' style={colors[0]}></div>
            );
        }
        return (
            <div className='circle' style={colors[this.props.stack[circleNumber]]}></div>
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



//going to want to pass in the properties 
class ColorSort extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedStack: -1,
            stackList: this.initializeStacks(),
            finishedList:Array(4).fill(false),
            totalFinished:0
        };
    }

    render() {
        return (
            <div className='stack_container_list'>
                {this.renderStack(0)}
                {this.renderStack(1)}
                {this.renderStack(2)}
                {this.renderStack(3)}
            </div>
        );
    }

    //what the tictactoe board is doing, 
    //is passing its onclick to the individual squares,
    //so that they can update the boards state instead 
    //of the individual components. should keep a
    //list of the stacks in the board and update them 
    //that way
    handleClick(stackNumber) {
        //console.log('on click (ColorSort)');
        //if no stacks are selected, select stack if its not empty or finished
        if (this.state.selectedStack === -1) {
            if (this.state.stackList[stackNumber].length !== 0)
                if (!this.stackIsFinished(stackNumber))
                    this.setState({ selectedStack: stackNumber });
        }
        //if selecting already selected stack, unselect it
        else if (this.state.selectedStack === stackNumber) {
            this.setState({ selectedStack: -1 });
        }
        //move a ball from first selected stack to second one,
        //if there is no room, dont move anything but unselect
        //anyway. might need to update the state of stackList,
        //but its possible that updating the selectedStack will be enough
        else {
            let firstStack = this.state.stackList[this.state.selectedStack];
            let secondStack = this.state.stackList[stackNumber];

            if (secondStack.length < 4) {
                secondStack.push(firstStack.pop());
            }
            this.setState({ selectedStack: -1 });

            //if stack is finished after move, update list and increment count
            if(this.stackIsFinished(stackNumber)){
                let newState = this.state.finishedList.slice();
                newState[stackNumber] = true;
                this.setState({finishedList: newState});
                this.setState({totalFinished: this.state.totalFinished+1});
            }
        }

    }

    renderStack(stackNumber) {
        return (
            <ColorStack isSelected={this.state.selectedStack === stackNumber}
                stack={this.state.stackList[stackNumber]}
                isFinished={this.state.finishedList[stackNumber] || this.state.totalFinished === 3}
                onClick={() => this.handleClick(stackNumber)} />
        );
    }

    stackIsFinished(stackNumber) {
        let currStack = this.state.stackList[stackNumber];
        if (currStack.length === 4) {
            //console.log('stack number '+stackNumber+' is finished!');
            return (currStack[0] === currStack[1] && currStack[0] === currStack[2] && currStack[0] === currStack[3]);
        }

        return false;
    }

    initializeStacks() {
        let arr = [];
        let stackList = [];
        for (let i = 0; i < 4; i++) {
            arr.push(0);
            arr.push(1);
            arr.push(2);
            arr.push(3);
        }
        shuffle(arr);
        for (let i = 0; i < 4; i++) {
            let stack = [];
            for (let j = 0; j < 4; j++) {
                let curr = arr[(i * 4) + j];
                //if element is 0 dont push
                if (curr !== 0) {
                    stack.push(curr);
                }
            }
            stackList.push(stack);
        }

        return stackList;
    }
}
export default ColorSort;