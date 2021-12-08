const app = document.querySelector('.book-container');
const botonActualizar = document.getElementById('update-price-button');
const nuevoPrecio = document.getElementById('newPrice').value;
let output = "";

const getURL = new URLSearchParams(window.location.search)

const url = 'http://localhost:3000/products'

_id = getURL.get('id')

console.log(`${url}/${_id}`)

fetch(`${url}/${_id}`)
.then(res => res.json())
.then(data => {
    output +=`
        <div class="card mt-4 col-md-6 bg-warning" >
        <div class="card-body">
          <h5 class="card-title">Id: ${data.product._id}</h5>
          <h6 class="card-subtitle mb-2">Título: ${data.product.name}</h6>
          <h6 class="card-subtitle mb-2">Autor: ${data.product.author}</h6>
          <h6 class="card-subtitle mb-2">Editorial: ${data.product.editorial}</h6>
          <h6 class="card-subtitle mb-2">Género: ${data.product.genre}</h6>
          <h6 class="card-subtitle mb-2">Precio: $${data.product.price}.00</h6>
        </div>
      </div>
        
        `

    app.innerHTML = output;
})
.catch(err => console.log(err))

botonActualizar.addEventListener('click', (e) =>{
    e.preventDefault();
    console.log(nuevoPrecio);
    fetch(`${url}/${_id}`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify([
            {"propName": "price", "value": parseInt(nuevoPrecio)}
        ])
    })
    .then(res => res.json) 
    .then(()=> location.reload())
});