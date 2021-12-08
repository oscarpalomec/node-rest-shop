const clientContainer = document.querySelector('.clients-list');
const form = document.getElementById('form');
let output = "";

const renderClients =(data) => {
    data.clients.forEach(client => {
        
        output += `
        <div class="card mt-4 col-md-6 bg-light" >
        <div class="card-body" data-id=${client._id}>
          <h5 class="card-title">${client.name} ${client.paternoLastName} ${client.maternoLastName}</h5>
          <h6 class="card-subtitle mb-2 text-muted">ID: ${client._id}</h6>
          <p class="card-text">Email: ${client.email}</p>
          <p class="card-text">Teléfono: ${client.phone}</p>
          <a href="#" class="card-link" id="delete-client">Borrar</a>
        </div>
      </div>
        
        `
    });
    clientContainer.innerHTML = output;
}

fetch("http://localhost:3000/clients")
.then((res) => res.json())
.then((data) => renderClients(data))
.catch((err) => console.log(err));

form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('clientName').value;
    const paternoLastName = document.getElementById('clientPaternoLastName').value;
    const maternoLastName = document.getElementById('clientMaternoLastName').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    form.reset();
    
    
    fetch("http://localhost:3000/clients", {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            paternoLastName: paternoLastName,
            maternoLastName: maternoLastName,
            email: email,
            phone: phone
            
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(function(response){
        return response.json()
       
    })
    .then(()=> {location.reload()})

    

})

clientContainer.addEventListener('click', (e) => {
    e.preventDefault()
    let delButtonIsPressed = e.target.id == 'delete-client'

    if(delButtonIsPressed){
        let id = e.target.parentElement.dataset.id;

        
        fetch(`http://localhost:3000/clients/${id}`, {
              method: 'DELETE',
          })
          .then(res => res.json())
          .then(()=> location.reload())
    }
})

//GET clients

