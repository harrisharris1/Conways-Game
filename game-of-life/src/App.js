import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: [70, 30],
    }

    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
  }

  handleRowChange(event) {
  }

  handleColumnChange(event) {
  }

  startGame() {
  }

  stopGame(){
  }

  runGame() {
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
          <label className="label">
                Columns:
                <input className="input" type="text" value={this.state.size[0]} onChange={this.handleColumnChange} />
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
      <div className="cell-container"></div>
    );
  }
}