function init() {

  //elements
  const grid = document.querySelector('.grid')


 

  //? ====== Level ======



  //? ====== player ======
  // player variables
  const playerClass = 'player'
  let homePosition = 22
  let currentPosition = homePosition


  //exe
  //* add/remove player
  function addPlayer(position) {
    cells[position].classList.add('player')
  }
  function removePlayer(position) {
    cells[position].classList.remove('player')
  }

  //* player movement
  function keyPress(event){
    const key = event.keyCode
    const up = 38 
    const down = 40 
    const left = 37
    const right = 39
  
    removePlayer(currentPosition) // remove player 

    if(key === up){
      console.log('pressed up')
    }else if(key === down){
      console.log('pressed down')
    }else if(key === left){
      console.log('pressed left')
    }else if(key === right){
      console.log('pressed right')
    } else {
      console.log('Invalid Key')
    }
  
  
  
  
  
  }
  //event
  document.addEventListener('keydown', keyPress)

   //? ====== grid ======
  //variables
  let width = 5
  let cellCount = width * width
  let cells = []


  //exe
  //* make grid

  function makeGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addPlayer(homePosition)
  }
  makeGrid()



}
window.addEventListener('DOMContentLoaded', init)
