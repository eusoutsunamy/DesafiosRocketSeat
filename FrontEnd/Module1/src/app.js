import React from 'react';
import Header from './components/base/header';
import './app.css';
import imageBack from './assets/note_unsplash.jpg';
import api from './services/api';

function App() {
   // const projects =['Dev mobile', 'front end', 'back-end'];
    // return (
    //     <>
    //         <Header title="Projects" >
    //              <ul>
    //                 { projects.map(project => <li key={project} > {project} </li> ) }
    //             </ul> 
    //         </Header>
    //     </>
    // );

    return (
            <>
                {/* <img src={imageBack} width={120} ></img> */}
                <Header title="Projects" >
                </Header>
            </>
        );
}

export default App;