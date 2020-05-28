import React from "react";

export default class Logic{
    constructor(generation = 0, liveCells = new Map()) {
      this.generation = generation;
      this.liveCells = liveCells;
      this.nextGeneration = new Map();
      this.deadCells = new Map();
    }
  
    getGeneration() {
      return this.generation;
    }
  
    getLiveCells() {
      return this.liveCells;
    }
  
    addCell(position) {
      this.liveCells.set(position.x + " , " + position.y, {x: position.x, y: position.y});
    }
  
    removeCell(position) {
      this.liveCells.delete(position);
    }
  
    isCellAlive(position) {
      return this.liveCells.has(position);
    }
  
    storeCell(positon) {
        if(this.isCellAlive(posiiton.x + " , " + position.y)){
            this.removeCell(positon.x + " , " + position.y);
        }else {
            this.addCell(positon);
        }
        return new Logic(this.generation, this.liveCells);
    }
  
    addGeneration(){
        this.liveCells.forEach((item) => {
            this.calculateLiveCellsNeighbors(item);
          })
      
          this.deadCells.forEach((item) => {
            this.calculateDeadCellsNeighbors(item);
          })
      
          this.generation++;
      
          return new Logic(this.generation, this.nextGeneration)
    }
  
   LiveCellsNeighbors(position) {
        var liveNeighbors = 0; // how many live neighbors 
        
        //check all the cells neighbors
        for(var i = position.x - 1; i <= position.x + 1; i++){
          for(var j = position.y - 1; j <= position.y + 1; j++){
            
            // to make sure that  if the cell we are currently on iss a live cell
            if(i === position.x && j === position.y)
              continue;
    
            //if the neighboor cell is alive we add to the liveNeighbors or it goes to the deadCell
            if(this.isCellAlive(i + " , " + j)){
                liveNeighbors++;
            } else {
              this.deadCells.set(i + " , " +j, {x: i, y: j})
            }
          }
        }
        
        // 2 or 3 live neighbors, cell stays alive and lives on to the next generation.
        if((liveNeighbors === 2 || liveNeighbors === 3))
          this.nextGeneration.set(position.x + " , " + position.y, {x: position.x, y: position.y});
      }
  
    DeadCellsNeighbors() {
    }
  
  }