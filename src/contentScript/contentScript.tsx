// TODO: content script
import React, { useState, useEffect,useContext } from "react";
import ReactDOM  from "react-dom";

import $ from 'jquery';

import TextEditor from '../components/TextEditor';
import NotesList from '../components/NotesList';
import { NotesProvider } from '../context/NotesContext';

import "./contentScript.css"

const App: React.FC<{}> = () => {

    // State will save notes is opened or no
    const [notesOpen, setNotesOpen] = useState(false);
    
    // State for whose chat is currently open
    const[name, setName] = useState('')
    var currName = ''


    var debug = false;
    var safetyDelayShort = 300;

    // Waiting for User to log in and then inject the contentScript into the id app of whatsapp 
    // so that extension works only after login. Refered from some github repo!
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
    
    
    // Main chats which appears on center
    var mainChats = document.getElementById('main');

    // Info of user which opens on right side
    var rightSidePanel = $('._2J8hu')



    // Changing Whatsapp style when Notes are opened
    const changeStyleofWAUI = () => {
        setNotesOpen(prev => !prev)
        
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


    // const retrievePhoneNumber = () =>{
    //     // console.log("IN PN");
    //     var phoneNumber =$('.AjtLy')[0].innerText
    //     console.log("Phone", phoneNumber);
    // }


    // Retrieving name of the person whose chat is currently opened
    const retrieveName = () =>{
        console.log("IN Name");
        setName($('._21nHd')[0].innerText)
        currName = $('._21nHd')[0].innerText
    }


    // Function called when Notes Button is clicked!!
    const notesMaker = () =>{
        changeStyleofWAUI()
        retrieveName()
    }

    



    return (
        
            <>  
                
                {/* Notes button on the main UI */}
                <button onClick={notesMaker} className= "btn btn-primary notes-btn"> Notes 
                </button>
                

                {/* If notesOpen state is true and rightSidePanel i.e. info panel is not opened
                and mainChats window is currently open then only show notes    */}
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

                {/* if mainChats window is not opened and notesOpen is true 
                then it will show Please select a chat!!  */}
                {notesOpen && mainChats == undefined && (<div className="container">
                    <h2>Please select a chat!!</h2>
                </div>)}
            </>
        )
    
    
}


const root =  document.createElement('div')
root.id = "notes-ui"

ReactDOM.render(<App/>, root) 