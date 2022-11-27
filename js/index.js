window.onload = fOnLoad;

/***************************************** 
 * Event listening:
*****************************************/
function fOnLoad() {
    document.getElementById("saveButton").addEventListener("click", fSaveToDo);
    document.getElementById("inputUserPrompt").addEventListener("keyup", fOnKeyPress);
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
    e.originalTarget.style.textDecoration = "line-through";
}

function fDelText(e) {
    document.getElementById("divToDos").removeChild(e.originalTarget);
}

/***************************************** 
 * Features for version 2.0
 * 
 * - Night mode toggle
 * - Rearrange order (drag/drop or arrows)
 * - Right-click to change properties
*****************************************/