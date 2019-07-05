// listens for span click
document.getElementById("addButton").addEventListener("click", addItem);



// when span is press, add a <li>
function addItem(){
    let inputTxt = document.getElementById("inputTask").value; // grabs input text
    let li = document.createElement("li");                     // creates <li>
    createDelBtn(li);                                          // creates and appends delete <span>
    createOKBtn(li, inputTxt);                                 // creates and appends ok <span>

    // if nothing was inputted...
    if(inputTxt === ''){
        alert("Enter something...");
    }
    else { // else add the <li> to the <div>
        let pTag = document.getElementById("pTxt");             // grabs pTag element
        document.getElementById("list").appendChild(li);        // append <li> to <div>
        document.getElementById("inputTask").value = '';        // clears input
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
    
    p.addEventListener('keydown', disableNewLines);    // disable enter key / new lines

    span.onclick = function() {
        p.contentEditable = false;              // prevent <p> from being editable
    }
}

// prevents new lines from being created when content is editable
function disableNewLines(e) {
    if (e.keyCode === 13) {
        this.contentEditable = false; // <p> no longer editable
    }
}