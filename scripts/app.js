function init() {
  const maze = document.querySelector('.maze')
  const startButton = document.querySelector('button')
  const threeLives = document.querySelector('.three-lifes')
  const twoLives = document.querySelector('.two-lifes')
  const oneLives = document.querySelector('.one-life')
  const audio = document.querySelector('audio')

  const width = 20
  const cellCount = width * width
  const cells = []

  const aMazeing = [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 2,
    2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2,
    2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2,
    2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 3, 2, 2, 2, 3, 2, 3, 2, 3, 2,
    2, 3, 2, 5, 2, 3, 2, 5, 2, 3, 3, 2, 5, 2, 3, 2, 3, 2, 3, 2,
    2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2,
    2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 2,
    2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 6, 2, 2, 3, 2, 2, 2, 3, 3, 2,
    2, 3, 2, 3, 2, 3, 3, 3, 2, 6, 6, 6, 2, 3, 3, 3, 3, 3, 2, 2,
    2, 3, 3, 3, 3, 3, 2, 3, 2, 2, 6, 2, 2, 3, 2, 2, 3, 3, 3, 2,
    2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 2,
    2, 3, 2, 3, 3, 3, 2, 3, 2, 3, 2, 2, 3, 2, 3, 2, 3, 3, 3, 2,
    2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2,
    2, 3, 3, 3, 2, 3, 3, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3, 2, 3, 2,
    2, 3, 2, 3, 3, 3, 2, 3, 2, 2, 3, 3, 3, 2, 2, 2, 3, 2, 3, 2,
    2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 3, 2, 5, 2, 3, 3, 3, 2,
    2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 3, 2, 3, 2, 2, 2, 2, 3, 2, 2,
    2, 4, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 4, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
  ]

  const babushkaScore = document.querySelector('.counter')
  let countBabushkaPoints = 0

  const livesLeft = document.querySelector('.livesLeft')
  let countLives = 3
  
  const startingMatrushkaPosition = 369
  let currentMatrushkaPosition = 369
  const matrushkaClass = 'matrushka'

  const startingEnemyPosition = 150
  let currentEnemyPosition = 150
  const enemyClass = 'enemy'

  let startButtonValue = false

  // ! START GAME

  let timer

  function startGame() {
    startButton.disabled = true
    startButtonValue = true
    music.play()
    timer = setInterval(() => {
      enemyMovement()
    }, 200)
    
  }

  const music = new Audio('sounds/trololo.mp3')
  const coins = new Audio('sounds/coin-drop-4.mp3')
  const lostLife = new Audio('sounds/hahaha.mp3')

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {               
      const cell = document.createElement('div')                                       
      maze.appendChild(cell)                            
      cells.push(cell)    
      addObstacle(i)
      addLittleBabushka(i)
      addBigBabushka(i)
    }
    
    addEnemy(currentEnemyPosition)
    addMatrushka(currentMatrushkaPosition)
  }

  // ! ENEMY

  function addEnemy(position) {
    cells[position].classList.add(enemyClass)
  }

  function removeEnemy(position) {
    cells[position].classList.remove(enemyClass)
  }

  // ! LIVES

  threeLives.classList.add('three-lifes')
  twoLives.classList.add('two-lifes')
  oneLives.classList.add('one-life')

  // addLives()

  function reduceLives() {
    countLives--
    if (countLives === 2) {
      oneLives.classList.remove('one-life')
    } else if (countLives === 1) {
      twoLives.classList.remove('two-lifes')
    }
    // } else if (countLives === 0) {
    //   threeLives.classList.ast('three-lifes')
    // }
    livesLeft.innerText = parseFloat(countLives)
  }

  let random

  function enemyMovement() {
    const direction = [1, -1, -width, width]      // right, left, up, down
    random = Math.floor(Math.random() * direction.length)
    const finallyStartMoving = direction[random]

    removeEnemy(currentEnemyPosition)

    if (cells[currentEnemyPosition] === cells[currentMatrushkaPosition]) {
      reduceLives()
      // audioPlaying('trololo', audio)
      // audioPlaying('hahaha', audio)
      lostLife.play()
      music.pause()
      music.currentTime = 0.0
      if (countLives !== 0) {
        gameOverCheck()
      } else {
        endGame()
      }
    }

    if (cells[currentEnemyPosition + finallyStartMoving].classList.contains('obstacle')) {
      currentEnemyPosition += 0
      addEnemy(currentEnemyPosition)
    } else {
      currentEnemyPosition += finallyStartMoving
      addEnemy(currentEnemyPosition)
    }
  }

  // ! MATRUSHKA

  function addMatrushka(position) {
    cells[position].classList.add(matrushkaClass)
  }

  function removeMatrushka(position) {
    cells[position].classList.remove(matrushkaClass)
  }

// ! HANDLING PLAYER KEYS

  function handleKeyUp(event) {
    if (startButtonValue === true) {
      const key = event.keyCode
      removeMatrushka(currentMatrushkaPosition)

      if (key === 39) {                 // ! We are going RIGHT
        if (cells[currentMatrushkaPosition + 1].classList.contains('obstacle')) {
          currentMatrushkaPosition += 0
        } else if (currentMatrushkaPosition - 1) {        
          currentMatrushkaPosition++
          gettingSmallBabushka()
          gettingBigBabushka()
        }
        removeLittleBabushka()
        removeBigBabushka()
      } else if (key === 37) {          // ! We are going LEFT
        if (cells[currentMatrushkaPosition - 1].classList.contains('obstacle')) {
          currentMatrushkaPosition -= 0
        } else if (currentMatrushkaPosition + 1) {         
          currentMatrushkaPosition--
          gettingSmallBabushka()
          gettingBigBabushka()
        }
        removeLittleBabushka()
        removeBigBabushka()
      } else if (key === 38) {       // ! We are going UP
        if (cells[currentMatrushkaPosition - width].classList.contains('obstacle')) {
          currentMatrushkaPosition
        } else if (currentMatrushkaPosition - width) {    
          currentMatrushkaPosition -= width
          gettingSmallBabushka()
          gettingBigBabushka()
        }
        removeLittleBabushka()
        removeBigBabushka()
      } else if (key === 40) {      // ! We are going DOWN
        if (cells[currentMatrushkaPosition + width].classList.contains('obstacle')) {
          currentMatrushkaPosition
        } else if (currentMatrushkaPosition + width) {     
          currentMatrushkaPosition += width
          gettingSmallBabushka()
          gettingBigBabushka()
        }
        removeLittleBabushka()
        removeBigBabushka()
      } 

      addMatrushka(currentMatrushkaPosition)
    }
  }

  // ! ADDING AND REMOVING ELEMENTS TO GRID

  // ! Adding obstacles
  function addObstacle(index) {
    if (aMazeing[index] === 2) {
      cells[index].classList.add('obstacle')
    }
  } 

  // ! Adding little Babushka, for now just some random color
  function addLittleBabushka(index) {
    if (aMazeing[index] === 3) {
      cells[index].classList.add('points')
    }
  }

  // ! Removing little Babushka, not yet properly styled
  function removeLittleBabushka() {
    if (cells[currentMatrushkaPosition].classList.contains('points')) {
      cells[currentMatrushkaPosition].classList.remove('points')
    }
  }


  // ! Adding big Babushka, not yet properly styled
  function addBigBabushka(index) {
    if (aMazeing[index] === 4) {
      cells[index].classList.add('bigPoints')
    }
  }

  // ! Removing big Babushka, not zet properly styled
  function removeBigBabushka() {
    if (cells[currentMatrushkaPosition].classList.contains('bigPoints')) {
      cells[currentMatrushkaPosition].classList.remove('bigPoints')
    } 
  }

  // ! Getting small points function to prevent the repetition of code

  function gettingSmallBabushka() {
    if (cells[currentMatrushkaPosition].classList.contains('points')) {
      countBabushkaPoints += 10
      // audioPlaying('coin-drop-4', audio)
      coins.play()
      babushkaScore.innerText = parseFloat(countBabushkaPoints)
    }
  }

  function gettingBigBabushka() {
    if (cells[currentMatrushkaPosition].classList.contains('bigPoints')) {
      countBabushkaPoints += 100
      babushkaScore.innerText = parseFloat(countBabushkaPoints)
    }
  }


  // ! Checking for game over 
  function gameOverCheck() {
    console.log('RESTARTING')
    clearInterval(timer)
    startButton.disabled = false
    removeMatrushka(currentMatrushkaPosition)
    removeEnemy(currentEnemyPosition)
    currentMatrushkaPosition = 369
    currentEnemyPosition = 150
    addMatrushka(startingMatrushkaPosition)
    addEnemy(startingEnemyPosition)
    countBabushkaPoints = 0
    // babushkaScore.innerText = parseFloat(countBabushkaPoints)
    countLives
    // enemyMovement(
  }

  // ! End game

  function endGame() {
    clearInterval(timer)
    removeMatrushka(currentMatrushkaPosition)
    removeEnemy(currentEnemyPosition)
    currentMatrushkaPosition = 369
    currentEnemyPosition = 150
    addMatrushka(currentMatrushkaPosition)
    addEnemy(currentEnemyPosition)
    startGame()
    if (confirm(`GAME OVER. Your score was ${countBabushkaPoints}`)) {
      window.location.reload()
    }
  }


  // ! Audio function

  function audioPlaying(sound, audio) {
    audio.src = `sounds/${sound}.mp3`
    audio.play()
  }

  function gamePlaying(sound, audio) {
    audio.src = `sounds/${sound}.mp3`
    audio.play()
  }

  // ! Event listener for keyboard keys.
  document.addEventListener('keyup', handleKeyUp)
  startButton.addEventListener('click', startGame)

  createGrid()

}

window.addEventListener('DOMContentLoaded', init)