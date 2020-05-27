import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: [30, 5],
    }
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
  }
  handleRowChange(event) {
    if (!this.state.gameIsRunning){
      var recentSize =this.state.size;

      if(event.target.value < 30)
      recentSize[0] =event.target.value;
      else
      recentSize[0]= 30;

      this.setState({
        size: recentSize,
      });

      this.renderCanvas();
    }
  }

  

  handleColumnChange(event) {
    if(!this.state.gameIsRunning){
      var recentSize =this.state.size;
      if (event.target.value < 5)
      recentSize[0] = event.taget.value;
      else
      recentSize[0] = 5;

      this.setState({
        size: recentSize,
      });

      this.renderCanvas();
    }

  }

  
  renderCanvas() {
    var newCanvas = [];
    var rowCells = [];

    for(var i = 0; i < this.state.size[0]; i++) {
      for (var j = 0; j < this.state.size[1]; j++){
          rowCells.push(<Cell key={[i, j]} />);
        }
        newCanvas.push(<div className="row" key={i}>{rowCells}</div>);
        rowCells = [];
      }

    return newCanvas;

  }
  startGame() {
    if(!this.state.gameIsRunning){
      this.setState({
        gameIsRunning: true,
      }, () => {
        this.intervalRef = setInterval(() => this.runGame(), 10);
      })
    }
  }

  stopGame(){
    this.setState({
      gameIsRunning: false
    }, () => {
      if(this.intervalRef) {
        clearInterval(this.intervalRef);
      }
    })
  }

  runGame() {
  }

  
  render() {
    return (
      <div className="container">
          <div className="grid-container">
            <h1>Conway's Game of Life<br>
            </br>By Andrea Harris</h1>
              <div className="canvas-section">
                Cells:
              </div>
                <div className="canvas">
                {this.renderCanvas()}
                </div>
          </div> 
          <div className="rules">
          <ul>
            <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
            <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
            <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
            <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
          </ul>
        </div>
          <label className="label">
                Columns:
                <input className="input" type="text" value={this.state.size[1]} onChange={this.handleColumnChange} />
              </label>

            <label className="label">
                Rows:
                <input className="input" type="text" value={this.state.size[1]} onChange={this.handleRowChange} />
              </label>
            <div className="cta-btns">
              <button className="submit" onClick={this.startGame}>Start</button>
              <button className="submit" onClick={this.stopGame}>Stop</button>
          </div>
         
      </div> //conatiner ends//
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <div className="cell-container">
      </div>
    );
  }
}