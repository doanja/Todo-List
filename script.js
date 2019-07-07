// character limit
const MAX_INPUT_LENGTH = 40;

// listens for add button click
document.getElementById("addButton").addEventListener("click", addItem);

/*
*   renders the <li> item child under <ul>
*   renders delete <span> used to hide <li>
*   renders hidden ok <span> used to confirm changes to <p>
*   clears <input> after clicking ok
*/ 
function addItem(){
    let inputTxt = truncateText(document.getElementById("inputTask").value, MAX_INPUT_LENGTH); // grabs input text
    let li = document.createElement("li");                     // creates <li>
    createDelBtn(li);                                          // creates and appends delete <span>
    createOKBtn(li, inputTxt);                                 // creates and appends ok <span>

    // if nothing was inputted...
    if(inputTxt === ''){
        alert("Enter something...");
    }
    else { // else add the <li> to the <div>
        document.getElementById("list").appendChild(li);        // append <li> to <div>
        document.getElementById("inputTask").value = '';        // clears input
        document.getElementById("ok").style.visibility = "hidden";
    }
}

/*  
*   @node, the parent node (<li> in this case)
*   renders the <span> element and appends it to <li>.
*   clicking the <span> will hide <li> from the list
*/
function createDelBtn(node){
    let span = document.createElement("span");          // create <span>
    span.id = "delete";                                 // tags the delete span
    span.textContent = "delete";                        // span's text
    node.appendChild(span);                             // append it to the parent node
    
    // handles delete functionality of the delete span
    span.onclick = function() {
        let div = this.parentElement;                   // <li> is the parent
        div.style.display = "none";                     // hides <li>
    }
}

/*
*   @node, the parent node (<li> in this case)
*   @text, the text to be displayed in <p>
*   renders the <p> element and appends it to <li>.
*   clicking <p> will create an <input> field and
*   remove this element and displays the ok button.
*/
function createP(node, text){
    let p = document.createElement("p");        // creates <p>
    p.id = "pTxt";                              // creates id for <p>
    p.textContent = text;                       // sets the text content
    node.appendChild(p);                        // append it to the parent node

    p.onclick = function(){
        createInput(node,text);                 // creates <input>
        removeElement("pTxt");                  // removes <p>
        document.getElementById("ok").style.visibility = "visible"; // display the ok button
    }
}

/*
*   @node, the parent node (<li> in this case)
*   @text, the text to be displayed in <input>
*   renders the <input> and removes <p>
*/
function createInput(node, text){
    let input = document.createElement("input");    // creates <input>
    input.id = "pInput";                            // creates id for <input>
    input.textContent = text;                       // sets the text content
    input.maxLength = MAX_INPUT_LENGTH;             // limits input length
    node.appendChild(input);                        // append it to the parent node
}

/* 
*   @node, the parent node (<li> in this case)
*   @text, the text to be displayed in <span>
*   renders the ok <span>
*   clicking the span will hide this <span>,
*   the <input>, and renders <p>
*/
function createOKBtn(node, text){
    let span = document.createElement("span");  // create <span>
    span.id = "ok";                             // creats id for <span>
    span.textContent = "ok";                    // sets the text content
    node.appendChild(span);                     // append it to the parent node
    createP(node, text);                        // creates and puts text into <p>

    span.onclick = function() {
        createP(node,document.getElementById("pInput").value);      // renders the <p> with text from <input
        removeElement("pInput");                                    // removes the <input>
        document.getElementById("ok").style.visibility = "hidden";  // hides the ok <span>
    }
}

/*
* function to filter <li> (non-case sensitive)
*/
function filterList(){
    let inputTxt = document.getElementById("inputFilter").value;        // grabs input text 
    let inputTxtUpperCase = inputTxt.toUpperCase();                     // changes input to upper case
    let list = document.getElementById("list");                         // gets our <div> list
    let li = list.getElementsByTagName('li');                           // grabs the <li>
    let i, p, txtValue;
    
    // loop through all <li>
    for(i = 0; i < li.length; i++){                                     
        p = li[i].getElementsByTagName("p")[0];                         // grabs <p>
        txtValue = p.textContent || p.innerText;                        // grabs text from <p>
        if(txtValue.toUpperCase().indexOf(inputTxtUpperCase) > -1){     // ? compares txtValue to the input
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
function truncateText(text, maxLength) {
    if (text.length > maxLength) {          // if text length is greater than maxLength
        text = text.substr(0,maxLength);    // trim the text
    }
    return text;
}

/*
*   @elementId, the child element to be rmeoved
*   removes the child element
*/
function removeElement(elementId){
    let elem = document.getElementById(elementId);
    elem.parentElement.removeChild(elem);
}