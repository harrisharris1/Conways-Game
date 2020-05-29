import React, { Component } from 'react';
import Logic from "./comp/Logic";
import "./App.css";



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logic:new Logic(),
      size: [50, 25], 
      gameIsRunning: false,
      interval: 200
    }

    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    // this.resetGame=this.resetGame.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
    this.storeCell = this.storeCell.bind(this);
  }

  handleRowChange(event) {
    if(!this.state.gameIsRunning) {
      var actualSize = this.state.size;

      if(event.target.value < 25)
        actualSize[1] = event.target.value;
      else
        actualSize[1] = 25;

      this.setState({
        size: actualSize,
      });

      this.renderCanvas();
    }
  }

  handleColumnChange(event) {
    if(!this.state.gameIsRunning) {
      var actualSize = this.state.size;
      if(event.target.value < 50)
        actualSize[0] = event.target.value;
      else
        actualSize[0] = 50;

      this.setState({
        size: actualSize,
      });

      this.renderCanvas();
    }

  }

  changeInterval = (event) => {
    if(!this.state.gameIsRunning){
      this.setState({
        interval: event.target.value
      })
    }
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
  // resetGame(){
  //   this.
  //   });
  // }

  

  runGame() {
    this.setState({
      logic: this.state.logic.addGeneration()
    })
  }

  storeCell(position) {
    if(!this.state.gameIsRunning) {
      this.setState({
        logic: this.state.logic.storeCell(position)
      })
    }
  }

  renderCanvas() {
    var newCanvas = [];
    var cellRows = [];

    for(var i = 0; i < this.state.size[0]; i++) {
      for (var j = 0; j < this.state.size[1]; j++){
        if(this.state.logic.isCellAlive(i + " , " + j)){
          cellRows.push(
            <Cell key={[i, j]} position={{x: i, y: j}} live={true} storeCell={this.storeCell.bind(this)}/>
          );
        } else {
          cellRows.push(
            <Cell key={[i, j]} position={{x: i, y: j}} live={false} storeCell={this.storeCell.bind(this)}/>
          );
        }
      }
      newCanvas.push(<div className="row" key={i}>{cellRows}</div>);
      cellRows = [];
    }

    return newCanvas;
  }

  render() {
    return (
      <div className="container">
        <h1>Conway's Game of Life</h1>
        <div className="grid-container">
          Cells:{this.state.logic.getGeneration()}
        </div>
        <div className="canvas">
        {this.renderCanvas()}
        </div>
        <div className="label-container">
            <label className="label">
              Rows:
              <input className="input" type="text" value={this.state.size[1]} onChange={this.handleRowChange} />
            </label>
            <label className="label">
              Columns:
              <input className="input" type="text" value={this.state.size[0]} onChange={this.handleColumnChange} />
            </label>
            <label className="label">
              Interval:
              <input className="input" type="text" value={this.state.interval} onChange={this.changeInterval} />
            </label>
          </div>
        <div className="cta-btns">
            <button className="submit" onClick={this.startGame}>Start</button>
            <button className="submit" onClick={this.stopGame}>Stop</button>
            <button className="submit" onClick={this.resetGame}>Reset</button>
          </div>
          <div className="rules">
            <ul>
              <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
              <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
              <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
              <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                        </ul>
          </div>
      </div>
    );
  }
}
class Cell extends Component {
  render() {
    return (
      <div className="cell-around">
      <div onClick={() => this.props.storeCell(this.props.position)} className={this.props.live ? "live-cells" : "dead-cells"}></div>
      </div>
    );
  }
}

  