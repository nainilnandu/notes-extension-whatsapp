import React from "react";
import ReactDOM  from "react-dom";
import { createContext,useState } from "react";
import { v4 as uuidv4} from 'uuid'
// import NotesData from '../notes_data/NotesData'
// import { initialState, IState, reducer } from "./reducer";


// interface IContextProps {
//   state: IState;
//   dispatch: ({type}:{type:string}) => void;
// }

const NotesContext = createContext(null);


export const NotesProvider = ({children, name}) => {
    
    
    const [notes, setNotes] = useState([])
    

    const [notesEdit, setNotesEdit] = useState({
        item: {},
        edit: false,
    })


    const addNotes = (newNotes, name) => {
        const userNotes =  localStorage.getItem(name)===null ? []: JSON.parse(localStorage.getItem(name))
        newNotes.id = uuidv4()
        setNotes([newNotes, ...userNotes])
        // console.log(newNotes)
        localStorage.setItem(name, JSON.stringify([newNotes, ...userNotes]))
        // console.log(notes);
        console.log("Context Name:", name);
        // displayNote(name)
      }


    const deleteNotes = (id, name) =>{
        if(window.confirm('Are you sure you want to delete?')){
            const userNotes =  localStorage.getItem(name)===null ? []: JSON.parse(localStorage.getItem(name))
            setNotes(userNotes.filter((item) => item.id!== id))
            const newNotes = userNotes.filter((item) => item.id!== id)
            console.log(newNotes);
            localStorage.removeItem(name)
            localStorage.setItem(name, JSON.stringify([...newNotes]))
        }
    }

    const updateNotes = (id, updItm, name) => {
        const userNotes =  localStorage.getItem(name)===null ? []: JSON.parse(localStorage.getItem(name))
        setNotes(userNotes.map((item) =>  item.id === id ? {...item, ...updItm} : item))
        const updatedNotes = userNotes.map((item) =>  item.id === id ? {...item, ...updItm} : item)
        localStorage.removeItem(name)
        localStorage.setItem(name, JSON.stringify([...updatedNotes]))
    }

    const editNotes = (item) => {
        setNotesEdit({
            item,
            edit: true,
        })
    }


    // const currName = (currname) =>{
    //     setName(currname)
    // }
    
    return <NotesContext.Provider value={{
        notes,
        notesEdit,
        deleteNotes,
        addNotes,
        editNotes,
        updateNotes,
        // displayNote,
    }}>
        {children}
    </NotesContext.Provider>

}


export default NotesContext;