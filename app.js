//MAKE A SQUARE WITH 16 PIECES (4X4).
// WRITE CODE FOR IT, GIVE THE GRID A CLASS E.G. 'GRID16', REMOVE THIS CLASS ON LOAD, IF THEY PRESS
//THE 16 BUTTON, add this class and remove the 3x3 grid using DOM manipulation.
//make it so that you can win when you first load the pages...
//make it so that it doesnt change size when you zoom in or out.
const squareOne = document.getElementById('one');
const squareTwo = document.getElementById('two');
const squareThree = document.getElementById('three');
const squareFour = document.getElementById('four');
const squareFive = document.getElementById('five');
const squareSix = document.getElementById('six');
const squareSeven = document.getElementById('seven');
const squareEight = document.getElementById('eight');
const blankSquare = document.getElementById('zero');
const clickCounter = document.getElementById('clickCount');
const resetButton = document.getElementById('resetButton');
const reshuffle = document.getElementById('reshuffle');
const sound = document.getElementById('push');
const winSound = document.getElementById('winSound');
const congrats = document.querySelector('aside .congrats');
const sneakPeak = document.getElementById('sneak');
const theFiller = document.getElementById('filler');
const startColor = document.getElementById('first');
const shuffleColor = document.getElementById('second');
const page = document.querySelector('body');
const imgClassOne = document.querySelector('.image1');
const imgClassTwo = document.querySelector('.image2');
const imgClassThree = document.querySelector('.image3');
const imgClassFour = document.querySelector('.image4');
const imgClassFive = document.querySelector('.image5');
const imgClassSix = document.querySelector('.image6');
const imgClassSeven = document.querySelector('.image7');
const imgClassEight = document.querySelector('.image8');
const imgClassZero = document.querySelector('.image0');
const main = document.querySelector('main');
const startPage = document.getElementById('startPage');
const replay = document.querySelector('.replay');
const start = document.getElementById('startGame');
const grid = document.getElementById('grid');
const perfectGrid = document.getElementById('gridPerfect');
let clickCount = 1;
let newArray = [];
const correctArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let currentOrder = [];
const squaresArray = [blankSquare, squareOne, squareTwo, squareThree, squareFour, squareFive, squareSix, squareSeven, squareEight];
perfectGrid.style.display = 'none';
main.style.display = 'none';
page.style.backgroundColor = 'white';
startPage.style.textAlign = 'center';
startPage.style.marginTop = '200px';
replay.classList.remove('replay');
theFiller.style.display = 'none';
shuffleColor.style.color = 'white';
resetButton.textContent = 'INSTRUCTIONS:';
// START GAME PAGE:
function startGame(){
  start.addEventListener('click', function() {
    main.style.display = 'block';
    page.style.backgroundColor = 'black';
    startPage.style.display = 'none';
  });
}
startGame();
// RELOAD PAGE:
replay.addEventListener('click',function () {
  location.reload();
});
// MAKE RANDOM NUMBERS FUNCTION:
function generateRandomNumbers() {
  const randomNumber = Math.floor(Math.random() * 9);
  return randomNumber;
}
// RANDOM NUMBERS ARRAY:

function getNewArray(){
  const reshuffledArray = [];
  while(reshuffledArray.length < 9) {
    const getNumber = generateRandomNumbers();
    if(reshuffledArray.indexOf(getNumber) > -1) continue;
    reshuffledArray.push(getNumber);
    // reshuffledArray[reshuffledArray.length] = getNumber
    console.log('The reshuffled array is ', reshuffledArray);
    newArray = reshuffledArray;
  }
}

function shuffle() {
  getNewArray();
  squaresArray.forEach((square, index) => {
    square.classList.remove(square.className);
    square.textContent = newArray[index];
    square.classList.add(`image${newArray[index]}`);
    //remove reset and start/shuffle, add class replay to

  });
}

resetButton.addEventListener('click', function (){
  clickCounter.textContent = 'Click Count = ' + 0;
  clickCount = 1;
  congrats.style.display = 'none';
  shuffle();
});

reshuffle.addEventListener('click', function (){
  shuffle();
  congrats.style.display = 'none';
  startColor.style.color = 'white';
  shuffleColor.style.color = 'lightgreen';
  blankSquare.classList.remove('win');
  resetButton.textContent = 'RESET';
});

function squareCanMoveLeft(index) {
  const squareOnLeft = squaresArray[index - 1];
  if (!squareOnLeft) {
    return false;
  }
  const numberOfSquareOnLeft = squareOnLeft.textContent;
  if (numberOfSquareOnLeft === '0') {
    return true;
  } else {
    return false;
  }
}

function squareCanMoveRight(index) {
  const squareOnRight = squaresArray[index + 1];
  if (!squareOnRight) {
    return false;
  }
  const numberOfSquareOnRight = squareOnRight.textContent;
  if (numberOfSquareOnRight === '0') {
    return true;
  } else {
    return false;
  }
}

function squareCanMoveUp(index) {
  const squareOnUp = squaresArray[index - 3];
  if (!squareOnUp) {
    return false;
  }
  const numberOfSquareOnUp = squareOnUp.textContent;
  if (numberOfSquareOnUp === '0') {
    return true;
  } else {
    return false;
  }
}

function squareCanMoveDown(index) {
  const squareOnDown = squaresArray[index + 3];
  if (!squareOnDown) {
    return false;
  }
  const numberOfSquareOnDown = squareOnDown.textContent;
  if (numberOfSquareOnDown === '0') {
    return true;
  } else {
    return false;
  }
}

function getCurrentOrder() {
  // const currentOrder = [];
  squaresArray.map(function(square) {
    const numberInSquare = parseInt(square.textContent);
    currentOrder.push(numberInSquare);
    return currentOrder;
  });
}

function checkForWin (){
  getCurrentOrder();
  const correctToString = correctArray.join('');
  const currentToString = currentOrder.join('');
  if(correctToString === currentToString) {
    // congrats.classList.add('congrats');
    blankSquare.classList.add('win');
    replay.classList.add('replay');
    reshuffle.style.display = 'none';
    congrats.style.display = 'inline';
    congrats.textContent = 'YOU WON.';
    congrats.style.fontSize = '80px';
    resetButton.textContent = '';
    winSound.play();
    clickCounter.textContent = 'TOTAL SCORE = ' + clickCount;
    sneakPeak.style.display = 'none';
    theFiller.style.display = 'block';
  } else {
    // congrats.classList.remove('congrats');
    congrats.style.display = 'none';
    startColor.style.color = 'white';
    shuffleColor.style.color = 'lightgreen';
  }
  currentOrder = [];
}
//EVENT LISTENERS FOR EACH SQUARE, RUNS THE FUNCTION THE CHECK IF THE SQUARE CAN MOVE, AND IF IT
//CAN, IT THEN FUNS THE FUNCTION TO MOVE IT. ALSO ADDS ONE TO CLICK COUNT AND PLAYS SOUND
//EACH TIME A SQUARE MOVES SUCCESSFULLY.

squaresArray.forEach(function(square) {
  square.addEventListener('click', function () {
    // const squareNumber = square.textContent;
    const indexOfClickedSquare = squaresArray.indexOf(square);
    if(squareCanMoveLeft(indexOfClickedSquare)) {
      clickCounter.textContent = 'Click Count = ' + clickCount++;
      sound.play();
      moveSquareLeft(indexOfClickedSquare);
    } else if (squareCanMoveRight(indexOfClickedSquare)) {
      clickCounter.textContent = 'Click Count = ' + clickCount++;
      sound.play();
      moveSquareRight(indexOfClickedSquare);
      console.log('The click count is ', clickCount);
    } else if (squareCanMoveDown(indexOfClickedSquare)) {
      clickCounter.textContent = 'Click Count = ' + clickCount++;
      sound.play();
      moveSquareDown(indexOfClickedSquare);
      console.log('The click count is ', clickCount);
    } else if (squareCanMoveUp(indexOfClickedSquare)) {
      clickCounter.textContent = 'Click Count = ' + clickCount++;
      sound.play();
      moveSquareUp(indexOfClickedSquare);
    } else {
      console.log('square cant move');
      //add a sound here...
    }
  });
});

//THIS SECTION MOVES THE IMAGES AROUND AND CHECKS FOR WIN EACH TIME A SQUARE MOVES SUCCESSFULLY.
//COULD MAKE CURRENT DIV GET BIGGER THEN SMALLER WHEN ALL IN RIGHT ORDER. OR ROTAT ALL 360 DEGREES.

function moveSquareRight(index) {
  const squareOnRight = squaresArray[index + 1];
  const currentSquare = squaresArray[index];
  const background1 = currentSquare.className;
  const background2 = squareOnRight.className;
  if (currentSquare === squaresArray[2] || currentSquare === squaresArray[5] || currentSquare === squaresArray[8]) {
    return;
  }
  squareOnRight.textContent = currentSquare.textContent;
  currentSquare.textContent = 0;
  currentSquare.classList.remove(background1);
  squareOnRight.classList.remove(background2);
  squareOnRight.classList.add(background1);
  currentSquare.classList.add(background2);
  checkForWin();
}


function moveSquareLeft(index) {
  const squareOnLeft = squaresArray[index - 1];
  const currentSquare = squaresArray[index];
  const background1 = currentSquare.className;
  const background2 = squareOnLeft.className;
  if (currentSquare === squaresArray[0] || currentSquare === squaresArray[3] || currentSquare === squaresArray[6]) {
    return;
  }
  squareOnLeft.textContent = currentSquare.textContent;
  currentSquare.textContent = 0;
  currentSquare.classList.remove(background1);
  squareOnLeft.classList.remove(background2);
  squareOnLeft.classList.add(background1);
  currentSquare.classList.add(background2);
  checkForWin();
}

function moveSquareUp(index) {
  const squareAbove = squaresArray[index - 3];
  const currentSquare = squaresArray[index];
  const background1 = currentSquare.className;
  const background2 = squareAbove.className;
  squareAbove.textContent = currentSquare.textContent;
  currentSquare.textContent = 0;
  currentSquare.classList.remove(background1);
  squareAbove.classList.remove(background2);
  squareAbove.classList.add(background1);
  currentSquare.classList.add(background2);
  checkForWin();
}

function moveSquareDown(index) {
  const squareBelow = squaresArray[index + 3];
  const currentSquare = squaresArray[index];
  const background1 = currentSquare.className;
  const background2 = squareBelow.className;
  squareBelow.textContent = currentSquare.textContent;
  currentSquare.textContent = 0;
  currentSquare.classList.remove(background1);
  squareBelow.classList.remove(background2);
  squareBelow.classList.add(background1);
  currentSquare.classList.add(background2);
  checkForWin();
}

//TRYING TO MAKE IT SO THAT WHEN YOU HOVER OVER THIS, IT ADDS THE CLASS OF THE ORIGINAL IMAGES
//SO PLAYER CAN SEE THE ORIGINAL TO CHECK PROGRESS. REMOVES THEM WHEN HOVER OFF.

sneakPeak.addEventListener('mouseover', function(){
  //adds correct grid, removes current
  perfectGrid.style.display =
  grid.style.display = 'none';
  // alert('HELLLOOPP');
  // blankSquare.className = '';
  // blankSquare.classList.add('image0');
  // squareOne.className = '';
  // squareOne.classList.add('image1');
  // squareTwo.className = '';
  // squareTwo.classList.add('image2');
  // squareThree.className = '';
  // squareThree.classList.add('image3');
  // squareFour.className = '';
  // squareFour.classList.add('image4');
  // squareFive.className = '';
  // squareFive.classList.add('image5');
  // squareSix.className = '';
  // squareSix.classList.add('image6');
  // squareSeven.className = '';
  // squareSeven.classList.add('image7');
  // squareEight.className = '';
  // squareEight.classList.add('image8');
});
sneakPeak.addEventListener('mouseout', function(){
  perfectGrid.style.display ='none';
  grid.style.display='block';
});
