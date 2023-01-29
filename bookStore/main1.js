// constructor function to create book objects
function Book(author, title, genre, price, review, rating) {
    this.author = author;
    this.title = title;
    this.genre = genre;
    this.price = price;
    this.review = review;
    this.rating = rating;
}

// array to store book items
let booksArr = [];

// function to initialize session storage and create html content
function load() {
    if (sessionStorage.getItem("books") === null) {
        sessionStorage.setItem("books", JSON.stringify(booksArr));
    }
    else {
        booksArr = JSON.parse(sessionStorage.getItem("books"));

        //create the html elements
        let bookList = document.getElementById("book-list");

        // loop through the array to create book items
        let i = 0;
        booksArr.forEach(function(book) {

            // create li to contain book details
            let bookItem = document.createElement("li");
            bookItem.innerHTML = `
            <p>Author: 
                <span class="text-description">
                    ${book.author} 
                </span>
                <span class="hide-input">
                    <input type="text" id="edit-author" value="${book.author}">
                    </input>
                </span>
            </p>

            <p>Title:
                <span class="text-description">
                    ${book.title} 
                </span>
                <span class="hide-input">
                    <input type="text" id="edit-author" value="${book.title}">
                    </input>
                </span>
            </p>

            <p>Genre:
                <span class="text-description">
                    ${book.genre} 
                </span>
                <span class="hide-input">
                    <input type="text" id="edit-author" value="${book.genre}">
                    </input>
                </span>
            </p>

            <p>Price: 
                <span class="text-description">
                    ${book.price} 
                </span>
                <span class="hide-input">
                    <input type="text" id="edit-author" value="${book.price}">
                    </input>
                </span>
            </p>

            <p>Review: 
                <span class="text-description quote">
                    ${book.review} 
                </span>
                <span class="hide-input">
                    <input type="text" id="edit-author" value="${book.review}">
                    </input>
                </span>
            </p>

            <p>Rating:
                <span class="text-description">
                    ${Rating(book.rating)}
                </span>
                <span class="hide-input">
                    <select id="rating">
                        <option class="menuOption" value="0">--Select a rating--</option>
                        <option class="menuOption" value="1">★ ☆ ☆ ☆ ☆ 1 star</option>
                        <option class="menuOption" value="2">★ ★ ☆ ☆ ☆ 2 stars</option>
                        <option class="menuOption" value="3">★ ★ ★ ☆ ☆ 3 stars</option>
                        <option class="menuOption" value="4">★ ★ ★ ★ ☆ 4 stars</option>
                        <option class="menuOption" value="5">★ ★ ★ ★ ★ 5 stars</option>
                    </select>
                </span>
            </p>`;

            // create button for edit/save and for delete
            let buttonsDiv = document.createElement("div");
            buttonsDiv.className = "v-spacing flex";
            
            // EDIT BUTTON
            let editButton = document.createElement("button");
            editButton.innerHTML = "Edit";
            editButton.type = "submit";
            editButton.addEventListener("click", function(e) {
                // get index
                let index = e.target.parentElement.parentElement.value;

                // edit button
                editButton = e.target;

                // save button
                saveButton = e.target.nextElementSibling;

                // get all input items visible, using a for loop here to go throught each of them
                let objectLength = Object.keys(booksArr[0]).length;

                for (let i = 0; i < objectLength; i++) {
                    // show input fields
                    let showInput = e.target.parentElement.parentElement.children[i].childNodes[3].firstElementChild;
                    showInput.className = "show-input";
                }

                // when editBook, the select-option will fetch the right value to focus
                FocusSelect(index, e);

                // call editBook function to hide edit button and show saveButton
                editBook(editButton, saveButton);
            })

            // SAVE BUTTON
            let saveButton = document.createElement("button");
            saveButton.innerHTML = "Save";
            saveButton.type = "submit";
            saveButton.style.display = "block";

            // adding eventlistener to call saveBook function
            saveButton.addEventListener("click", function(e) {
                // get index
                let index = e.target.parentElement.parentElement.value;

                // edit button
                editButton = e.target.previousElementSibling;

                // save button
                saveButton = e.target;

                // get all input items hidden, using a for loop here to go throught each of them
                let objectLength = Object.keys(booksArr[0]).length;

                for (let i = 0; i < objectLength; i++) {
                    // show input fields
                    let showInput = e.target.parentElement.parentElement.children[i].childNodes[3].firstElementChild;
                    showInput.className = "hide-input";
                }

                // call saveBook function
                saveBook(index, editButton, saveButton, e);
            })

            // DELETE BUTTON
            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.type = "button";

            deleteButton.addEventListener("click", function(e) {
                // get index
                let index = e.target.parentElement.parentElement.value;

                // remove/hide html elements
                e.target.parentElement.parentElement.remove();

                // call deleteBook function
                deleteBook(index);
            })


            // assign the index value to the value of each <li>
            bookItem.value = i;
            i++;

            // append li to the ul
            bookList.appendChild(bookItem);
            // append the form to the li
            // bookItem.appendChild(editBookForm);
            // append buttons to the li
            bookItem.appendChild(buttonsDiv);
            buttonsDiv.appendChild(editButton);
            buttonsDiv.appendChild(saveButton);
            buttonsDiv.appendChild(deleteButton);
        })
    }
}

// add book function using the constructor function to create book objects with data from the input
function addBook() {
    booksArr = JSON.parse(sessionStorage.getItem("books"));

    // creating a new book
    let newBook = new Book(
        document.getElementById("author").value,
        document.getElementById("title").value,
        document.getElementById("genre").value,
        document.getElementById("price").value,
        document.getElementById("review").value,
        document.getElementById("rating").value
    )

    // pushing new books to the array
    booksArr.push(newBook);

    // sending the new book to the session storage
    sessionStorage.setItem("books", JSON.stringify(booksArr));
}

// function to edit books
function editBook(editButton, saveButton) {
    editButton.style.display = "none";
    saveButton.style.display = "block";
}

// function to save the new values after editing
function saveBook(index, editButton, saveButton, e) {
    learners = JSON.parse(sessionStorage.getItem("books"));

    // get all input values (edit them), and save the new/edited values to the exisiting array
    // edit author
    booksArr[index].author = e.target.parentElement.parentElement.children[0].childNodes[3].firstElementChild.value;
    // edit title
    booksArr[index].title = e.target.parentElement.parentElement.children[1].childNodes[3].firstElementChild.value;
    // edit genre
    booksArr[index].genre = e.target.parentElement.parentElement.children[2].childNodes[3].firstElementChild.value;
    // edit price
    booksArr[index].price = e.target.parentElement.parentElement.children[3].childNodes[3].firstElementChild.value;
    // edit review
    booksArr[index].review = e.target.parentElement.parentElement.children[4].childNodes[3].firstElementChild.value;
    // edit rating
    booksArr[index].rating = e.target.parentElement.parentElement.children[5].childNodes[3].firstElementChild.value;


    // sending the new book to the session storage
    sessionStorage.setItem("books", JSON.stringify(booksArr));

    // hide save button
    saveButton.style.display = "none";

    // show editButton
    editButton.style.display = "block";

    // refresh page
    location.reload();
}

// function to delete a book
function deleteBook(index) {
    learners = JSON.parse(sessionStorage.getItem("books"));
    
    // delete item with a specific index
    booksArr.splice(index, 1)

    // sending the new book to the session storage
    sessionStorage.setItem("books", JSON.stringify(booksArr));
}

// function to show rating stars
function Rating(value) {
    // variable to store the result to be return
    let result;

    // statements
    // value is empty
    if (value === "0") {
        result = "No review"
    }
    //when value is equal to 1
    else if (value === "1") {
        result = "★ ☆ ☆ ☆ ☆ 1 star";
    }
    //when value is equal to 2
    else if (value === "2") {
        result = "★ ★ ☆ ☆ ☆ 2 stars";
    }
    //when value is equal to 3
    else if (value === "3") {
        result = "★ ★ ★ ☆ ☆ 3 stars";
    }
    //when value is equal to 4
    else if (value === "4") {
        result = "★ ★ ★ ★ ☆ 4 stars";
    }
    //when value is equal to 5
    else if (value === "5") {
        result = "★ ★ ★ ★ ★ 5 stars";
    }

    return result;
}


// function to focus the select dropdown menu
function FocusSelect(index, e) {
    learners = JSON.parse(sessionStorage.getItem("books"));

    // get value from object
    item = booksArr[index].rating;

    // get the indexed option html
    let menuOption = e.target.parentElement.parentElement.children[5].children[1].children.rating[0];
    // fetch/match values
    let menuOptionValue = document.getElementsByClassName("menuOption")[item].value;

    // statements, if item equal to a number from 0 to 5, the dropdown will focus on the true value
    if (item == "0") {
        menuOption = e.target.parentElement.parentElement.children[5].children[1].children.rating[0];
    }
    else if (item == "1") {
        menuOption = e.target.parentElement.parentElement.children[5].children[1].children.rating[1];
        menuOption.selected = true;
    }
    else if (item == "2") {
        menuOption = e.target.parentElement.parentElement.children[5].children[1].children.rating[2];
        menuOption.selected = true;
    }
    else if (item == "3") {
        menuOption = e.target.parentElement.parentElement.children[5].children[1].children.rating[3];
        menuOption.selected = true;
    }
    else if (item == "4") {
        menuOption = e.target.parentElement.parentElement.children[5].children[1].children.rating[4];
        menuOption.selected = true;
    }
    else if (item == "5") {
        menuOption = e.target.parentElement.parentElement.children[5].children[1].children.rating[5];
        menuOption.selected = true;
    }


    // sending the new book to the session storage
    sessionStorage.setItem("books", JSON.stringify(booksArr));
}