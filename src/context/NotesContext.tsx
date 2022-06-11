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

    const initialNotes =  () => localStorage.getItem('id')===null ? []: JSON.parse(localStorage.getItem('id'))

    const [notes, setNotes] = useState(initialNotes)
    const[name, setName] = useState('nainil')

    const [notesEdit, setNotesEdit] = useState({
        item: {},
        edit: false,
    })


    const addNotes = (newNotes) => {
        newNotes.id = uuidv4()
        setNotes([newNotes, ...notes])
        console.log(newNotes)
        localStorage.setItem("id", JSON.stringify([newNotes, ...notes]))
        console.log(notes);
      }


    const deleteNotes = (id) =>{
        if(window.confirm('Are you sure you want to delete?')){
          setNotes(notes.filter((item) => item.id!== id))
          const newNotes = notes.filter((item) => item.id!== id)
          console.log(newNotes);
          localStorage.removeItem("id")
          localStorage.setItem("id", JSON.stringify([...newNotes]))
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


    const currName = (currname) =>{
        setName(currname)
    }

    return <NotesContext.Provider value={{
        name,
        notes,
        notesEdit,
        deleteNotes,
        addNotes,
        editNotes,
        updateNotes,
        currName,
    }}>
        {children}
    </NotesContext.Provider>

}


export default NotesContext;