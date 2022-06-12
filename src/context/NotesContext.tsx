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


export const NotesProvider = ({children}) => {

    // const initialNotes =  () => localStorage.getItem('id')===null ? []: JSON.parse(localStorage.getItem('id'))

    const [notes, setNotes] = useState([])
    // const[name, setName] = useState('nainil')


    const displayNote = (currName) => {
        console.log("Display", currName);
        const initialNotes =  () => localStorage.getItem(currName)===null ? []: JSON.parse(localStorage.getItem(currName))
        console.log(initialNotes);
        setNotes(initialNotes)
        console.log(notes);
    }

    const [notesEdit, setNotesEdit] = useState({
        item: {},
        edit: false,
    })


    const addNotes = (newNotes, name) => {
        newNotes.id = uuidv4()
        setNotes([newNotes, ...notes])
        // console.log(newNotes)
        localStorage.setItem(name, JSON.stringify([newNotes, ...notes]))
        // console.log(notes);
        console.log("Context Name:", name);
        displayNote(name)
      }


    const deleteNotes = (id, name) =>{
        if(window.confirm('Are you sure you want to delete?')){
          setNotes(notes.filter((item) => item.id!== id))
          const newNotes = notes.filter((item) => item.id!== id)
          console.log(newNotes);
          localStorage.removeItem(name)
          localStorage.setItem(name, JSON.stringify([...newNotes]))
          displayNote(name)
        }
    }

    const updateNotes = (id, updItm) => {
        setNotes(notes.map((item) =>  item.id === id ? {...item, ...updItm} : item))
        const updatedNotes = notes.map((item) =>  item.id === id ? {...item, ...updItm} : item)
        localStorage.removeItem("id")
        localStorage.setItem("id", JSON.stringify([...updatedNotes]))
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
        displayNote,
    }}>
        {children}
    </NotesContext.Provider>

}


export default NotesContext;