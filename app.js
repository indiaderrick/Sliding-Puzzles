//DOM & GLOBAL VARIABLES:
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
const enter = document.getElementById('enter');
const winSound = document.getElementById('winSound');
const wrong = document.getElementById('wrong');
const congrats = document.querySelector('aside .congrats');
const sneakPeak = document.getElementById('sneak');
const theFiller = document.getElementById('filler');
const startColor = document.getElementById('first');
const shuffleColor = document.getElementById('second');
const page = document.querySelector('body');
const main = document.querySelector('main');
const startPage = document.getElementById('startPage');
const replay = document.querySelector('.replay');
const start = document.getElementById('startGame');
const grid = document.getElementById('grid');
const perfectGrid = document.getElementById('gridPerfect');
const container = document.querySelector('.hiders');
const slideLeft = document.querySelector('.slideOutLeft');
const slideRight = document.querySelector('.slideOutRight');
const input = document.querySelector('input');
const riri = document.querySelector('.riri');
const hide = document.querySelector('.hide');

let clickCount = 1;
let newArray = [];
const correctArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let currentOrder = [];
const squaresArray = [blankSquare, squareOne, squareTwo, squareThree, squareFour, squareFive, squareSix, squareSeven, squareEight];

// SHOULD HAVE DONE OBJECTS FOR EACH SQUARE - saved number and background image in them
// this should all be in a function or object:
hide.style.display = 'none';
riri.style.display = 'none';
replay.style.display = 'none';
blankSquare.classList.remove('rotate');
perfectGrid.style.display = 'none';
main.style.display = 'none';
page.style.backgroundColor = 'white';
startPage.style.textAlign = 'center';
startPage.style.marginTop = '130px';
theFiller.style.display = 'none';
shuffleColor.style.color = 'white';
resetButton.textContent = 'INSTRUCTIONS';
resetButton.style.textDecoration = 'underline dotted';
clickCounter.style.display = 'none';
sneakPeak.style.display = 'none';

// START GAME PAGE:
const name = input.value;
const nameUpper = name.charAt(0).toUpperCase() + name.substr(1);

function startGame(){
  start.addEventListener('click', function() {
    main.style.display = 'block';
    page.style.backgroundColor = 'black';
    startPage.style.display = 'none';
    slideLeft.classList.add('slideOutLeft');
    slideRight.classList.add('slideOutRight');
    page.classList.remove('body');
    const name = input.value;
    const nameUpper = name.charAt(0).toUpperCase() + name.substr(1);
    congrats.textContent = `Hello ${nameUpper} . The aim of the game is to slide the puzzle back to its original state. Only boxes above/below and to the left/right of the black box can be moved. The clicked box will slide to fill the space of the black box.`;
    enter.play();
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
    newArray = reshuffledArray;
  }
}

function shuffle() {
  getNewArray();
  squaresArray.forEach((square, index) => {
    square.classList.remove(square.className);
    square.textContent = newArray[index];
    square.classList.add(`image${newArray[index]}`);

    resetButton.style.display = 'inline';
    resetButton.textContent = 'RESET';
    resetButton.style.border = 'solid lightgreen 2px';
    resetButton.style.textDecoration = 'none';

  });
}

resetButton.addEventListener('click', function (){
  clickCounter.textContent = 'CLICK COUNT = ' + 0;
  clickCount = 1;
  congrats.style.display = 'none';
  riri.style.display = 'none';
  hide.style.display = 'none';
  shuffle();
});

reshuffle.addEventListener('click', function (){
  shuffle();
  clickCounter.style.display = 'inline';
  sneakPeak.style.display = 'inline';
  congrats.style.display = 'none';
  startColor.style.color = 'white';
  shuffleColor.style.color = 'lightgreen';
  blankSquare.classList.remove('win');
  container.style.display = 'none';
  container.classList.remove('hiders');
  // resetButton.textContent = 'RESET';
  // resetButton.style.border = 'none';
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
    //this looks awful - should all be in an object or something!!!
    blankSquare.classList.add('win');
    replay.style.display = 'inline';
    blankSquare.classList.add('rotate');
    replay.style.display = 'block';
    replay.classList.add('replay');
    reshuffle.style.display = 'none';
    congrats.textContent = '✰YOU WON✰';
    //maybe need to set the display of the congrats to block.
    resetButton.style.border = 'none';
    congrats.classList.add('congrats');
    congrats.style.marginBottom = '40px';
    congrats.style.color = 'lightgreen';
    congrats.style.fontSize = '80px';
    hide.style.display = 'none';
    riri.style.display = 'none';
    resetButton.textContent = '';
    winSound.play();
    const name = input.value;
    const nameUpper = name.toUpperCase();
    clickCounter.textContent = `↭ ${nameUpper}'s TOTAL SCORE = ${clickCount} ↭`;
    sneakPeak.style.display = 'none';
    theFiller.style.display = 'block';
    container.classList.remove('hiders');
    container.style.display = 'none';
  } else {
    congrats.classList.remove('congrats');
    startColor.style.color = 'white';
    shuffleColor.style.color = 'lightgreen';
    resetButton.textContent = 'RESET';
    resetButton.style.textDecoration = 'none';
    resetButton.style.border = 'solid lightgreen 2px';
    clickCounter.style.display = 'inline';
    sneakPeak.style.display = 'inline';
  }
  currentOrder = [];
}
//EVENT LISTENERS FOR EACH SQUARE, RUNS THE FUNCTION THE CHECK IF THE SQUARE CAN MOVE, AND IF IT
//CAN, IT THEN FUNS THE FUNCTION TO MOVE IT. ALSO ADDS ONE TO CLICK COUNT AND PLAYS SOUND
//EACH TIME A SQUARE MOVES SUCCESSFULLY.

squaresArray.forEach(function(square) {
  square.addEventListener('click', function () {
    const indexOfClickedSquare = squaresArray.indexOf(square);
    if(squareCanMoveLeft(indexOfClickedSquare)) {
      clickCounter.textContent = 'CLICK COUNT = ' + clickCount++;
      sound.play();
      moveSquareLeft(indexOfClickedSquare);
    } else if (squareCanMoveRight(indexOfClickedSquare)) {
      clickCounter.textContent = 'CLICK COUNT = ' + clickCount++;
      sound.play();
      moveSquareRight(indexOfClickedSquare);
      console.log('The click count is ', clickCount);
    } else if (squareCanMoveDown(indexOfClickedSquare)) {
      clickCounter.textContent = 'CLICK COUNT = ' + clickCount++;
      sound.play();
      moveSquareDown(indexOfClickedSquare);
      console.log('The click count is ', clickCount);
    } else if (squareCanMoveUp(indexOfClickedSquare)) {
      clickCounter.textContent = 'CLICK COUNT = ' + clickCount++;
      sound.play();
      moveSquareUp(indexOfClickedSquare);
    } else {
      wrong.play();
      console.log('square cant move');
      //add a sound here...
    }
  });
});

function moveSquareRight(index) {
  //store the current square & the square to the right in their own consts.
  const squareOnRight = squaresArray[index + 1];
  const currentSquare = squaresArray[index];
  // store the class name of each of these in a const.
  const background1 = currentSquare.className;
  const background2 = squareOnRight.className;

  if (currentSquare === squaresArray[2] || currentSquare === squaresArray[5] || currentSquare === squaresArray[8]) {
    return;
  }
  //set the text content of the square on the right to the one of the current square, and set the current square to zero.
  // Necessary for the comparisons!!
  squareOnRight.textContent = currentSquare.textContent;
  currentSquare.textContent = 0;
  //in order to get them to 'swap places', swap their class names - this will switch the background image.
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
  riri.style.display = 'block';
  hide.style.display = 'inline';
});

riri.addEventListener('click', function(){
  riri.style.display = 'none';
  hide.style.display = 'none';
});
