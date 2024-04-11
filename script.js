const myLibrary = [["The Aeneid", "Virgil", 484, true], ["The Iliad", "Homer", 525, true]];

// This is a constructor for making Book objects.
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    if (this.read === true) {
      infoString = `${this.title} by ${this.author}, ${this.pages} pages, already read`;
    } else {
      infoString = `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    }
    return infoString;
  }
}

// Adds a new Book object to the array of Book objects.
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// Loops through the myLibrary array and displays every book on the page.
function displayBooks(myLibrary) {
  const libraryTableContainer = document.getElementById("table-container");
  const libraryTable = document.createElement("table");
  const tableHead = document.createElement("thead");
  const tableBody = document.createElement("tbody");

  const tableHeaders = ["Title", "Author", "Pages", "Read?"];
  const headerRow = document.createElement("tr");

  // Create the table header
  for (let i = 0; i < tableHeaders.length; i++) {
    const headerElement = document.createElement("th");
    const headerElementText = document.createTextNode(tableHeaders[i]);
    headerElement.appendChild(headerElementText);
    headerRow.appendChild(headerElement)
    tableHead.appendChild(headerRow);
  }

  // Add each book object in myLibrary to the table
  for (let i = 0; i < myLibrary.length; i++) {
    const tableRow = document.createElement("tr");
    for (let j = 0; j < myLibrary[i].length; j++) {
      const rowElement = document.createElement("td");
      const rowElementText = document.createTextNode(myLibrary[i][j]);
      rowElement.appendChild(rowElementText);
      tableRow.appendChild(rowElement);
    }
    tableBody.appendChild(tableRow);
  }

  libraryTable.appendChild(tableHead);
  libraryTable.appendChild(tableBody);
  libraryTableContainer.appendChild(libraryTable);

}

// Clears the table of books so it can be rewritten with a new book.
function clearTable() {
  const libraryTableContainer = document.getElementById("table-container");
  libraryTableContainer.innerHTML = "";
}

// Constants for operating the form to submit a new book
const dialog = document.getElementById("new-book-dialog");
const newBookForm = document.getElementById("new-book-form");
const showDialogButton = document.getElementById("add-new-book");
const closeDialogButton = document.getElementById("submit-new-book");

// Opens the form to submit a new book
showDialogButton.addEventListener("click", () => {
  dialog.showModal();
})

// Stores the book info in the myLibrary array, displays the updated book list, and closes the form
newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  newBookArray = [];
  
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");

  function getRadioValue() {
    var radioElements = document.getElementsByName("read");

    for (let i = 0; i < radioElements.length; i++) {
      if (radioElements[i].checked) {
        return radioElements[i].value
      }
    }
  }

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const isRead = getRadioValue();

  newBookArray.push(title, author, pages, isRead);
  myLibrary.push(newBookArray);
  clearTable();
  displayBooks(myLibrary);
  dialog.close();
})
 
displayBooks(myLibrary);