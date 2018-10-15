//could make it so that = move the actual div appart from
// BLACK SQUARE needs not to be hard coded
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
const currentOrder = [];
let clickCount = 1;
let newArray = [];

// const squaresArray = [squareOne, squareTwo, squareThree, squareFour, squareFive, squareSix, squareSeven, squareEight, blankSquare];
const squaresArray = [ blankSquare, squareOne, squareTwo, squareThree, squareFour, squareFive, squareSix, squareSeven, squareEight];

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

//START FUNCTION:
//need to make sure that it only has one of each number. Weird stuff happening with zero & background swaps.
// function reshuffleNumbers(){
//   const uniqueArray = [];
//
//   squaresArray.forEach(function(square){
//     let numberOfCurrentSquare = square.textContent;
//     const getNumber = generateRandomNumbers();
//     while(uniqueArray.length < 9) {
//       const getNumber = generateRandomNumbers();
//       if(uniqueArray.indexOf(getNumber) > - 1) continue;
//       uniqueArray.push(getNumber);
//       // numberOfCurrentSquare = getNumber;
//       // square.textContent = numberOfCurrentSquare;
//     }
//     console.log('tthe number is : ', getNumber);
//     numberOfCurrentSquare = getNumber;
//     square.textContent = numberOfCurrentSquare;
//   });
// }

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
function getCurrentOrder() {
  const currentOrder = [];
  squaresArray.forEach(function(square) {
    const numberInSquare = square.textContent;
    currentOrder.push(numberInSquare);
    console.log('This is the current order going crazy:', currentOrder);
  });
}
//THIS FUNCTION DOESNT WORK. ITS RETURNING TRUE STRAIGHT AWAY.

function haveIWon() {
  getCurrentOrder();
  const check = currentOrder.filter((number, index, array) => {
    if(index === 0) {
      return true;
    } else {
      return number === array[index - 1] + 1;
    }
  }).length === currentOrder.length;
  if(check){
    console.log('You have WON THE GAME');
    congrats.classList.add('congrats');
  } else {
    console.log('not quite yet');
  }
}

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
    }
  });
});

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
  haveIWon();
}

// getNewArray();
// squaresArray.forEach((square, index) => {
//   //remove the current class
//   square.classList.remove(square.className);
//   square.textContent = newArray[index];
//
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
  haveIWon();
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
  haveIWon();
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
  haveIWon();
}
