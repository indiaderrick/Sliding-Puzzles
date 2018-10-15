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
const sound = document.getElementById('push');

const squaresArray = [squareOne, squareTwo, squareThree, squareFour, squareFive, squareSix, squareSeven, squareEight, blankSquare];

let clickCount = 1;

let newArray = [];

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

// RESET FUNCTION:

resetButton.addEventListener('click', function (){
  clickCounter.textContent = 'Click Count = ' + 0;
  clickCount = 1;
  // reshuffleNumbers();
  getNewArray();
  squaresArray.forEach((square, index) => {
    //remove the current class
    square.classList.remove(square.className);
    square.textContent = newArray[index];

    square.classList.add(`image${newArray[index]}`);
  });
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

function checkForWin() {
  const currentOrder = [];
  squaresArray.forEach(function(square) {
    const numberInSquare = square.textContent;
    console.log(numberInSquare);
    currentOrder.push(numberInSquare);
  });
  currentOrder.forEach(function(number){
    console.log('THIS IS THE NUMBER', number);
    if(number > (number + 1)) {
      //THIS IS WRONG.... need to index the square before it in the currentOrder array
      console.log('SORTED SQUARES.....wooo');
    } else {
      console.log('The squares are NOT sorted');
    }
  });
}
// function checkForWin() {
//   const currentOrder = [];
//   squaresArray.forEach(function(square) {
//     const numberInSquare = square.textContent;
//     console.log(numberInSquare);
//     currentOrder.push(numberInSquare);
//   });
//   console.log(currentOrder);
//   currentOrder.forEach(function(number){
//     console.log('THIS IS THE NUMBER', number);
//     //currently gets each number from the current order array... now need to
//     // compare the current one to the one after it each time. NOT SURE ABOUT THIS -1 BIT!!
//     if(number > number - 1) {
//       console.log('The squares are sorted');
//     } else {
//       console.log('The squares are sorted');
//     }
//   });
// }

squaresArray.forEach(function(square) {
  square.addEventListener('click', function () {
    // const squareNumber = square.textContent;
    const indexOfClickedSquare = squaresArray.indexOf(square);

    if(squareCanMoveLeft(indexOfClickedSquare)) {
      moveSquareLeft(indexOfClickedSquare);
      clickCounter.textContent = 'Click Count = ' + clickCount++;
      sound.play();
    } else if (squareCanMoveRight(indexOfClickedSquare)) {
      moveSquareRight(indexOfClickedSquare);
      clickCounter.textContent = 'Click Count = ' + clickCount++;
      sound.play();
      console.log('The click count is ', clickCount);
    } else if (squareCanMoveDown(indexOfClickedSquare)) {
      moveSquareDown(indexOfClickedSquare);
      clickCounter.textContent = 'Click Count = ' + clickCount++;
      sound.play();
      console.log('The click count is ', clickCount);
    } else if (squareCanMoveUp(indexOfClickedSquare)) {
      moveSquareUp(indexOfClickedSquare);
      clickCounter.textContent = 'Click Count = ' + clickCount++;
      sound.play();
    } else {
      console.log('square cant move');
    }
  });
});

function moveSquareRight(index) {
  const squareOnRight = squaresArray[index + 1];
  // const theSquareOnRight = squaresArray[index + 1];
  const currentSquare = squaresArray[index];
console.log('This is the current SQUARE::: ',currentSquare);
  if (currentSquare === squaresArray[2] || currentSquare === squaresArray[5] || currentSquare === squaresArray[8]) {
    return;
  }
  squareOnRight.textContent = currentSquare.textContent;
  currentSquare.textContent = 0;
  // currentSquare.style.background = 'black';
  // squareOnRight.style.backgroundImage =
  // squareOnRight.style.background = 'white';
  const background1 = currentSquare.className;
  currentSquare.classList.remove(background1);

  const background2 = squareOnRight.className;
  squareOnRight.classList.remove(background2);
  // //REMOVES SOUND :()
  // squareOnRight.classList.add(`image${squareOnRight.textContent}`);
  squareOnRight.classList.add(background1);
  currentSquare.classList.add(background2);
    // currentSquare.classList.add(`image${currentSquare.textContent}`);
  checkForWin();
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

  if (currentSquare === squaresArray[0] || currentSquare === squaresArray[3] || currentSquare === squaresArray[6]) {
    return;
  }
  squareOnLeft.textContent = currentSquare.textContent;
  currentSquare.textContent = 0;
  currentSquare.style.background = 'black';
  squareOnLeft.style.background = 'white';
  //could make click counter ++ a function!
  checkForWin();
}

function moveSquareUp(index) {
  const squareAbove = squaresArray[index - 3];
  const currentSquare = squaresArray[index];

  squareAbove.textContent = currentSquare.textContent;
  currentSquare.textContent = 0;
  currentSquare.style.background = 'black';
  squareAbove.style.background = 'white';
  checkForWin();
}

function moveSquareDown(index) {
  const squareBelow = squaresArray[index + 3];
  const currentSquare = squaresArray[index];

  squareBelow.textContent = currentSquare.textContent;
  currentSquare.textContent = 0;
  currentSquare.style.background = 'black';
  squareBelow.style.background = 'white';
  checkForWin();
}
