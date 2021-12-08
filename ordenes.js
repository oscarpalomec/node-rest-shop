const ordersContainer = document.querySelector(".orders-list");
const addPostForm = document.querySelector(".add-post-form");
const selectInput = document.querySelector("#clientId")
const selectInputBook = document.querySelector('#productId')
const bookInfoContainer = document.querySelector('#book-info')

let output = "";
let infobook = "";
let infoclient = "";

const renderOrders =(data) => {
    data.orders.forEach(order => {
        console.log(order)
        
       
        output += `
        <div class="card mt-4 col-md-6 bg-light" >
        <div class="card-body" data-id=${order._id}>
          <h5 class="card-title">Id:  ${order._id}</h5>
          <h6 class="card-subtitle mb-2 ">Cliente: ${order.client.name} ${order.client.paternoLastName} ${order.client.maternoLastName}</h6>
          <h6 class="card-subtitle mb-2 ">Fecha: ${order.createdAt}</h6>
          <h6 class="card-subtitle mb-2 ">Libro: ${order.product.name}</h6>
          <h6 class="card-subtitle mb-2 ">Precio individual: $${order.product.price}.00</h6>
          <h6 class="card-subtitle mb-2 ">Cantidad: ${order.quantity}</h6>
          <h5 class="card-subtitle mb-2 ">Total: $${(order.product.price)*(order.quantity)}.00</h5>
          <a href="#" class="card-link" id="delete-order">Borrar</a>
        </div>
      </div>
        
        `
    });
    
    ordersContainer.innerHTML = output;
}


fetch("http://localhost:3000/orders")
.then((res) => res.json())
.then((data) => renderOrders(data))
.catch((err) => console.log(err));


//Insertar nueva orden
// Metodo POST



addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Conseguido');

    const productId = document.getElementById('productId').value;
    const clientId = document.getElementById('clientId').value;
    const quantity = document.getElementById('bookQuantity').value;
    console.log(clientId)
    addPostForm.reset();

    fetch("http://localhost:3000/orders",{
        method: 'POST',
        body: JSON.stringify({
            productId: productId,
            client: clientId,
            quantity: quantity
            
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(function(response){
        return response.json()
    })
    .then(()=> location.reload())

     
})


ordersContainer.addEventListener('click', (e) => {
    e.preventDefault()
    let delButtonIsPressed = e.target.id == 'delete-order'

    if(delButtonIsPressed){
        let id = e.target.parentElement.dataset.id;

        
        fetch(`http://localhost:3000/orders/${id}`, {
              method: 'DELETE',
          })
          .then(res => res.json())
          .then(()=> location.reload())
    }
})
//get clients
fetch("http://localhost:3000/clients/")
  .then((res) => res.json())
  .then((data) => { data.clients.forEach(client => {
      let option = document.createElement("option");
      option.textContent = `${client.name} ${client.paternoLastName} ${client.maternoLastName}`
      option.setAttribute("value", client._id);
      selectInput.appendChild(option);

      selectInput.addEventListener('change', ()=> {
        if (selectInput.value == client._id){
            infoclient = `
            <div class="card bg-info" >
                    <div class="card-body">
                    <h4 class="card-title">Datos del cliente: </h4>
                    <h6 class="card-subtitle mb-2">Compruebe que la información es correcta.</h6>
                      <h5 class="card-title">${client.name} ${client.paternoLastName} ${client.maternoLastName}</h5>
                      <h6 class="card-subtitle mb-2">${client.email}</h6>
                      <h6 class="card-subtitle mb-2">${client.phone}</h6>
                    </div>
                  </div>
            `
            bookInfoContainer.innerHTML = infoclient;
        }
    
    
    })

      
  })})
  .catch((err) => console.log(err));

  fetch("http://localhost:3000/products/")
  .then((res) => res.json())
  .then((data) => { data.products.forEach(product => {
      let option = document.createElement("option");
      option.textContent = product.name
      option.setAttribute("value", product._id);
      selectInputBook.appendChild(option);

      selectInputBook.addEventListener('change', ()=> {
        if (selectInputBook.value == product._id){
            infobook = `
            <div class="card bg-info" >
                    <div class="card-body">
                    <h4 class="card-title">Datos del libro: </h4>
                    <h6 class="card-subtitle mb-2 ">Compruebe que la información es correcta.</h6>
                      <h5 class="card-title">${product.name}</h5>
                      <h6 class="card-subtitle mb-2">${product.author}</h6>
                      <h6 class="card-subtitle mb-2 ">${product.editorial}</h6>
                      <p class="card-text">Precio: $${product.price}.00</p>
                    </div>
                  </div>
            `
            bookInfoContainer.innerHTML = infobook;
        }
    
    
    })

      


      
  })}
  )
  .catch((err) => console.log(err));