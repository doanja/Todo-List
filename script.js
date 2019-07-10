// character limit
const MAX_INPUT_LENGTH = 40;

// listens for add button click
const attachAddBtnListener = () => {
    const addBtn = document.getElementById("addButton");
    addBtn.addEventListener("click", addListItem);
}

// executes these functions on page load
window.onload = () => {
    attachAddBtnListener();
}

/*
*   renders the <li> item child under <div id="list">
*   renders deconste <span> used to hide <div id="list">
*   renders hidden <span> used to modify changes to <p>
*   clears <input> after clicking ok
*/ 
const addListItem = () => {
    const inputText = truncateText(getInputText("inputTask"), MAX_INPUT_LENGTH);    // grabs input text
    const li = document.createElement("li");                     // creates <li> element
    createDelBtn(li);                                            // renders <span> used to delete <li>
    createChngBtn(li, inputText);                                // renders <span> used to modify <p>

    // if nothing was inputted...
    if(inputText === ''){
        alert("Enter something...");
    }
    else { // else add and render the <li> to the <div id="list">
        document.getElementById("list").appendChild(li);        // append <li> to <div id="list">
        clearInputText();
    }
}

// gets input
const getInputText = (element) => {
    return document.getElementById(element).value.trim();
}

// clears input
const clearInputText = () => {
    document.getElementById("inputTask").value = "";
}

/*  
*   @element, the parent element (<li> in this case)
*   renders the <span> element and appends it to <li>.
*   clicking the <span> will hide <li> from the list
*/
const createDelBtn = (element) => {
    const span = document.createElement("span");            // create <span>
    span.textContent = "delete";                            // span's text
    element.appendChild(span);                              // append it to the parent element
    
    // handles deconste functionality of the deconste span
    span.onclick = function() {
        const div = this.parentElement;                     // <li> is the parent
        div.style.display = "none";                         // hides <li>
    }
}

/*
*   @element, the parent element (<li> in this case)
*   @text, the text to be displayed in <p>
*   renders the <p> element and appends it to <li>.
*   clicking <p> will create an <input> field and
*   remove this element and displays the ok button.
*/
const createP = (element, text) => {
    const p = document.createElement("p");          // creates <p>
    p.textContent = text;                           // sets the text content
    element.appendChild(p);                         // append it to the parent element
}

/*
*   @element, the parent element (<li> in this case)
*   @text, the text to be displayed in <input>
*   renders the <input> and removes <p>
*/
const createInput = (element, text) => {
    const input = document.createElement("input");      // creates <input>
    input.placeholder = text;                           // sets placeholder text
    input.maxLength = MAX_INPUT_LENGTH;                 // limits input length
    element.appendChild(input);                         // append it to the parent element
}

/* 
*   @element, the parent element (<li> in this case)
*   @text, the text to be displayed in <span>
*   renders the ok <span>
*   clicking the span will hide this <span>,
*   the <input>, and renders <p>
*/
const createChngBtn = (element, text) => {
    const span = document.createElement("span");    // create <span>
    span.textContent = "edit";                      // sets the text content
    element.appendChild(span);                      // append it to the parent element
    createP(element, text);                         // creates and puts text into <p>
    let isEdit = false;                             // handles what state the <span> is in

    span.onclick = function() {
        if(isEdit === false){
            const currentP = element.querySelector("p");    // search for <p> inside <li>
            createInput(element,currentP.textContent);      // renders <input>
            currentP.remove();                              // remove <p> from <li>
            span.textContent = "save";                      // change <span> text
            isEdit = true;
        }
        else if(isEdit === true){
            const newInput = element.querySelector("input");    // search for <input> inside <li>
            createP(element,newInput.value);                    // renders the <p> with text from <input>
            newInput.remove();                                  // remove <input> from <li>
            span.textContent = "edit";                          // change <span> text
            isEdit = false;
        }
    }
}

/*
* function to filter <li> (non-case sensitive)
*/
const filterList = () => {
    const inputText = getInputText("inputFilter");          // grabs input text 
    const inputTextUpperCase = inputText.toUpperCase();     // changes input to upper case
    const list = document.getElementById("list");           // gets our <div> list
    const li = list.getElementsByTagName("li");             // grabs the <li>
    let i, p, txtValue;
    
    // loop through all <li>
    for(i = 0; i < li.length; i++){
        p = li[i].querySelector("p");                                   // grabs first instance of <p> in <li>
        txtValue = p.textContent || p.innerText;                        // grabs text from <p>
        if(txtValue.toUpperCase().indexOf(inputTextUpperCase) > -1){    // finding txtValue or a substring of txtValue
            li[i].style.display = "";                                   // display matching items
        } 
        else {
            li[i].style.display = "none";                               // hide non-matching items
        }
    }
}

/*
*   @text, the text to be trimmed
*   @maxLength, the maximum number of characters
*   returns the text trimmed down to the maxLength
*/
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {          // if text length is greater than maxLength
        text = text.substr(0,maxLength);    // trim the text
    }
    return text;
}