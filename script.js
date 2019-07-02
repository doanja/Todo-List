// listens for button click
document.getElementById("addButton").addEventListener("click", addItem);

// when button is press, add a <li>
function addItem(){
    var text = document.getElementById("input_text").value; // grabs input text
    
    var node = document.createElement("li");                // create <li>
    var textnode = document.createTextNode(text);           // creates the text
    node.appendChild(textnode);                             // append text to <li>
    createDelBtn(node);                                     // creates and appends <button>
    //createEditlBtn(node);

    // if nothing was inputted...
    if(text === ''){
        alert("Enter something...");
    }
    else { // else add the <li> to the <ul>
        document.getElementById("todoList").appendChild(node);  // append <li> to <ul>
        document.getElementById("input_text").value = '';       // clears input
    }
}

function createDelBtn(node){
    var button = document.createElement("button");      // create <button>
    button.id = "delete";                               // tags the delete button
    button.innerHTML = "delete";                        // button's text
    node.appendChild(button);                           // append this <button> to the node <li>
    
    // handles delete functionality of the delete button
    button.onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

function createEditlBtn(node){
    var button = document.createElement("button");    // create <button>
    button.id = "edit";                               // tags the edit button
    button.innerHTML = "edit";                        // button's text
    node.appendChild(button);
}

function deleteItem(){
    console.log("deleteItem");
    var li = document.getElementById("li");
    ul.parentNode.removeChild(li);
}
