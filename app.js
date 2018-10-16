//MAKE A SQUARE WITH 16 PIECES (4X4).
// WRITE CODE FOR IT, GIVE THE GRID A CLASS E.G. 'GRID16', REMOVE THIS CLASS ON LOAD, IF THEY PRESS
//THE 16 BUTTON, add this class and remove the 3x3 grid using DOM manipulation.
//
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
const congrats = document.querySelector('aside .congrats');
let clickCount = 1;
let newArray = [];
const correctArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let currentOrder = [];
const sneakPeak = document.getElementById('sneak');

const imgClassOne = document.querySelector('section .image1');
const imgClassTwo = document.querySelector('section .image2');
const imgClassThree = document.querySelector('section .image3');
const imgClassFour = document.querySelector('section .image4');
const imgClassFive = document.querySelector('section .image5');
const imgClassSix = document.querySelector('section .image6');
const imgClassSeven = document.querySelector('section .image7');
const imgClassEight = document.querySelector('section .image8');
const imgClassZero = document.querySelector('section .image0');

// const squaresArray = [squareOne, squareTwo, squareThree, squareFour, squareFive, squareSix, squareSeven, squareEight, blankSquare];
const squaresArray = [blankSquare, squareOne, squareTwo, squareThree, squareFour, squareFive, squareSix, squareSeven, squareEight];
// const numbersInOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//remove class that says you've won at start.
congrats.classList.remove('congrats');

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
  });
}

resetButton.addEventListener('click', function (){
  clickCounter.textContent = 'Click Count = ' + 0;
  clickCount = 1;
  congrats.classList.remove('congrats');
  shuffle();
});

reshuffle.addEventListener('click', function (){
  shuffle();
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

//
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
  console.log('as string', correctToString);
  console.log('as string', currentToString);

  if(correctToString === currentToString) {
    console.log('YOU WIN YAYAYA');
    congrats.classList.add('congrats');
  } else {
    console.log('no win yet');
    congrats.classList.remove('congrats');
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

sneakPeak.addEventListener('click', function(){

  alert('HELLLOOPP');
  blankSquare.classList.add(imgClassZero);
  squareOne.classList.add(imgClassOne);
  squareTwo.classList.add(imgClassTwo);
  squareThree.classList.add(imgClassThree);
  squareFour.classList.add(imgClassFour);
  squareFive.classList.add(imgClassFive);
  squareSix.classList.add(imgClassSix);
  squareSeven.classList.add(imgClassSeven);
  squareEight.classList.add(imgClassEight);
});
