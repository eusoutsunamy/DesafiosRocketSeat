const express = require('express');
const {uuid, isUuid } = require('uuidv4');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const repositories= [];

function validRequest(request, response, next){
    const { id } = request.params;
    if(!isUuid(id)){
        return response.status(400).json({error: 'Invalid repository Id.'});
    }
    return next();
}

app.use('/repositories/:id', validRequest);

app.get('/repositories', (request, response) => {
    return response.json(repositories);
})

app.post('/repositories', (request, response) => {
    const {title, url, techs} = request.body;
    var repository = { id: uuid() , title, url, techs, likes: 0 }; 
    repositories.push(repository);
    return response.json(repository);
})

app.post('/repositories/:id/like', (request, response) => {
    const { id } = request.params;
    const {title, url, techs} = request.body;

    const indexIten = repositories.findIndex( repos => repos.id === id);
    if(indexIten < 0){
        return response.status(400).json({error: 'Repository Id not founded.'});
    }
    const repository = repositories[indexIten];
    repository.likes = repository.likes + 1;
    repositories[indexIten] = repository;

    return response.json(repository);
})

app.put('/repositories/:id', (request, response) => {

    const { id } = request.params;
    const {title, url, techs} = request.body;

    const indexIten = repositories.findIndex( repos => repos.id === id);
    if(indexIten < 0){
        return response.status(400).json({error: 'Repository Id not founded.'});
    }
    const repository = repositories[indexIten];
    repository.title = title;
    repository.url = url;
    repository.techs = techs;
    repositories[indexIten] = repository;

    return response.json(repository);
})

app.delete('/repositories/:id', (request, response) => {
    const { id } = request.params;

    const indexIten = repositories.findIndex( repos => repos.id === id);
    if(indexIten < 0){
        return response.status(400).json({error: 'Repository Id not founded.'});
    }
    repositories.splice(indexIten, 1);
    response.status(204).send();
})

app.listen(3333, () => {
    console.log('✌  Back-end started!');
});

