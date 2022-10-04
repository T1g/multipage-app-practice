import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Link,
    Route
  } from "react-router-dom";
import Home from './home';
import TicTacToe from './tictactoe';
import Minesweeper from './minesweeperredo';
import ColorSort from './colorsort';
import ConnectFour from './connectfour';


class App extends React.Component{

    constructor(props){
        super(props);
        this.state={
            page:null
        }
    }

    render(props){
        return(
            <React.Fragment>
            <div>
                <div>
                <h1>

                    {/*this.state.page*/}

                </h1>
            </div>
            <div>
                <Router>
                <header>

                <Link to='/' className='pagelinks' onClick={()=> {this.linkClicked('Home')}}>
                Home 
                </Link>
                <Link to = '/tictactoe' className='pagelinks' onClick={()=> {this.linkClicked('Tic-Tac-Toe')}}>
                Secret Tic-Tac-Toe
                </Link>
                <Link to='/minesweeper' className='pagelinks' onClick={()=> {this.linkClicked('Minesweeper')}}>
                Minesweeper
                </Link>
                <Link to='/colorsort' className='pagelinks' onClick={()=> {this.linkClicked('Color Sort')}}>
                Color Sort
                </Link>
                <Link to='/connectfour' className='pagelinks' onClick={()=> {this.linkClicked('Connect Four')}}>
                Connect Four
                </Link>
                </header>

                <div>
                <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/tictactoe" element={<TicTacToe />}/>
                <Route path="/minesweeper" element={<Minesweeper />}/>
                <Route path="/colorsort" element={<ColorSort />}/>
                <Route path="/connectfour" element={<ConnectFour />}/>
                </Routes>
                </div>
                </Router>
                
            </div>

                

            </div>
            </React.Fragment>
            
        );
    }
    linkClicked(i){
        this.setState({page: i});
    }
}

export default App;