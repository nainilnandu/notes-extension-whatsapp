import React from 'react'
import NotesItem from './NotesItem'
import { useContext } from 'react'
import NotesContext from '../context/NotesContext'



function NotesList({name}) {

    const {notes} = useContext(NotesContext);


    console.log("Context",name);
    const initialNotes =  localStorage.getItem(name)===null ? []: JSON.parse(localStorage.getItem(name))

    console.log("InitialNOtes: ",initialNotes);

    if(!initialNotes || initialNotes.length===0)
        return <p>No Notes Yet!!</p>



    return (
        <div>
        {initialNotes.map((item) =>(
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