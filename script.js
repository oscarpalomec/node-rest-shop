const app = document.querySelector(".container");
const modalButton = document.getElementById("show-modal");
const bookContainer = document.getElementById("book-container");
const form = document.getElementById('form');
const deleteButton = document.getElementById('delete-button');


const url = "http://localhost:3000/products/";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.products.forEach((libro) => {
      let bookCard = document.createElement("div");
      let bookTitle = document.createElement("span");
      bookTitle.classList.add("text");
      bookTitle.setAttribute("id", "titulo");
      let bookAuthor = document.createElement("span");
      bookAuthor.classList.add("text");
      let bookEditorial = document.createElement("span");
      bookEditorial.classList.add("text");
      let bookPages = document.createElement("span");
      bookPages.classList.add("text");
      let bookRead = document.createElement("span");
      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Borrar";
      deleteButton.setAttribute("id", "delete-button");
      deleteButton.style.cssText = "background-color:red; color:white; border-radius:10px; cursor: pointer; margin-bottom:16px; font-weight: 700; font-size:14px"

      bookTitle.textContent = `Título: ${libro.name}`;
      bookAuthor.textContent = `Autor: ${libro.author}`;
      bookEditorial.textContent = `Editorial: ${libro.editorial}`;
      bookPages.textContent = `Precio: $${libro.price}.00`;

      bookCard.setAttribute("id", libro._id);
      bookTitle.addEventListener("click", function () {
        window.location.href = `./libro.html?id=${libro._id}`;
      });
      bookCard.style.cssText =
        "box-sizing: border-box; width: 23%; background:#323232; display:flex; flex-direction:column; margin-left: 1%; margin-right:1%; border-radius:5%; align-items:center; margin-bottom: 2rem";
      bookCard.appendChild(bookTitle);
      bookCard.appendChild(bookAuthor);
      bookCard.appendChild(bookEditorial);
      bookCard.appendChild(bookPages);
      bookCard.appendChild(bookRead);
      bookCard.appendChild(deleteButton);
      bookContainer.appendChild(bookCard);
      
      deleteButton.addEventListener("click", ()=> {
          console.log(libro._id)
          fetch(`http://localhost:3000/products/${libro._id}`, {
              method: 'DELETE',
          })
          .then(res => res.json())
          .then(()=> location.reload())
      });

      
      
    });
    console.log(data);
  })
  .catch((err) => console.log(err));
//app.innerHTML = "Hola mundo"

function showModal() {
  document.querySelector(".bg-modal").style.display = "flex";
}

function closeModal() {
  document.querySelector(".bg-modal").style.display = "none";
}

modalButton.addEventListener("click", showModal);

document.querySelector(".close").addEventListener("click", closeModal);

form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const editorial = document.getElementById('bookEditorial').value;
    const genre = document.getElementById('bookGenre').value;
    const price = document.getElementById('bookPrice').value;

    form.reset();

    fetch("http://localhost:3000/products", {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            author: author,
            editorial: editorial,
            genre: genre,
            price: price
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        
    }).then(function(response){
        return response.json()
        
    })
    .then(function(data){
        console.log(data)
       
    })
    form.target.reset();

})



