import React from 'react'
import Card from "../components/shared/Card"
// import "./contentScript.css"
import Header from '../components/Header';
import TextEditor from '../components/TextEditor';

import NotesList from '../components/NotesList';
import { NotesProvider } from '../context/NotesContext';


function RenderNotes({check}) {
    if(check===true){
        return(
            <NotesProvider>
                    <Header/>
                    <div className='container'>
                        <TextEditor />
                        <NotesList/>
                    </div>
            </NotesProvider>
        )
    }
    else{
        return (
            <h2>Click on Button to save notes!!</h2>
          )
    }
  
}

export default RenderNotes