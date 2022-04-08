function init() {

  //elements
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start-btn')

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
  // enemy variables
  const enemyOneClass = 'badOne'
  const enemyTwoClass = 'badTwo'

  // Level variable
  const score = document.querySelector('#score')
  const lives = document.querySelector('#lives')
  const level = document.querySelector('#level')
  let currentScore = 0
  let currentLives = 3
  let currentLevel = 1



  //? ====== Level ======

  //exe 
  function randomPosition() {
    let randomPosition = Math.floor(Math.random() * totalGrid)
    return randomPosition
  }
  // function loseCondition(event) {
  // }


  //? ====== player ======

  //exe
  //* add/remove player
  function addPlayer(position) {
    cells[position].classList.add('player')
    if (cells[position].classList.contains('finish')) {
      currentScore += 100
      score.innerHTML = `${currentScore}`
      currentLevel += 1
      level.innerHTML = `${currentLevel}`
      removePlayer(currentPosition)
      currentPosition = homePosition
      addPlayer(currentPosition)
      console.log(score)
      console.log(currentLives)
    } else if (cells[position].classList.contains('enemyOne')) {
      if (currentLives > 0) {
        currentLives--
        lives.innerHTML = `${currentLives}`
        currentScore -= 10
        score.innerHTML = `${currentScore}`
        removePlayer(currentPosition)
        currentPosition = homePosition
        addPlayer(currentPosition)
        console.log(currentLives)
      } else {
        removePlayer(currentPosition)
      }
    }
  }
  function removePlayer(position) {
    cells[position].classList.remove('player')
  }

  //* player movement
  function keyPress(event) {
    if (currentLives > 0) {
      const key = event.keyCode
      const up = 38
      const down = 40
      const left = 37
      const right = 39

      removePlayer(currentPosition) // remove player 

      if (key === up && currentPosition >= width) {
        currentPosition -= width
        currentScore += 10
        score.innerHTML = `${currentScore}`
      } else if (key === down && currentPosition + width <= cellCount - 1) {
        currentScore -= 5
        score.innerHTML = `${currentScore}`
        currentPosition += width
      } else if (key === left && currentPosition % width !== 0) {
        currentPosition--
      } else if (key === right && currentPosition % width !== width - 1) {
        currentPosition++
      } else {
        console.log('Invalid Key')
      }

      addPlayer(currentPosition)
    } else{
      console.log('gameover')
    }
  }
  //event
  document.addEventListener('keydown', keyPress)


  //? ====== Enemy ======
  function addBaddy(position) {
    if (cells[position].classList.contains('finish') === false && cells[position].classList.contains('home') === false) {
      cells[position].classList.add('enemyOne')
    }
  }
  function removeBaddy(position) {
    if (cells[position].classList.contains('finish') === false && cells[position].classList.contains('home') === false) {
      cells[position].classList.add('enemyOne')
    }
  }
  function clearBaddy() {
    for (let i = 0; i < totalGrid; i++) {
      cells[i].classList.remove('enemyOne')
    }
  }


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
  //? game start/end 

  /// ?======== events =======
  setFinish()
  setHome()

  function startgame() {
    clearBaddy()
    currentScore = 0
    currentLives = 3
    currentLevel = 1
    score.innerHTML = `${currentScore}`
    lives.innerHTML = `${currentLives}`
    level.innerHTML = `${currentLevel}`
    currentPosition = homePosition
    addPlayer(homePosition)
    addBaddy(randomPosition())
    addBaddy(randomPosition())
    addBaddy(randomPosition())
  }
  startButton.addEventListener('click', startgame)
}
window.addEventListener('DOMContentLoaded', init)
