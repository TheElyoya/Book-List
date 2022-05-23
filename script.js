//get elements
let myForm = document.getElementById("myForm");
let tbody = document.querySelector(".body");
let table = document.getElementById("table");
let h1 = document.getElementById("h1");
//unique id generated
function ID() {
  return Math.random().toString(36).substring(2, 9);
}

//create class actions
class Actions {
  //method to add to page from local storage
  addBookToPage() {
    tbody.innerHTML = "";
    let books = JSON.parse(window.localStorage.getItem("books"));
    for (let i = 0; i < books.length; i++) {
      let row = document.createElement("tr");
      row.innerHTML = `<td>${books[i].title} </td> <td>${books[i].author} </td> <td style="display:flex  ; justify-content: space-between;">${books[i].isbn} <div class="delete">X</div></td>`;
      row.classList.add(books[i].id);
      tbody.append(row);
    }
  }
  //clear fields
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
  //add to local storage
  addToLocalStorage(id, title, author, isbn) {
    if (title !== "" && author !== "" && isbn !== "") {
      let books = JSON.parse(window.localStorage.getItem("books")) || [];
      books.push({ id, title, author, isbn });
      window.localStorage.setItem("books", JSON.stringify(books));
      //if added throw message notify that a book is added
      let added = document.createElement("div");
      added.innerText = "Book Added";
      added.className = "added";
      h1.after(added);

      setTimeout(function () {
        added.remove();
      }, 3000);
      //throw error if one field or more are empty
    } else {
      let error = document.createElement("div");
      error.innerText = "Please Fill In All Fields";
      error.className = "error";
      h1.after(error);

      setTimeout(function () {
        error.remove();
      }, 3000);
    }
  }
  //delete book from page and locale storage
  deleteBook(e) {
    e.target.parentElement.parentElement.remove();
    let books = JSON.parse(window.localStorage.getItem("books"));
    let newBooks = books.filter(
      (elem) => elem.id !== e.target.parentElement.parentElement.className
    );
    window.localStorage.setItem("books", JSON.stringify(newBooks));
  }
}

//check local storage
if (window.localStorage.getItem("books")) {
  let action = new Actions();
  action.addBookToPage();
}

//on submit
myForm.onsubmit = function (e) {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let isbn = document.getElementById("isbn").value;

  const action = new Actions();

  action.addToLocalStorage(ID(), title, author, isbn);
  action.addBookToPage();
  //call clearFields
  action.clearFields();
};

//on delete
document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    let action = new Actions();
    action.deleteBook(e);
  }
});
