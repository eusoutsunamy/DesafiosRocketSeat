const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
/*
 funcao para fazer log da api
*/
function logRequests(request, response, next){
    const { method, url } = request;
    console.log(method);
    console.log(url);
    return next();
}

function validRequest(request, response, next){
    const { id } = request.params;
    if(id <= 0){
        return response.status(400).json({error: 'Id inválido.'});
    }
    return next();
}

//app.use(logRequests);
app.use('/projects/:id', validRequest);

app.get('/projects', (request, response) => {
    const query = request.query;

    return response.json(['teste 1', 'teste 2']);
})

app.post('/projects', (request, response) => {
    const body = request.body;
    console.log(body);
    return response.json(['teste 1', 'teste 2', 'teste 3']);
})

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    console.log(id);
    return response.json(['teste 1', 'teste 4', 'teste 3']);
})

app.delete('/projects/:id', (request, response) => {
    return response.json(['teste 1', 'teste 4']);
})

app.listen(3333, () => {
    console.log('✌  Back-end started!');
});

