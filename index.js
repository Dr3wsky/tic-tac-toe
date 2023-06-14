// DOM Access and Global Variable Assignment for func declarations
const booksGrid = document.querySelector(".books-grid");
const ele = document.querySelector(":root");
const redColor = getComputedStyle(ele).getPropertyValue("--red");
const greenColor = getComputedStyle(ele).getPropertyValue("--green");
const addBookBtn = document.getElementById("add-book-btn");
const submitBtn = document.getElementById("submit-btn");
const addBookModal = document.getElementById("add-book-modal");
const overlay = document.querySelector(".overlay");
const formInput = document.getElementById("book-form");
const title = document.getElementById("title");
const titleError = document.getElementById("title-error");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Data Structure and objects

// Initialize blank library
var myLibrary = [];

// Object constructor for new book obj
function Book(id, title, author, pages, readStatus) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.info = function () {
    if (readStatus) {
      return `${this.title} by ${this.author} has ${this.pages} and has been read`;
    } else {
      return `${this.title} by ${this.author} has ${this.pages} and is NOT read yet`;
    }
  };
}

// Obtain form submission data
function getBookFromInput() {
  let bookId = myLibrary.length;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  let isRead = document.getElementById("is-read").checked;
  return new Book(bookId, title, author, pages, isRead);
}

// Make new book card display form new book obj
function makeNewCard(book) {
  // make elements
  const bookCard = document.createElement("div");
  const title = document.createElement("div");
  const author = document.createElement("div");
  const pages = document.createElement("div");
  const readBtn = document.createElement("button");
  const delBtn = document.createElement("button");

  // assign css & event listeners
  bookCard.classList.add("book-card");
  bookCard.setAttribute("id", `${book.id}`);
  title.classList.add("book-info", "title");
  author.classList.add("book-info", "author");
  pages.classList.add("book-info", "pages");
  readBtn.classList.add("btn", "book-info", "btn-read");
  readBtn.addEventListener("click", toggleRead);
  delBtn.classList.add("btn", "book-info", "btn-del");
  delBtn.addEventListener("click", deleteCard);

  // insert content
  title.textContent = `${book.title}`;
  author.textContent = `By: ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  if (book.readStatus) {
    readBtn.classList.add("read");
    readBtn.innerHTML = "READ";
  } else {
    readBtn.innerHTML = "NOT READ";
  }
  delBtn.textContent = "DELETE";

  // Append information
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(delBtn);
  booksGrid.appendChild(bookCard);
}

function deleteCard(e) {
  const bookId = e.target.parentElement.id;
  booksGrid.removeChild(e.target.parentElement);
  const removedBook = myLibrary.splice(bookId, 1); // Update Library indexes and book card IDs
  updateLibrary(bookId);
}

function updateLibrary(bookId) {
  for (let i = +bookId; i < myLibrary.length; i++) {
    myLibrary[i].id = i;
    let tempCard = document.getElementById(`${i + 1}`);
    tempCard.setAttribute("id", `${i}`);
  }
}

function checkDuplicate(newTitle) {
  return myLibrary.some(
    (book) => book.title.toLowerCase() === newTitle.toLowerCase()
  );
}

// Change text and color of read button
function toggleRead(e) {
  const bookId = e.target.parentElement.id;
  if (myLibrary[bookId].readStatus) {
    e.currentTarget.classList.remove("read");
    e.currentTarget.innerHTML = "NOT READ";
    myLibrary[bookId].readStatus = false;
  } else {
    e.currentTarget.classList.add("read");
    e.currentTarget.innerHTML = "READ";
    myLibrary[bookId].readStatus = true;
  }
}

// Modal events and actions
const openBookModal = () => {
  overlay.style.display = "block";
  addBookModal.classList.add("active");
};

const closeModal = () => {
  addBookModal.classList.remove("active");
  overlay.style.display = "none";
  titleError.textContent = "";
  formInput.reset(); // Clears form data when modal closes
};

const checkKeyPress = (e) => {
  console.log(e);
  if (e.key === "Escape") {
    closeModal();
  }
};

// Function calls for full functionality
function addBook(e) {
  if (formInput.checkValidity()) {
    const newBook = getBookFromInput();
    if (checkDuplicate(newBook.title)) {
      titleError.textContent = "This book already exists in your library";
      title.classList.add("error");
      e.preventDefault();
      return;
    } else {
      titleError.textContent = "";
      title.classList.remove("error");
    }
    myLibrary.push(newBook);
    makeNewCard(newBook, myLibrary);
    e.preventDefault();
    closeModal();
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Handle Form info and create book
submitBtn.onclick = addBook;

// Interact w. buttons and modal control
addBookBtn.onclick = openBookModal;
window.onkeyup = checkKeyPress;
overlay.onclick = closeModal;
