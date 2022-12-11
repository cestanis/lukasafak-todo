"use strict";

window.onload = fOnLoad;

/***************************************** 
 * Event listening:
*****************************************/
function fOnLoad() {
    document.getElementById("saveButton").addEventListener("click", fSaveToDo);
    document.getElementById("inputUserPrompt").addEventListener("keyup", fOnKeyPress); // Todo: Why are we using keyup instead of click?
    document.getElementById("butNightMode").addEventListener("click", fNightModeToggle);
}

function fSaveToDo() {
    let inputText = document.getElementById("inputUserPrompt").value;
    if (inputText != "") {
        const newPar = document.createElement("p");
        newPar.addEventListener("click", fCrossText)
        newPar.addEventListener("dblclick", fDelText)

        // Use createTextNode and .appendChild or just .innerText
        //const newContent = document.createTextNode(inputText);
        //newPar.appendChild(newContent);
        newPar.innerText = inputText;
       
        document.getElementById("divToDos").appendChild(newPar);
        document.getElementById("inputUserPrompt").value = "";
    }
}

// Trigger button click on the Enter key in text box
function fOnKeyPress(event) {
    if (event.key === "Enter") {
        document.getElementById("saveButton").click();
    }
}

function fCrossText(e) {
    console.log(e);
    e.target.style.textDecoration = "line-through";
}

function fDelText(e) {
    document.getElementById("divToDos").removeChild(e.target);
}

// Toggle Night Mode
function fNightModeToggle(e) {
    if (document.body.style.getPropertyValue("background-color") != "rgb(32, 33, 36)") {
        document.body.style.setProperty("background-color", "rgb(32, 33, 36)");
        document.querySelector(":root").style.setProperty("--textColor", "white");
        document.querySelector(":root").style.setProperty("--butBackgroundColor", "rgb(61, 62, 65)");
        document.querySelector(":root").style.setProperty("--inBackgroundColor", "rgb(61, 62, 65)");
    } else {
        document.body.style.setProperty("background-color", "rgb(255, 194, 194)");
        document.querySelector(":root").style.setProperty("--textColor", "black");
        document.querySelector(":root").style.setProperty("--butBackgroundColor", "white");
        document.querySelector(":root").style.setProperty("--inBackgroundColor", "white");
    }
}

/***************************************** 
 * Features for version 2.0
 * 
 * - Night mode toggle - ok
 * - Rearrange order (drag/drop or arrows)
 * - Right-click to change properties
 * - Burger Menu
*****************************************/
