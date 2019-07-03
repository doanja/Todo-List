// listens for span click
document.getElementById("addButton").addEventListener("click", addItem);

// when span is press, add a <li>
function addItem(){
    let inputTxt = document.getElementById("input_text").value; // grabs input text
    
    let li = document.createElement("li");                      // creates <li>                                             // 
    createP(li, inputTxt);                                      // creates and puts inputTxt into <p>
    createDelBtn(li);                                           // creates and appends <span>

    // if nothing was inputted...
    if(inputTxt === ''){
        alert("Enter something...");
    }
    else { // else add the <li> to the <ul>
        let pTag = document.getElementById("pTxt");
        document.getElementById("todoList").appendChild(li);    // append <li> to <ul>
        document.getElementById("input_text").value = '';       // clears input
    }
}

// create delete <button> upon creation of a <li>
function createDelBtn(node){
    let span = document.createElement("span");          // create <span>
    span.id = "delete";                                 // tags the delete span
    span.textContent = "delete";                        // span's text
    node.appendChild(span);                             // append this <span> to the node <li>
    


    // handles delete functionality of the delete span
    span.onclick = function() {
        let div = this.parentElement;
        div.style.display = "none";
    }
}

function createP(node, inputTxt){
    let p = document.createElement("p");        // creates <p>
    p.id = "pTxt";                              // creates id for <p>
    p.textContent = inputTxt;                   // puts inputTxt into <p>
    node.appendChild(p);                        // put <p> into <li>

    let isEditing = false;

    // when <p> is created, create <input>, transfer <p> text into <input>
    p.onclick = function(){
        isEditing = true;
        if(isEditing === true){
            let inputField = document.createElement("input");
            inputField.id = "inputField";
            inputField.textContent = inputTxt;
            isEditing = false;
        }
        else {
            //isEditing
        }

        

        // p.innerHTML = node.innerHTML;           // copy <li> text into <p>
        // node.innerHTML = "";                    // hide <li>
        // document.getElementById("txt").contentEditable = "true"; // make the <p> editable
    }
}