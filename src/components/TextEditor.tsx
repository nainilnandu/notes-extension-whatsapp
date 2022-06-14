import React from 'react'
import { useState, useEffect, useContext} from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { useQuill } from 'react-quilljs'
import Button from './shared/Button'
import NotesContext from '../context/NotesContext'

function TextEditor({name}) {
    
    //Quill Editor 
    const theme = 'snow';

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
        
            [{ list: 'ordered'}, { list: 'bullet' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link'],
        ]
    };

    const placeholder = 'Add your note...';

    const formats = ['bold', 'italic', 'underline', 'strike',
                    'list',
                    'header',
                    'link',];


    // Adding Quill Editor
    const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });

    // State for saving the html of data written in quill editor
    const [htmlText, setHtmlText] = useState([])
    
    // These functions have been called from NotesContext file
    const {addNotes, notesEdit, updateNotes} = useContext(NotesContext)
    

    // Whenever the text changes in quill editor this runs and sets the htmlText state 
    useEffect(() => {
        if (quill) {
                quill.on('text-change', (delta, oldDelta, source) => {
                setHtmlText(quill.root.innerHTML);
            });
        }
          
    }, [quill]); 

    
    // It runs if we are into edit state and we make changes
    useEffect(() => {
        if(notesEdit.edit === true){
            quill.root.innerHTML = notesEdit.item.text;    
        }
    }, [notesEdit,quill])

    
    
    
    // Function runs on clicking Add Note Button!
    const handleSubmit = (e) =>{
        e.preventDefault()
        const newNotes = {
            text:htmlText
        }

        if(notesEdit.edit === true){
            updateNotes(notesEdit.item.id, newNotes, name)
            notesEdit.edit = false
        }
        else{
            addNotes(newNotes,name)
        }
        
        quill.setContents([])
    }

    const buttontext = notesEdit.edit === true ? "Update Notes" : "Add Notes"

    return (
        <>
            <div ref={quillRef}>
            </div>
            <form onSubmit={handleSubmit}>
                <Button type="submit">{buttontext}</Button>
            </form>
            
        </>
        
    )
}

export default TextEditor
