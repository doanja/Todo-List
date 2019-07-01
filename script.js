var ul = document.getElementById("todoList");

// listen for button click
document.getElementById("addButton").addEventListener("click", addItem);

//document.getElementById("delete").addEventListener("click", deleteItem);

// when button is press, add a <li>
function addItem(){
    var text = document.getElementById("input_text").value;         // grabs input text
    
    var node = document.createElement("li");                // create <li>
    var textnode = document.createTextNode(text);           // creates the text
    node.appendChild(textnode);                             // append text to <li>
    createDelBtn(node);
    createEditlBtn(node);

    // if nothing was inputted...
    if(text === ''){
        alert("Enter something...");
    }
    else {
        document.getElementById("todoList").appendChild(node);  // append <li> to <ul>
        document.getElementById("input_text").value = '';               // clear li input field    
    }
}

function createDelBtn(node){
    var td = document.createElement("button");      // create <button>
    td.id = "delete";                               // tags the delete button
    td.innerHTML = "delete";                        // button's text
    node.appendChild(td);
}

function createEditlBtn(node){
    var td = document.createElement("button");      // create <button>
    td.id = "edit";                               // tags the delete button
    td.innerHTML = "edit";                        // button's text
    node.appendChild(td);
}

function deleteItem(){
    console.log("deleteItem");
    var li = document.getElementById("li");
    ul.parentNode.removeChild(li);
}
