"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 3

   Crossword Puzzle Script
   
   Author: Micah Fischer
   Date:   3-27-19
   
   Global Variables
   ================
   allLetters
      References all of the letter cells in the crossword table#crossword
   
   currentLetter
      References the letter currently selected in the puzzleLetter
      
   wordLetters
      References the across and down letters in the word(s) associated with the current letter
   
   acrossClue
      References the across clue associated with the current letter
      
   downClue
      References the down clue associated with the current letter
      
         
   Functions
   =========
   
   init()
      Initializes the puzzle, setting up the event handlers and the variable values
       
   formatPuzzle(puzzleLetter)
      Formats the appearance of the puzzle given the selected puzzle letter
      
   selectLetter(e)
      Applies keyboard actions to select a letter or modify the puzzle navigation
      
   switchTypeDirection()
      Toggles the typing direction between right and down
      
   getChar(keyNum)
      Returns the text character associated with the key code value, keyNum


*/

// Establishes all of the documents global variables.
// allLetters
// References all of the letter cells in the crossword table#crossword
var allLetters;
// References the letter currently selected in the puzzleLetter.
var currentLetter;
// References the across and down letters in the word(s) associated with the current letter.
var wordLetters;
// References the across clue associated with the current letter.
var acrossClue;
// References the down clue associated with the current letter.
var downClue;
// Sets the starting type direction to right.
var typeDirection = "right";

//  Runs the initialize function when the page loads.
window.onload = init;
//  Initializes the puzzle, setting up the event handlers and the variable values.
function init() {
    allLetters = document.querySelectorAll("table#crossword span");
    currentLetter = allLetters[0];
    var acrossID = currentLetter.getAttribute("data-clue-a");
    var downID = currentLetter.getAttribute("data-clue-d");
    acrossClue = document.getElementById(acrossID);
    downClue = document.getElementById(downID);
    console.log(acrossClue);
    formatPuzzle(currentLetter);
    for (var i = 0; i < allLetters.length; i++) {
        allLetters[i].style.cursor = "pointer";
        allLetters[i].addEventListener("onmousedown",
            function (event) {
                formatPuzzle(event.target);
            });
    }
    // This block adds an event listener that specifies if a key is down and changes the mouse cursor.
    document.addEventListener("keydown", selectLetter)
    var typeImage = document.getElementById("directionImg");
    typeImage.style.cursor = "pointer";
    // This block changes the direction when the user types using the event listener of click to switch the type direction
    typeImage.addEventListener("click", switchTypeDirection);
    document.getElementById("showErrors").onclick = function () {
        for (var i = 0; i < allLetters.length; i++) {
            if (allLetters[i].textContent != allLetters[i].dataset.letter) {
                allLetters[i].style.color = "red";
            }
        }
        // This block sets a timeout for each letter that the user types sing a for loop.
        setTimeout(
            function () {
                for (var i = 0; i < allLetters.length; i++) {
                    allLetters[i].style.color = "";
                }
            }, 3000
        );
    }
    // This block uses the correct dataset to determine wether or not the user is correct when they click on the solution button.
    document.getElementById("showSolution").onclick = function () {
        for (var i = 0; i < allLetters.length; i++) {
            if (allLetters[i].textContent != allLetters[i].dataset.letter) {
                allLetters[i].textContent = allLetters[i].dataset.letter;
            }
        }
    }
}
// This function styles the puzzle by applying a color to the clue that corresponds with the colors shown on the crossword puzzle.
function formatPuzzle(puzzleLetter) {
    currentLetter = puzzleLetter;
    for (var i = 0; i < allLetters.length; i++) {
        allLetters[i].style.backgroundColor = "";
    }
    acrossClue.style.color = "rgb(96, 96, 28)";
    downClue.style.color = "rgb(96, 96, 28)";
    if (currentLetter.dataset.clueA != undefined) {
        acrossClue = document.getElementById(currentLetter.dataset.clueA);
        acrossClue.style.color = "blue";
        wordLetters = document.querySelectorAll("[data-clue-a = " + currentLetter.getAttribute("data-clue-a") + "]");
        for (var i = 0; i < wordLetters.length; i++) {
            wordLetters[i].style.backgroundColor = "rgb(231, 231, 255)";
        }
    }
    if (currentLetter.dataset.clueD != undefined) {
        downClue = document.getElementById(currentLetter.dataset.clueD);
        downClue.style.color = "red";
        wordLetters = document.querySelectorAll("[data-clue-d = " + currentLetter.getAttribute("data-clue-d") + "]")
        for (var i = 0; i < wordLetters.length; i++) {
            wordLetters[i].style.backgroundColor = "rgb(255, 231, 231)";
        }
    }
    if (typeDirection === "right") {
        currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
    } else {
        currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
    }
}
// This function allows the user to change the type direction using the arrow keys to navigate through the crosssword puzzle. This section relies on the use of key codes to register keyboard events.
function selectLetter() {
    var leftLetter = document.getElementById(currentLetter.dataset.left);
    var upLetter = document.getElementById(currentLetter.dataset.up);
    var rightLetter = document.getElementById(currentLetter.dataset.right);
    var downLetter = document.getElementById(currentLetter.dataset.down);
    var userKey = event.keyCode;
    if (userKey === 37) {
        formatPuzzle(leftLetter);
    } else if (userKey === 38) {
        formatPuzzle(upLetter);
    } else if ((userKey === 39) || (userKey === 9)) {
        formatPuzzle(rightLetter);
    } else if ((userKey === 40) || (userKey === 13)) {
        formatPuzzle(downLetter);
    } else if ((userKey === 8) || (userKey === 46)) {
        currentLetter.textContent = "";
    } else if (userKey === 32) {
        switchTypeDirection();
    } else if ((userKey >= 65) && (userKey <= 90)) {
        currentLetter.textContent = getChar(userKey);
        if (typeDirection === "right") {
            formatPuzzle(rightLetter);
        } else {
            formatPuzzle(downLetter);
        }
    }
    // This block of code prevents the default keyboard shortcuts from being utilized.
    event.preventDefault();
}
// This function toggles the typing direction between right and down
function switchTypeDirection() {
    var typeImage = document.getElementById("directionImg");
    if (typeDirection === "right") {
        typeDirection = "down";
        typeImage.src = "pc_right.png";
        currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
    } else {
        typeDirection = "right";
        typeImage.src = "pc_down.png";
        currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
    }
}

/*====================================================*/

// This returns the text character associated with the key code value, keyNum.
function getChar(keyNum) {
    return String.fromCharCode(keyNum);
}