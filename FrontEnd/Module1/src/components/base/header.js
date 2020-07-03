import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Header({ title }) {

    const [projects, setProjetcts] = useState([]);

    useEffect(() => {
        api.get('/repositories').then(response => {
            setProjetcts(response.data);
        });
     }, [] );

    async function handleAddProjetc(){
        const response = await api.post('/repositories', 
        {
            title: `Novo Projeto ${Date.now()}`, 
            url: "http://github.com/eusoutsunamy", 
            techs: ["Node.js", "teste"] 
        });
        if(response.status === 200){
            setProjetcts( [...projects, response.data] );
        }
        // setProjetcts( [...projects, `Novo Projeto ${Date.now()}`] );
    }

    return (
        <header>
            <h1>{title}</h1>

            <ul>
                {projects.map(project => <li key={project.id} > {project.title} </li>)}
            </ul>
            <button type="button" onClick={handleAddProjetc}>Adicionar Projeto</button>
        </header>
    );
}


// export default function Header({title, children}) {
//     return (
//         <header>
//             <h1>{title}</h1>
//             {children}
//         </header>
//     );
// }