import React from 'react'
import NotesItem from './NotesItem'
import { useContext } from 'react'
import NotesContext from '../context/NotesContext'



function NotesList() {

    const {notes} = useContext(NotesContext);


    if(!notes || notes.length===0)
        return <p>No Notes Yet!!</p>



    return (
        <div>
        {notes.map((item) =>(
            <NotesItem 
            key = {item.id} 
            item = {item} 
            />
        ))}
    </div>
    )
}

export default NotesList