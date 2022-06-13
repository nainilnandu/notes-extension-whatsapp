import React from 'react'
import { useState, useEffect, useContext} from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { useQuill } from 'react-quilljs'
import Button from './shared/Button'
import NotesContext from '../context/NotesContext'

function TextEditor({name}) {
    console.log("Text NAme:", name);
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


    const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });
    const [htmlText, setHtmlText] = useState([])
    let buttonText = "Add Notes"
    const {addNotes, notesEdit, updateNotes,displayNote} = useContext(NotesContext)
    
    useEffect(() => {
        // console.log("in effect");
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
            //   console.log('Text change!');
              setHtmlText(quill.root.innerHTML);
            });
          }
          
    }, [quill]); 

    
    // quill.setHTML = (html) => {
    //     quill.root.innerHTML = html;
    // };
    

    useEffect(() => {
        if(notesEdit.edit === true){
            // console.log(notesEdit.item.text);
            //quill.setContents(notesEdit.item.text)
            quill.root.innerHTML = notesEdit.item.text;
            
        }
    }, [notesEdit,quill])

    
    
    
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        // console.log(htmlText);
        const newNotes = {
            text:htmlText
        }
        // console.log(newNotes)
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
