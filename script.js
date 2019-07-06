const MAX_INPUT_LENGTH = 40;

// listens for span click
document.getElementById("addButton").addEventListener("click", addItem);

// when span is press, add a <li>
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
        clearFilter();                                          // show all <li>
    }
}

// create delete <span> and appends <li>
function createDelBtn(node){
    let span = document.createElement("span");          // create <span>
    span.id = "delete";                                 // tags the delete span
    span.textContent = "delete";                        // span's text
    node.appendChild(span);                             // append this <span> to the node <li>
    
    // handles delete functionality of the delete span
    span.onclick = function() {
        let div = this.parentElement;                   // <li> is the parent
        div.style.display = "none";                     // hides <li>
    }
}

// creates a <p> and appends to <li>
function createP(node, text){
    let p = document.createElement("p");        // creates <p>
    p.id = "pTxt";                              // creates id for <p>
    p.textContent = text;                       // puts inputTxt into <p>
    node.appendChild(p);                        // put <p> into <li>


    p.onclick = function(){
        p.contentEditable = true;               // allow <p> from being editable
    }
    return p;                                   // returns <p>
}

// creates ok <span> and appends to <li>
function createOKBtn(node, text){
    let span = document.createElement("span");  // create <span>
    span.id = "ok";                             // tags the ok span
    span.textContent = "ok";                    // span's text
    node.appendChild(span);                     // append this <span> to node <li>
    let p = createP(node, text);                // creates and puts inputTxt into <p>
    
    p.addEventListener("keydown", disableNewLines);    // disable enter key / new lines

    span.onclick = function() {
        p.contentEditable = false;              // prevent <p> from being editable
        p.textContent = truncateText(p.textContent, MAX_INPUT_LENGTH);
    }
}

// prevents new lines from being created when content is editable
function disableNewLines(e) {
    if (e.keyCode === 13) {
        this.contentEditable = false;           // <p> no longer editable
    }
}

// function to filter <li> (non-case sensitive)
function filterList(){
    let inputTxt = document.getElementById("inputTask").value;          // grabs input text 
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

// clears the filter for <li>
function clearFilter(){
    let list = document.getElementById("list");     // gets our <div> list
    let li = list.getElementsByTagName('li');       // grabs the <li>
    for(i = 0; i < li.length; i++){                 // for all <li>
        li[i].style.display = "";                   // display the <i>
    }
}

// 
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        text = text.substr(0,maxLength);
    }
    return text;
}