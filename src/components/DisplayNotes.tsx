import React from 'react'
import { useContext } from 'react'
import NotesContext from '../context/NotesContext'


function DisplayNotes({name}) {
    const {displayNote} = useContext(NotesContext)

    return (
        <div>{displayNote(name)}</div>
    )
}

export default DisplayNotes