function init() {

  //elements
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start-btn')
  const instructions = document.querySelector('#instructions')
  const gameover = document.querySelector('#gameover')


  //* variables
  //grid variables
  let width = 5
  let cellCount = width * width
  let cells = []
  let homeRowStart = (width * width) - width
  let totalGrid = width * width

  // Level variable
  const score = document.querySelector('#score')
  const lives = document.querySelector('#lives')
  const level = document.querySelector('#level')
  let currentScore = 0
  let currentLives = 3
  let currentLevel = 1
  let leftTimer
  let rightTimer
  let difficulty = 1

  // player variables
  let homePosition = ((width * width) - (Math.ceil(width / 2)))
  let currentPosition = homePosition

  // enemy variables
  const enemyClasses = ['enemyOne', 'enemyTwo', 'enemyThree']
  let enemyCount = width + currentLevel
  const baddyStart1 = width
  const baddyStart2 = (width * 3) - 1
  const baddyStart3 = width * 3
  let enemyOneCurPos = baddyStart1
  let enemyTwoCurPos = baddyStart2
  let enemyThreeCurPos = baddyStart3

  //? ====== Level ======

  //exe 
  function randomPosition() {
    let randomPosition = Math.floor(Math.random() * totalGrid)
    return randomPosition
  }

  //? ====== player ======

  //exe
  //* add/remove player
  function addPlayer(position) {
    cells[position].classList.add('player')
    if (cells[position].classList.contains('finish')) {
      playerWin()
    } else
      if (enemyClasses.some(className => cells[position].classList.contains(className))) {
        playerTouch()
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
      clearBaddy()
      startButton.disabled = false
      console.log('gameover')
    }
  }
  //* player collide
  function playerTouch() {
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
      clearBaddy()
      console.log('game over')
    }
  }

  //* player win 
  function playerWin() {
    currentScore += (100 * width)
    score.innerHTML = `${currentScore}`
    currentLevel += 1
    level.innerHTML = `${currentLevel}`
    removePlayer(currentPosition)
    currentPosition = homePosition
    addPlayer(currentPosition)
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
    if (cells[position].classList.contains('player')) {
      playerTouch()
    }
  }
  function addBaddyTwo(position) {
    // if (cells[position].classList.contains('finish') === false && cells[position].classList.contains('home') === false) { // random spwan static mob
    //   cells[position].classList.add('enemyOne')
    // }
    cells[position].classList.add('enemyTwo')
    if (cells[position].classList.contains('player')) {
      playerTouch()
    }
  }
  function addBaddyThree(position) {
    // if (cells[position].classList.contains('finish') === false && cells[position].classList.contains('home') === false) { // random spwan static mob
    //   cells[position].classList.add('enemyOne')
    // }
    cells[position].classList.add('enemyThree')
    if (cells[position].classList.contains('player')) {
      playerTouch()
    }
  }
  function removeBaddy(position) {
    cells[position].classList.remove('enemyOne', 'enemyTwo', 'enemyThree')
  }
  ///clear board after gameover
  function clearBaddy() {
    for (let i = 0; i < totalGrid; i++) {
      cells[i].classList.remove('enemyOne', 'enemyTwo', 'enemyThree')
    }
  }
  //* enemy movement
  function baddyMoveRight(removeEn, addEn, current, start, x) {
    rightTimer = setInterval(() => {
      if (currentLives > 0) {
        removeEn(current)
        if (current === (width * 2) - 1 || current === (width * 4) - 1) {
          removeEn(current)
          addEn(start)
          current = start - 1
          current++
        } else {
          current++
          addEn(current)
        }
      } else {
        gameoverState()
      }
    }, x)
  }
  function baddyMoveLeft(removeEn, addEn, current, start, x) {
    leftTimer = setInterval(() => {
      if (currentLives > 0) {
        removeEn(current)
        if (current === width * 2) {
          removeEn(current)
          addEn(start)
          current = start + 1
          current--
        } else {
          current--
          addEn(current)
        }
      } else if (currentLives === 0) {
        gameoverState()
      }
    }, x)
  }

  //? ====== grid ======

  //exe
  //* make grid

  function makeGrid() {
    // resetGrid()
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
      if (width === 7) {
        cell.style.width = 'calc(100% /7)'
        cell.style.height = 'calc(100% /7)'
      } else if (width === 9) {
        cell.style.width = 'calc(100% /9)'
        cell.style.height = 'calc(100% /9)'
      } else {
        cell.style.width = 'calc(100% /5)'
        cell.style.height = 'calc(100% /5)'
      }
    }
  }

  function resetGrid() {
    grid.querySelectorAll('div').forEach(n => n.remove())
  }

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
  // event
  makeGrid()
  setFinish()
  setHome()



  // ?======== game states =======

  //exe
  //*depending on difficulty run these gamestates
  function gridFive() {

  }
  function gridSeven() {

  }
  function gridNine() {

  }

  function reset() {
    enemyOneCurPos = baddyStart1
    enemyTwoCurPos = baddyStart2
    enemyThreeCurPos = baddyStart3
    currentScore = 0
    currentLives = 3
    currentLevel = 1
    score.innerHTML = `${currentScore}`
    lives.innerHTML = `${currentLives}`
    level.innerHTML = `${currentLevel}`
    currentPosition = homePosition
    clearInterval(leftTimer)
    clearInterval(rightTimer)
  }

  //* game over
  function gameoverState() {
    gameover.style.display = 'block'
    clearBaddy()
    clearInterval(leftTimer)
    clearInterval(rightTimer)
    startButton.disabled = false
  }
  //? game start/end 


  function startgame() {
    reset()
    gameover.style.display = 'none'
    instructions.style.display = 'none'
    setTimeout(() => {
      addPlayer(homePosition)
      addBaddyOne(baddyStart1)
      addBaddyTwo(baddyStart2)
      addBaddyThree(baddyStart3)
      baddyMoveRight(removeBaddy, addBaddyOne, enemyOneCurPos, baddyStart1, 1000)
      baddyMoveLeft(removeBaddy, addBaddyTwo, enemyTwoCurPos, baddyStart2, 500)
      baddyMoveRight(removeBaddy, addBaddyThree, enemyThreeCurPos, baddyStart3, 1500)

    }, 1000);
    startButton.disabled = true
  }
  // events
  startButton.addEventListener('click', startgame)
}
window.addEventListener('DOMContentLoaded', init)
