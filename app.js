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

// const squaresArray = [squareOne, squareTwo, squareThree, squareFour, squareFive, squareSix, squareSeven, squareEight, blankSquare];
const squaresArray = [blankSquare, squareOne, squareTwo, squareThree, squareFour, squareFive, squareSix, squareSeven, squareEight];
const numbersInOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
// function checkForWin() {
//   const currentOrder = [];
//   squaresArray.forEach(function(square) {
//     const numberInSquare = square.textContent;
//     console.log(numberInSquare);
//     currentOrder.push(numberInSquare);
//     console.log(currentOrder);
//   });
//   currentOrder.filer((number, index, array) => {
//     if(index === 0) {
//       return true;
//     } else {
//       return number === array[index - 1] + 1;
//     }
//   }).length === currentOrder.length;
// }
//create a new array with the ordered numbers. Get the current array and iterate through both
// to compare the values at each index. IF === the same, then player has won.
//place this check for win function inside function that moves boxes.

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
  const correctToString = correctArray.join ('');
  const currentToString = currentOrder.join ('');
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
// const currentOrderAsNumbers =
//   const toNumber = parseInt(currentOrder);
//   if(toNumber === correctArray) {
//     console.log('YOU WON');
//   } else {
//     console.log('naaaah');
//   }
// }
// function haveIWon() {
//   getCurrentOrder();
//   const toNumber = parseInt(currentOrder);
//   if(toNumber === correctArray) {
//     console.log('YOU WON');
//   } else {
//     console.log('naaaah');
//   }
// }

//THIS FUNCTION DOESNT WORK. ITS RETURNING TRUE STRAIGHT AWAY.
//WRITE ARRAY - correct array...... and compare them!!!
// function haveIWon() {
//   getCurrentOrder();
//   const check = currentOrder.filter((number, index, array) => {
//     if(index === 0) {
//       return true;
//     } else {
//       return number === array[index - 1] + 1;
//     }
//   }).length === currentOrder.length;
//   if(check){
//     console.log('You have WON THE GAME');
//     congrats.classList.add('congrats');
//   } else {
//     console.log('not quite yet');
//   }
// }

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

// getNewArray();
// squaresArray.forEach((square, index) => {
//   //remove the current class
//   square.classList.remove(square.className);
//   square.textContent = newArray[index];
//   square.classList.add(`image${newArray[index]}`);
// });
// });

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
