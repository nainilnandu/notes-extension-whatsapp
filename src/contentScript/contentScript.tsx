// TODO: content script
import React, { useState } from "react";
import ReactDOM  from "react-dom";
import Card from "../components/shared/Card"

import Header from '../components/Header';
import TextEditor from '../components/TextEditor';

import NotesList from '../components/NotesList';
import { NotesProvider } from '../context/NotesContext';
import RenderNotes from "../components/RenderNotes";
import $ from 'jquery';
import "./contentScript.css"


// var check = true

// const showNotes = (event: React.MouseEvent<HTMLButtonElement>) => {
//     check = !check
//     console.log(check);
// }
const App: React.FC<{}> = () => {
    const [notesOpen, setNotesOpen] = useState(false);
    const [rendered, setRendered] = useState(false);
    var debug = false;
    var safetyDelayShort = 300;
    // const RenderNotes = () => {
    //     setRendered(!rendered)
    // }
    
    function onMainUiReady()
    {
        try
        {
            // First check if the main UI is already ready, just in case
            if (document.querySelector("#app .two") != undefined)
            {
                if (debug) console.info("WAT: Found main UI, will notify main UI ready event directly");
                document.querySelector("#app .two").appendChild(root)
                console.log(root);
                // setTimeout(function () { onMainUiReady(); }, safetyDelayShort);
            }
            else
            {
                if (debug) console.info("WAT: Setting up mutation observer for main UI ready event...");

                var appElem = document.querySelector("#app");
                if (appElem != undefined)
                {
                    var mutationObserver = new MutationObserver(function (mutations)
                    {
                        if (debug) console.info("WAT: Mutation observerd, will search main UI");

                        // Check if main UI is now ready (new child div with class "two")
                        if (document.querySelector("#app .two") != undefined)
                        {
                            if (debug) console.info("WAT: Found main UI, will notify main UI ready event");

                            mutationObserver.disconnect();
                            setTimeout(function () { onMainUiReady(); }, safetyDelayShort);
                        }
                    });
                    mutationObserver.observe(appElem, { childList: true, subtree: true });
                }
            }
        }
        catch (err)
        {
            console.error("WAT: Exception while setting up mutation observer for main UI ready event");
            console.error(err);
        }


    }
    window.addEventListener ("load", onMainUiReady, false);

    const changeStyleofWAUI = () =>{
        setNotesOpen(prev => !prev)
        // console.log(notesOpen);
        if(!notesOpen){
            
            console.log(notesOpen);
            $('#side').css(
                'width', '80%'
            ),
            
            $('._3sh5K').css(
                'left', '-90px'
            ),
            $('#main').css(
                'width', '70%'
            )
            $('.ldL67 .zaKsw').css(
                'width', '70%'
            )
    
        }
        else{
            $('#side').css(
                'width', '100%'
            ),
            $('#app #main').css(
                'width', '100%'
            ),
            $('._3sh5K').css(
                'left', '0px'
            )
            $('.ldL67 .zaKsw').css(
                'width', '100%'
            ) 
        }
        
    }
   
    return (

            <>  
                {/* <Header/>  */}
                <button onClick={changeStyleofWAUI} className= "btn btn-primary notes-btn"> Notes 
                </button>
                {/* <h2 className="btn btn-primary notes-btn">Notes</h2> */}

                {notesOpen && (
                    <NotesProvider>
                        <div className="container">
                            <div className="editor">
                                <TextEditor />
                            </div>
                            <NotesList/>
                        </div>
                    </NotesProvider>
                )}
            </>
        )
    
    
}
const root =  document.createElement('div')
root.id = "notes-ui"
// console.log(root);


ReactDOM.render(<App/>, root) 