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
  let baddyStart1 = width
  let baddyStart2 = (width * 3) - 1
  let baddyStart3 = width * 3
  let enemyOneCurPos = baddyStart1
  let enemyTwoCurPos = baddyStart2
  let enemyThreeCurPos = baddyStart3


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
    } else {
      console.log('gameover')
    }
  }
  //event
  document.addEventListener('keydown', keyPress)


  //? ====== Enemy ======

  //* add enemy
  function addBaddyOne(position) {
    // if (cells[position].classList.contains('finish') === false && cells[position].classList.contains('home') === false) { // random spwan static mob
    //   cells[position].classList.add('enemyOne')
    // }
    cells[position].classList.add('enemyOne')
  }
  function addBaddyTwo(position) {
    // if (cells[position].classList.contains('finish') === false && cells[position].classList.contains('home') === false) { // random spwan static mob
    //   cells[position].classList.add('enemyOne')
    // }
    cells[position].classList.add('enemyTwo')
  }
  function addBaddyThree(position) {
    // if (cells[position].classList.contains('finish') === false && cells[position].classList.contains('home') === false) { // random spwan static mob
    //   cells[position].classList.add('enemyOne')
    // }
    cells[position].classList.add('enemyThree')
  }
  function removeBaddy(position) {
    cells[position].classList.remove('enemyOne')
    cells[position].classList.remove('enemyTwo')
    cells[position].classList.remove('enemyThree')

  }
  function clearBaddy() {
    for (let i = 0; i < totalGrid; i++) {
      cells[i].classList.remove('enemyOne')
    }
  }
  //* enemy movement
  function baddyMoveRight(take, give, current, start, x) {
    countTimer = setInterval(() => {
      take(current)
      if (current === (width * 2) - 1) {
        take(current)
        give(start)
        current = start - 1
        current++
      } else if(current === (width * 4) - 1) {
        take(current)
        give(start)
        current = start - 1
        current++
      } else {
        current++
        give(current)
      }
    }, x)
  }
  function baddyMoveLeft(take, give, current, start, x) {
    countTimer = setInterval(() => {
      take(current)
    if (current === width * 2) {
      take(current)
      give(start)
      current = start + 1
      current --
    } else {
      current --
      give(current)
    }
  }, x)
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
    addBaddyOne(baddyStart1)
    addBaddyTwo(baddyStart2)
    addBaddyThree(baddyStart3)
    baddyMoveRight(removeBaddy, addBaddyOne, enemyOneCurPos, baddyStart1, 1000)
    baddyMoveLeft(removeBaddy, addBaddyTwo, enemyTwoCurPos, baddyStart2, 500)
    baddyMoveRight(removeBaddy, addBaddyThree, enemyThreeCurPos, baddyStart3, 1500)


  }
  startButton.addEventListener('click', startgame)
}
window.addEventListener('DOMContentLoaded', init)
