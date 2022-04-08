function init() {

  //elements
  const grid = document.querySelector('.grid')

  //* variables
  //grid variables
  let width = 5
  let cellCount = width * width
  let cells = []
  let homeRowStart = (width * width) - width
  let totalGrid = width * width
  // player variables
  const playerClass = 'player'
  let homePosition = ((width * width) - (Math.ceil(width / 2)))
  let currentPosition = homePosition
  // Level variable
  let score = document.querySelector('.score')
  let lives = document.querySelector('.lives')
  let level = document.querySelector('.level')

  //? ====== Level ======

  //exe 
  function winCondition(position) {
    if (cells[position].classList.contains('finish')){
      score += 10
      level += 1
      removePlayer(currentPosition)
      addPlayer(homePosition)
    }
  }
  // function loseCondition(event) {
  // }


  //? ====== player ======

  //exe
  //* add/remove player
  function addPlayer(position) {
    cells[position].classList.add('player')
    if (cells[position].classList.contains('finish')){
      score += 10
      level += 1
      removePlayer(currentPosition)
      currentPosition = homePosition
      addPlayer(currentPosition)
      console.log(score)
    }
  }
  function removePlayer(position) {
    cells[position].classList.remove('player')
  }

  //* player movement
  function keyPress(event) {
    const key = event.keyCode
    const up = 38
    const down = 40
    const left = 37
    const right = 39

    removePlayer(currentPosition) // remove player 

    if (key === up && currentPosition >= width) {
      currentPosition -= width
    
    } else if (key === down && currentPosition + width <= cellCount - 1) {
      currentPosition += width
    } else if (key === left && currentPosition % width !== 0) {
      currentPosition--
    } else if (key === right && currentPosition % width !== width - 1) {
      currentPosition++
    } else {
      console.log('Invalid Key')
    }

    addPlayer(currentPosition)
  }
  //event
  document.addEventListener('keydown', keyPress)


  //? ====== grid ======


  //exe
  //* make grid

  function makeGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
    }

  }
  makeGrid()

  //* set homeRow and winRow

  function setHome() {
    for (let i = homeRowStart; i < totalGrid; i++) {
      cells[i].classList.add('home')
    }
  }

  function setFinish() {
    for (let i = 0; i < width; i++) {
      cells[i].classList.add('finish')
    }
  }

  setFinish()
  setHome()
  addPlayer(homePosition)
}
window.addEventListener('DOMContentLoaded', init)
