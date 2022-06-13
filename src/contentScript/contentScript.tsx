// TODO: content script
import React, { useState, useEffect,useContext } from "react";
import ReactDOM  from "react-dom";
import Card from "../components/shared/Card"

import Header from '../components/Header';
import TextEditor from '../components/TextEditor';

import NotesList from '../components/NotesList';
import { NotesProvider } from '../context/NotesContext';
import $ from 'jquery';
import "./contentScript.css"
import NotesContext from "../context/NotesContext";
import DisplayNotes from "../components/DisplayNotes";


const App: React.FC<{}> = () => {
    const [notesOpen, setNotesOpen] = useState(false);
    
    const[name, setName] = useState('')
    var currName = ''

    var debug = false;
    var safetyDelayShort = 300;
 
    function onMainUiReady()
    {
        try
        {
            // First check if the main UI is already ready, just in case
            if (document.querySelector("#app .two") != undefined)
            {
                if (debug) console.info("WAT: Found main UI, will notify main UI ready event directly");
                document.querySelector("#app .two").appendChild(root)
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
    window.addEventListener ("load", onMainUiReady, false)
    
    
    var mainChats = document.getElementById('main');
    var rightSidePanel = $('._2J8hu')
    // console.log("Rgt panel", rightSidePanel);

    

    const changeStyleofWAUI = () => {
        setNotesOpen(prev => !prev)
        // console.log(notesOpen);
        if(!notesOpen && rightSidePanel.length ==0){
            
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

    // const {displayNote} = useContext(NotesContext)

    const retrievePhoneNumber = () =>{
        // console.log("IN PN");
        var phoneNumber =$('.AjtLy')[0].innerText
        console.log("Phone", phoneNumber);
    }

    const retrieveName = () =>{
        console.log("IN Name");
        setName($('._21nHd')[0].innerText)
        currName = $('._21nHd')[0].innerText
        // console.log("Content Name", currName);
        // console.log(name);
        chrome.runtime.sendMessage({name: currName})
    }

    const notesMaker = () =>{
        changeStyleofWAUI()
        // retrievePhoneNumber()
        retrieveName()
    }

    



    return (
        
            <>  
                {/* <Header/>  */}
                
                    <button onClick={notesMaker} className= "btn btn-primary notes-btn"> Notes 
                    </button>
                
                {notesOpen && mainChats && rightSidePanel.length ==0 &&(
                    <NotesProvider name = {name}>
                        <div className="container">
                            <div className="editor">
                                <TextEditor name = {name} />
                            </div>
                            {/* <DisplayNotes name = {currName}/> */}
                            <NotesList name = {name}/>
                        </div>
                    </NotesProvider>
                )}

                {notesOpen && mainChats == undefined && (<div className="container">
                    <h2>Please select a chat!!</h2>
                </div>)}
            </>
        )
    
    
}
const root =  document.createElement('div')
root.id = "notes-ui"

ReactDOM.render(<App/>, root) 