import React from 'react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
class Navigation extends React.Component{

    constructor(props){
        super(props);
        this.state={
            page:'home'
        }
    }
    render(){
        return(
        
            <React.Fragment>
                <div>
                    <div>
                    <h1>

                        {this.state.page}

                    </h1>
                </div>
                <div>
                    <header>
                    <Router>
                    <Link to='/' className='pagelinks' onClick={()=> {this.linkClicked('home')}}>
                    Home 
                    </Link>
                    <Link to = '/tictactoe' className='pagelinks' onClick={()=> {this.linkClicked('tictactoe')}}>
                    Tic-Tac-Toe
                    </Link>
                    <Link to='/minesweeper' className='pagelinks' onClick={()=> {this.linkClicked('minesweeper')}}>
                    Minesweeper
                    </Link>
                    <Link to='/colorsort' className='pagelinks' onClick={()=> {this.linkClicked('colorsort')}}>
                    Color Sort
                    </Link>
                    </Router>
                    </header>
                </div>

                </div>
                </React.Fragment>

        );
    }

linkClicked(i){
    this.setState({page: i});
    console.log('page =' + i);
}
}
export default Navigation;