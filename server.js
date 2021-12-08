const http = require('http');
const fs = require('fs');

const app = require('./app');

const port = process.env.PORT ||3000;

const server = http.createServer(app);


function onRequest(request, response){
    response.writeHead(200);
    fs.readFile('./index.html', null, function(error,data){
        if(error){
            response.writeHead(404);
            response.write('Archivo no encontrado');
        } else {
            response.write(data);
        }
        response.end();
    })
   
}

server.listen(port);
console.log('Api iniciando en el puerto ' + port);