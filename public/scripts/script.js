const globalList = [];

// character limit
const MAX_INPUT_LENGTH = 80;

// listens for add button click
const attachAddBtnListener = () => {
  const addBtn = document.getElementById("addButton");
  addBtn.addEventListener("click", addListItem);
};

// listens for clear button click
const attachClearBtnListener = () => {
  const clearBtn = document.getElementById("clearFilters");
  clearBtn.addEventListener("click", clearFilters);
};

// executes these functions on page load
window.onload = () => {
  attachAddBtnListener();
  attachClearBtnListener();
  // getPostByID();
  document.getElementById("getPosts").addEventListener("click", getPosts);
  document.getElementById("getPostsID").addEventListener("click", getPostByID);
  document.getElementById("returnMap").addEventListener("click", returnMap);
};

/*
 *   renders the <li> item child under <div id="list">
 *   renders deconste <button> used to hide <div id="list">
 *   renders hidden <button> used to modify changes to <p>
 *   clears <input> after clicking ok
 */

const addListItem = () => {
  const inputText = truncateText(getInputText("inputTask"), MAX_INPUT_LENGTH); // grabs input text
  const li = createListItem(); // creates <li> element
  createDelBtn(li); // renders <button> used to delete <li>
  createChngBtn(li, inputText); // renders <button> used to modify <p>

  // if nothing was inputted...
  if (inputText === "") {
    alert("Enter something...");
  } else {
    // else add and render the <li> to the <div id="list">
    document.getElementById("list").appendChild(li); // append <li> to <div id="list">
    // globalList.push(inputText);
    postList(inputText);
    getPosts();
    clearInputText();
  }
};

// function used to render list and buttons from DB
const addListItemFromJSON = (text, data_id) => {
  const inputText = truncateText(text, MAX_INPUT_LENGTH); // grabs input text
  const li = createListItem(); // creates <li> element
  createDelBtn(li); // renders <button> used to delete <li>
  createChngBtn(li, inputText, data_id); // renders <button> used to modify <p>

  document.getElementById("list").appendChild(li); // append <li> to <div id="list">
};

// gets input
const getInputText = element => {
  return document.getElementById(element).value.trim();
};

// clears input
const clearInputText = () => {
  document.getElementById("inputTask").value = "";
};

// create <li>
const createListItem = () => {
  const li = document.createElement("li");
  li.className = "list-group-item bg-light";
  return li;
};

/*
 *   @element, the parent element (<li> in this case)
 *   renders the <button> element and appends it to <li>.
 *   clicking the <button> will hide <li> from the list
 */
const createDelBtn = element => {
  const button = document.createElement("button"); // create <button>
  button.textContent = "delete"; // button's text
  button.className = "float-right btn btn-danger";
  element.appendChild(button); // append it to the parent element

  // handles deconste functionality of the deconste button
  button.onclick = function() {
    const div = this.parentElement; // <li> is the parent
    div.style.display = "none"; // hides <li>
    deleteListItem();
  };
};

/*
 *   @element, the parent element (<li> in this case)
 *   @text, the text to be displayed in <p>
 *   renders the <p> element and appends it to <li>.
 *   clicking <p> will create an <input> field and
 *   remove this element and displays the ok button.
 */
const createP = (element, text, data_id) => {
  const p = document.createElement("p"); // creates <p>
  p.textContent = text; // sets the text content
  p.setAttribute("data-id", data_id);
  element.appendChild(p); // append it to the parent element
};

/*
 *   @element, the parent element (<li> in this case)
 *   @text, the text to be displayed in <input>
 *   renders the <input> and removes <p>
 */
const createInput = (element, text) => {
  const input = document.createElement("input"); // creates <input>
  input.placeholder = text; // sets placeholder text
  input.maxLength = MAX_INPUT_LENGTH; // limits input length
  element.appendChild(input); // append it to the parent element
};

/*
 *   @element, the parent element (<li> in this case)
 *   @text, the text to be displayed in <button>
 *   renders the ok <button>
 *   clicking the button will hide this <button>,
 *   the <input>, and renders <p>
 */
const createChngBtn = (element, text, data_id) => {
  const button = document.createElement("button"); // create <button>
  button.textContent = "edit"; // sets the text content
  button.className = "float-right btn btn-secondary";
  element.appendChild(button); // append it to the parent element
  createP(element, text, data_id); // creates and puts text into <p>
  let isEdit = false; // handles what state the <button> is in

  button.onclick = function() {
    if (isEdit === false) {
      const currentP = element.querySelector("p"); // search for <p> inside <li>
      createInput(element, currentP.textContent); // renders <input>
      currentP.remove(); // remove <p> from <li>
      button.textContent = "save"; // change <button> text
      isEdit = true;
    } else if (isEdit === true) {
      const newInput = element.querySelector("input"); // search for <input> inside <li>
      createP(element, newInput.value, data_id); // renders the <p> with text from <input>
      newInput.remove(); // remove <input> from <li>
      button.textContent = "edit"; // change <button> text
      updateListItem(data_id, newInput.value);
      isEdit = false;
    }
  };
};

/*
 * function to filter <li> (non-case sensitive)
 */
const filterList = () => {
  const inputText = getInputText("inputFilter"); // grabs input text
  const inputTextUpperCase = inputText.toUpperCase(); // changes input to upper case
  const list = document.getElementById("list"); // gets our <div> list
  const li = list.getElementsByTagName("li"); // grabs the <li>
  let i, p, txtValue;

  // loop through all <li>
  for (i = 0; i < li.length; i++) {
    p = li[i].querySelector("p"); // grabs first instance of <p> in <li>
    txtValue = p.textContent || p.innerText; // grabs text from <p>
    if (txtValue.toUpperCase().indexOf(inputTextUpperCase) > -1) {
      // finding txtValue or a substring of txtValue
      li[i].style.display = ""; // display matching items
    } else {
      li[i].style.display = "none"; // hide non-matching items
    }
  }
};

// clear the filter input
const clearFilters = () => {
  document.getElementById("inputFilter").value = ""; // clears text inputFilter
  const list = document.getElementById("list"); // gets our <div> list
  const li = list.getElementsByTagName("li"); // grabs the <li>
  let i;

  // loop through and display all <li>
  for (i = 0; i < li.length; i++) {
    li[i].style.display = "";
  }
};

/*
 *   @text, the text to be trimmed
 *   @maxLength, the maximum number of characters
 *   returns the text trimmed down to the maxLength
 */
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    // if text length is greater than maxLength
    text = text.substr(0, maxLength); // trim the text
  }
  return text;
};

/*
 *   @text, the text to be displayed in html
 *   sets the error text in the html
 */
const setErrorHeader = text => {
  document.getElementById("errorH1").textContent = text;
};

/*
 *   clears the error text in the html
 */
const clearErrorHeader = () => {
  document.getElementById("errorH1").textContent = "";
};

// function to clear <li>'s from list
const clearList = () => {
  const list = document.getElementById("list");
  const li = list.getElementsByTagName("li");

  while (li.length > 0) {
    list.removeChild(li[0]);
  }
};

// 2xx responses are sucessful requests
const checkStatus = res => {
  if (res.ok) {
    return res.json();
  } else {
    let err = new Error(res.status + " " + res.statusText);
    err.response = res;
    throw err;
  }
};

const returnMap = () => {
    console.log(globalList);
}

const getParentDataAtt = () => {
  return this.parentNode.getAttribute("data-id");
}

// get's all todo li from the api
const getPosts = () => {
  clearList(); // clears out list before calling get
  clearErrorHeader();
  fetch('http://localhost:5000/api/routes/', {
    method: "GET" // WIP: send ID in body to return all todo items that belong to user
  })
    .then(checkStatus)
    .then(data => {
      // loop through each item in the database
      for (let i = 0; i < data.length; i++) {
        // renders the list items, and stores the ID in a data attribute
        addListItemFromJSON(data[i].todo, data[i].id);
        globalList[i] = data[i].todo; // populate client side list of todo items
      }
    })
    .catch(error => {
      setErrorHeader(`${error}`);
    });
};

// get's all todo li from the api
const getPostByID = () => {
  clearList(); // clears out list before calling get
  clearErrorHeader();
  fetch("http://localhost:5000/api/routes/0", {
    method: "GET" // WIP: send ID in body to return all todo items that belong to user
  })
    .then(checkStatus)
    .then(res => {
      for (let i = 0; i < res.length; i++) {
        addListItemFromJSON(res[i].todo);
      }
    })
    .catch(error => {
      setErrorHeader(`${error}`);
    });
};

// post to the list, used when add is clicked
const postList = text => {
  clearErrorHeader();
  fetch('http://localhost:5000/api/routes/', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ todo: text })
    /* WIP: SEND THE USER'S ID AND USERNAME */
  })
    .then(checkStatus)
    .then(res => {
      console.log("Request success from postList: ", res);
    })
    .catch(error => {
      setErrorHeader(`${error}`);
    });
};

// updates specific li ID, called when saved is pressed
const updateListItem = (id, text) => {
  clearErrorHeader();
  const objects = JSON.stringify(
    { 
      id: id,
      todo: text 
    });

  fetch('http://localhost:5000/api/routes/', {
    /* TODO: */
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: objects
  })
    .then(checkStatus)
    .then(res => {
      console.log("Request success: ", res);
    })
    .catch(error => {
      setErrorHeader(`${error}`);
    });
};

const deleteListItem = () => {
  clearErrorHeader();
  fetch("http://localhost:5000/api/routes/0", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(checkStatus)
    .then(res => {
      /* WIP: why does this display when theres invalid URL */
      console.log("Request success: ", res);
    })
    .catch(error => {
      setErrorHeader(`${error}`);
    });
};
