// TODO: content script
import React, { useState } from "react";
import ReactDOM  from "react-dom";
import Card from "../components/shared/Card"

import Header from '../components/Header';
import TextEditor from '../components/TextEditor';

import NotesList from '../components/NotesList';
import { NotesProvider } from '../context/NotesContext';
import RenderNotes from "../components/RenderNotes";

import "./contentScript.css"


// var check = true

// const showNotes = (event: React.MouseEvent<HTMLButtonElement>) => {
//     check = !check
//     console.log(check);
// }
const App: React.FC<{}> = () => {
    const [flag, setFlag] = useState(false);
    return (

        <>
            <button onClick={() => setFlag(!flag)} className= "btn btn-primary notes-btn"> Notes </button>
            {flag && (
                <NotesProvider>
                    {/* <Header/> */}
                    <div className='container'>
                        <TextEditor />
                        <NotesList/>
                    </div>
                </NotesProvider>
            )}
        </>
    )
}

const root =  document.createElement('div')

// var iframe = document.createElement("iframe");
// var inject = document.querySelectorAll("#app");
// console.log("injection",inject);
// inject.forEach(function(item) {
//   item.appendChild(root);
// })



// document.getElementById('app').appendChild(root)
// document.getElementsByClassName('_1XkO3').appendChild(root)
document.body.appendChild(root)
// $("two").append(root);

// var detailsNews = document.querySelectorAll('div[class$="_1XkO3"]');

// detailsNews.forEach(function(item) {
//   var div = document.createElement('div');
//   div.className = 'append_test';
//   div.textContent = "appended div to " + item.classList;
//   item.appendChild(div);
// })

ReactDOM.render(<App/>, root) 