import React from 'react'
import NotesItem from './NotesItem'
import { useContext } from 'react'
import NotesContext from '../context/NotesContext'



function NotesList({name}) {

    const {notes} = useContext(NotesContext);


    if(!notes || notes.length===0)
        return <p>No Notes Yet!!</p>



    return (
        <div>
        {notes.map((item) =>(
            <NotesItem 
            key = {item.id} 
            item = {item} 
            name = {name}
            />
        ))}
    </div>
    )
}

export default NotesList