// TASK 42

// variable to store sibling element, when the saveButton is clicked it will add the sibling element to this sibling variable
let savedItem = '';

// array to store sibling elements, this will our save for later array
let savedItemsArr = [];

// some session storage values
let buttonMessage = "A message"; // change the message of the button after clicking it
let counter = 0; // get the count of the clicked buttons

// comments array
let commentArr = ["I am really enjoying the HyperionDev Bootcamp. Thanks"];


// using session storage for this task 42
// function to initialize session storage
function load() {
    if (sessionStorage.getItem("savedItems") == null) {
        sessionStorage.setItem("savedItems", JSON.stringify(savedItemsArr));
        sessionStorage.setItem("counter", counter);

    }
}


// ----- SAVE FOR LATER -----

// function safe for later
// I learnt to pass (this) when calling the function to do something to the current element, in this case I'm calling the function when onclick using (this) in the html
function saveForLater(currentButton) {
    // get session storage array values
    savedItemsArr = JSON.parse(sessionStorage.getItem("savedItems"));

    // variable to store the parent/previoussibling element of the button clicked, using innerHTML to store the value as text
    savedItem = currentButton.parentElement.previousElementSibling.innerHTML;

    // pushing savedItem to savedItemsArr
    savedItemsArr.push(savedItem);

    // updating the session storage
    sessionStorage.setItem("savedItems", JSON.stringify(savedItemsArr));
    sessionStorage.setItem("counter", counter);
}


// ----- CREATE ELEMENTS ON MYFOLDER PAGE -----

// function to create html element from array in the save for later page
function createList() {
    // get div element to insert saved items
    let savedItemsDiv = document.getElementById("saved-items");

    // get session storage array values
    savedItemsArr = JSON.parse(sessionStorage.getItem("savedItems"));

    // create html element for each saved item using map
    savedItemsArr.map(function(savedItems) {
        // create new html section
        let newSavedItem = document.createElement('section');
        newSavedItem.innerHTML = `<div class="separator2"></div> ${savedItems} <br>`;

        // using prepend to insert saved items at the top of the page, I'd prefer to see the latest item I save at the top of the page
        savedItemsDiv.prepend(newSavedItem);
    });
}

// ----- LEAVE A COMMENT -----

// function to add a comment to the array and display the last one
function leaveComment() {
  // set session storage
  if (sessionStorage.getItem("comments") == null) {
    sessionStorage.setItem("comments", JSON.stringify(commentArr));
  } else {
    
  // get session storage array values
    commentArr = JSON.parse(sessionStorage.getItem("comments"));
  }


    // array length
    let arrLength = (commentArr.length) - 1;

    // get html element to display the latest comment
    let latestComment = document.getElementById('latest-comment');
    
    // grab latest comment in the array when first load
    latestComment.innerHTML = `<h4>Latest comment:</h4><p class="comment-text">"${commentArr[arrLength]}"</p>`;

    // get html element to display validation messages
    let messageValid = document.getElementById('message-val');
    messageValid.innerHTML = "";
    
    // get submit button to add event listener to update the form
    let submitButton = document.getElementById('button-comment');
    
    submitButton.addEventListener('click', function(e) {
      // get input value
      let inputCom = document.getElementById("comment");

      // validation
      if (inputCom.value.length === 0) {
        messageValid.innerHTML = "Please type something";
      } else {
        commentArr.push(inputCom.value);
        latestComment.innerHTML = `<h4>Latest comment:</h4><p class="comment-text">"${commentArr[arrLength + 1]}"</p>`;
        messageValid.innerHTML = "Submit OK!";
        document.getElementById('button-comment').disabled = true;

        // update session storage
        sessionStorage.setItem("comments", JSON.stringify(commentArr));
      }

      // clear input
      inputCom.value = '';
    })
}

// call the function leaveComment()
leaveComment();



// ----- CONTACT FORM -----

function contactForm() {
  // get html inputs
  let nameInput = document.getElementById('yName');
  let surnameInput = document.getElementById('ySurname');
  let emailInput = document.getElementById('email');
  let contactVal = document.getElementById('contact-val');

  // statament for validation
  if (nameInput.value.length === 0 && surnameInput.value.length === 0 && emailInput.value.length === 0) {
    contactVal.innerHTML = "Please fill all fields"
  } else {
    contactVal.innerHTML = "Submit OK!";
    // disable button
    document.getElementById('button-contact').disabled = true;
  }

  // clear input values
  nameInput.value = '';
  surnameInput.value = '';
  emailInput.value = '';
}


// ----- SURVEY FORM -----

function surveyForm() {
  // get html elements
  let surveyVal = document.getElementById('survey-val');

  surveyVal.innerHTML = "Submit OK! Thanks";

  // disable button
  document.getElementById('survey-button').disabled = true;

}


// ----- DISABLE BUTTONS -----

// functions to disable the button after being clicked
const buttons = document.querySelectorAll('.save');

// Retrieve the button state from localStorage and each
// button's state
function getButtonState (buttons) {
  [].forEach.call(buttons, function(button) {
    if (sessionStorage.getItem(button.id) == 'disabled') {
      button.disabled = true;
    }
  });
};

// Add an event listener to each button to
// disable and store the button's state on click
function setButtonState(buttons) {
  [].forEach.call(buttons, function(button) {
    button.addEventListener('click', function (e) {
      button.disabled = true;
      sessionStorage.setItem(button.id, 'disabled')
    });
  });
}

// Call the getButtonState function to set the initial state
// of each button
getButtonState(buttons);
// Call the setButtonState function to set the new state
// of each button
setButtonState(buttons);


// ----- COUNTER -----

// function to retrieve the counter value variable and update html element
function countItems() {
  // get value of counter from session storage
  counter = Number(JSON.parse(sessionStorage.getItem("counter")));

  // retrive counter value on load and print html element
  //statements
  // more than 1 items, it will say items saved (plural)
  if (counter > 1) {
    document.getElementById('counter').innerHTML = `${counter} items saved`;
  }
  // equal 1 items, it will say item saved (singular)
  else {
    document.getElementById('counter').innerHTML = `${counter} item saved`;
  }

  buttons.forEach(function(button) {
    button.addEventListener('click', function () {
      // get value of counter from session storage
      counter = Number(JSON.parse(sessionStorage.getItem("counter")));
      ++counter;
      if (counter > 1) {
        // update html element with the counter value and display alert message
        document.getElementById('counter').innerHTML = `${counter} items saved`;
        alert(`${counter} items saved`);
      }
      // equal 1 items, it will say item saved (singular)
      else {
        document.getElementById('counter').innerHTML = `${counter} item saved`;
        alert(`${counter} item saved`);
      }

      // update session storage counter value 
      sessionStorage.setItem("counter", counter);
    });
  })
}

// calling function to always retrieve counter value on page refresh
countItems();


// ----- LIKE BUTTONS -----

// functions to disable the button after being clicked
const likeButtons = document.querySelectorAll('.like-button');


// Retrieve the button state from localStorage and each
// button's state
function getLikeButtonState (likeButtons) {
    likeButtons.forEach(function(likeButton) {
        if (sessionStorage.getItem(likeButton.id) == 'class="liked"') {
        likeButton.className = 'liked';
        likeButton.innerHTML = 'Liked &#128077;';
        }
    });
};

// Call the getLikeButtonState function to set the initial state
// of each like button
getLikeButtonState(likeButtons);

// Add an event listener to each button to
// disable and store the button's state on click
function setLikeButtonState(likeButtons) {
    likeButtons.forEach(function(likeButton) {
        likeButton.addEventListener('click', function (e) {
        likeButton.className = 'liked';
        likeButton.innerHTML = 'Liked &#128077;';
        sessionStorage.setItem(likeButton.id, 'class="liked"');
        });
    });
}

// Call the setLikeButtonState function to set the new state
// of each button
setLikeButtonState(likeButtons);




// found help here
// https://stackoverflow.com/questions/68957975/how-to-select-sibling-div-based-on-button-click-using-javascript
// user16762262

// https://stackoverflow.com/questions/41419713/storing-disabled-button-in-local-storage

// https://stackoverflow.com/questions/16053357/what-does-foreach-call-do-in-javascript