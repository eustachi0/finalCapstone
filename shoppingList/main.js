// array for the shopping list items
const shoppingList = ['dog food', 'cat food', 'toothpaste', 'shampoo', 'washing powder', 'milk', 'coffee beans'];

// get the html element where to append the shopping list items
let htmlItemList = document.getElementById('itemList');

// get userInput element
let userInput = document.getElementById('input');


// event listener for the html with ID of itemList
htmlItemList.addEventListener("click", function(e) {
    if (e.target.tagName === 'LI') {
        e.target.className = 'checked';
    }
})

// event listener for the html element with the input ID
userInput.addEventListener("keyup", function(e) {
    userInput = document.getElementById('input').value;

    if (userInput.length === 0) {
        alert('Please type an item');
    }
    else {
        if (e.keyCode === 13) {
            //will trigger the updateList function
            updateList();
        }
    }
})


// function to add/update the list when a user type/add an item
const updateList = () => {

    // get userInput value
    userInput = document.getElementById('input').value;

    // statement to check if the input text field is empty or not
    if (userInput.length === 0) {
        alert('Please type an item');
    }
    // else, it will add the input value to the shopping list array at the start, so they will be added at top of the list. I prefer it this way
    else {
        // add input value to the array
        shoppingList.unshift(userInput);
        // call the append items function
        appendItems(shoppingList, userInput);
    }

    // clear input field
    clearInput();
}


// function to loop through the array and add each item to a <li>
const addItemToList = (array) => {
    // loop through each item of the array and create a <li> element
    for (let i = 0; i < array.length; i++) {

        // create <li> elements to add the array item
        let listItem = document.createElement('li');
        listItem.innerHTML = array[i];

        // create <span> element for x delete item
        let span = document.createElement('span');
        span.className = "close";
        span.innerHTML = '\u00D7';

        // append the <span> within the listItem
        listItem.appendChild(span);

        // add event listener to the span element to get the item index of the array when clicked
        // it will also set style of the parent <li> to display none
        span.addEventListener("click", function(e) {
            // set parent <li> element sttyle display none
            e.target.parentElement.style.display = 'none';

            // get index of the item
            let itemIndex = array.indexOf(e.target.parentElement.firstChild.data);

            // function deleteItem from the array
            deleteItem(array, itemIndex);
        })

        // append the listItem into the htmlItemList
        htmlItemList.appendChild(listItem);
    }
}

// function to delete an item in the array
function deleteItem(arr, index) {
    arr.splice(index, 1);
}

// function to append items at the start/top when updating the list
function appendItems(array, input) {
    // create <li> elements to add the array item
    let listItem = document.createElement('li');
    listItem.innerHTML = input;

    // create <span> element for x delete item
    let span = document.createElement('span');
    span.className = "close";
    span.innerHTML = '\u00D7';

    // append the <span> within the listItem
    listItem.appendChild(span);

    // add event listener to the span element to get the item index of the array when clicked
    // it will also set style of the parent <li> to display none
    span.addEventListener("click", function(e) {
        // set parent <li> element sttyle display none
        e.target.parentElement.style.display = 'none';

        // get index of the item
        let itemIndex = array.indexOf(e.target.parentElement.firstChild.data);

        // function deleteItem from the array
        deleteItem(array, itemIndex);
    })

    // append the listItem into the htmlItemList using prepend to add it at the start/top of the list
    htmlItemList.prepend(listItem);
}

// function to clear input value
function clearInput() {
    // get the input element
    let clearInput = document.getElementById('input');

    // clear the value
    clearInput.value = '';
}

// a function to console.log the array
function consoleLog() {
    console.log(shoppingList);
}


// call the function to be executed when first load to show existing item in the array
addItemToList(shoppingList);



// help from:
// https://stackoverflow.com/questions/8073673/how-can-i-add-new-array-elements-at-the-beginning-of-an-array-in-javascript
// https://stackoverflow.com/questions/18795028/javascript-remove-li-without-removing-ul