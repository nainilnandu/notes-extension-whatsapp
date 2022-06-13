import React from 'react'
import NotesItem from './NotesItem'
import { useContext } from 'react'
import NotesContext from '../context/NotesContext'



function NotesList({name}) {

    // Fetching the notes of user whose chat is currently open
    const userNotes =  localStorage.getItem(name)===null ? []: JSON.parse(localStorage.getItem(name))

    console.log("UserNotes: ",userNotes);

    if(!userNotes || userNotes.length===0)
        return <p>No Notes Yet!!</p>



    return (
        <div>
        {userNotes.map((item) =>(
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