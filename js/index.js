"use strict";

// http://127.0.0.1:5500/index.html

let modal = document.getElementById("iContextMenu");

window.onload = fOnLoad;


/***************************************** 
 * Event listening:
*****************************************/
function fOnLoad() {
    document.getElementById("saveButton").addEventListener("click", fSaveToDo);
    document.getElementById("inputUserPrompt").addEventListener("keyup", fOnKeyPress); // Todo: Why are we using keyup instead of click?
    document.getElementById("butNightMode").addEventListener("click", fNightModeToggle);
    document.addEventListener("keyup", fEscPress);
}

function fSaveToDo() {
    let inputText = document.getElementById("inputUserPrompt").value;
    if (inputText != "") {
        const newPar = document.createElement("p");
        newPar.setAttribute("id", inputText);
        newPar.setAttribute("tag", "org_tag");
        newPar.addEventListener("click", fCrossText);
        newPar.addEventListener("dblclick", fDelText);
        newPar.addEventListener("contextmenu", fContextMenuOpen);

        // Use createTextNode and .appendChild or just .innerText
        //const newContent = document.createTextNode(inputText);
        //newPar.appendChild(newContent);
        newPar.innerText = inputText;
       
        document.getElementById("divToDos").appendChild(newPar);
        document.getElementById("inputUserPrompt").value = "";
    }
}

// Trigger button click on the Enter key in text box
function fOnKeyPress(e) {
    if (e.key === "Enter") {
        document.getElementById("saveButton").click();
    }
}

function fEscPress(e) {
    if (e.key === "Escape") { 
        if ( !(modal.classList.contains("hidden")) ) {
            fContextMenuClose(null);
        }
    }
}

function fCrossText(e) {
    e.target.style.textDecoration = "line-through";
}

function fDelText(e) {
    document.getElementById("divToDos").removeChild(e.target);
}

function fContextMenuOpen(e) {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    modal.classList.remove("hidden");
    modal.style.top = y + "px";
    modal.style.left = x + "px";
    document.addEventListener("mousedown", fContextMenuClose);
    window.addEventListener("blur", fContextMenuClose.bind(null, null)); // Regarding two null, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#parameters
    // add event listener click to every list item
    //let tagTarget = e.target.id;
    console.log("fContextMenuOpen -> addEventListener")
    document.getElementById("iContextItem1").addEventListener("click", fAddTag.bind(null, e)); /////////  WIRD MEHRFACH HINZUGEFUEGT. WIR MUESSEN EINEN WEG FINDEN, DEN EVENTLISTENER ZU ENTFERNEN
}

function fContextMenuClose(e) {
    if (e === null) {
        modal.classList.add("hidden");
        // add event listener click to every list item
        document.getElementById("iContextItem1").removeEventListener("click", fAddTag.bind(null, e));
        console.log("Eventlistener removed 1")
    }
    else {
        if (!(e.target.id.includes("Context"))) { 
            modal.classList.add("hidden");
            // add event listener click to every list item
            document.getElementById("iContextItem1").removeEventListener("click", fAddTag.bind(null, e));
            console.log("Eventlistener removed 2")
        }
    }   
}

function fAddTag(oldE, e) { // 
    console.log(oldE);
    fContextMenuClose(null);
    let tagArray = document.getElementById(oldE.target.id).getAttribute("tag").split(",");
    console.log(tagArray);
    tagArray.push("pushedTag");
    //document.getElementById(oldE.target.id).setAttribute("tag", tagArray.join(","));
    document.getElementById(oldE.target.id).classList.add("bold");
    // document.getElementById(oldE.target.id).getAttribute("tag").concat
    document.getElementById("iContextItem1").removeEventListener("click", fAddTag.bind(null, oldE));
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
 * - Filter/sort with tags(?)
 * - On hover
*****************************************/
