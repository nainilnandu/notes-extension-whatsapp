// TODO: content script
import React, { useState, useEffect,useContext } from "react";
import ReactDOM  from "react-dom";

import $ from 'jquery';

import TextEditor from '../components/TextEditor';
import NotesList from '../components/NotesList';
import SuggestionMessage from "../components/SuggestionMessage";
import { NotesProvider } from '../context/NotesContext';
import SuggestionMessageContext from "../context/SuggestionMessageContext";
import { SuggestionMessageProvider } from "../context/SuggestionMessageContext";
import "./contentScript.css"

const App: React.FC<{}> = () => {

    
    // State will save notes is opened or no
    const [notesOpen, setNotesOpen] = useState(false);
    
    const [mainChatOpen, setMainChatOpen] = useState('');

    // State for whose chat is currently open
    const[name, setName] = useState('')

    var currName = ''

    // Status 
    const [statusOpen, setStatusOpen]  = useState(false)

    // Right Panel
    const [rightSidePanelOpen, setRightSidePanel]  = useState(false)

    var icons = $('._26lC3')

    console.log(icons);
    var debug = false;
    var safetyDelayShort = 300;

    
    // Info of user which opens on right side
    var rightSidePanel = $('._2J8hu')

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
                rightSidePanel = $('._2J8hu')
                icons = $('._26lC3')
                
                // if(rightSidePanel.length==0){
                //     setRightSidePanel(false)
                // }
                // else{
                //     setRightSidePanel(true)
                // }

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
   
    

    // Suggestion messages displayed when any chat is opened
    window.onload = function() {
        if(window.location.host === 'web.whatsapp.com'){
            setInterval(() => {
                var mainChat = document.getElementById('main')
                if(mainChat){
                    retrieveName()
                }  
            }, 2000);
        }
    };
    

    // Main chats which appears on center
    var mainChats = document.getElementById('main');

    
    
    const notesPanelOpenCss = () => {
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
        $('.notes-btn').css(
            'left', '82.5%'
        )
    }

    const notesPanelCloseCss = () => {
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
        $('.notes-btn').css(
            'left', '85%'
        )
    }


    // Changing Whatsapp style when Notes are opened
    const changeStyleofWAUI = () => {
        
        if(!notesOpen && rightSidePanel.length==0){
            notesPanelOpenCss()
        }
        else{
            notesPanelCloseCss()
        }
        
    }


    // const retrievePhoneNumber = () =>{
    //     // console.log("IN PN");
    //     var phoneNumber =$('.AjtLy')[0].innerText
    //     console.log("Phone", phoneNumber);
    // }


    // Retrieving name of the person whose chat is currently opened
    const retrieveName = () =>{
        if($('._21nHd')[0]==undefined)
            return;
        currName = "notes_" + $('._21nHd')[0].innerText
        setName(currName)
        
    }


    // Function called when Notes Button is clicked!!
    const notesMaker = () =>{
        setNotesOpen(prev => !prev)
        changeStyleofWAUI()
        retrieveName()
    }

    useEffect(() => {
        console.log("Main Chat changed");
        if(notesOpen){
            notesPanelOpenCss()
        }
        
    }, [name])




    var contactInfo = $('._24-Ff')
    var serachIcon = icons[3];


    const closeRightPanel = () => {
        var closeButton = $('[data-icon = "x"]')
        closeButton[0].addEventListener("click", function(e){
            console.log("Close CLicked");
            setNotesOpen(false)
            notesPanelCloseCss() 
        })
    }



    if(icons.length!=0 && serachIcon!=undefined){
        serachIcon.addEventListener("click", function(e){
            console.log("Clicked")
            notesPanelCloseCss()

            setTimeout(function(){
                closeRightPanel()
            },100)
        })
        
    }

    if(contactInfo.length!=0){
        contactInfo[0].addEventListener("click", function(e){
            console.log("Clicked")
            notesPanelCloseCss()


            setTimeout(function(){
                closeRightPanel()
            },100)


        })
        
    }
    
    
    
    
    // if(status.length!=0){
    //     status[0].addEventListener("click", function(e){
    //         console.log("Status icon CLicked");
            
    //         setTimeout(function () {
    //             statusClose = $('[data-icon = "x-viewer"]')
    //             console.log("status close", statusClose);
    //             statusClose[0].addEventListener("click", function(e){
    //                 console.log("Close CLicked");
    //                 setStatusOpen(false);
    //             })
    //         }, 100);
    //         setStatusOpen(true);  
    //     })
    // }
    
    
    return (
        
            <>  
                
                {/* Notes button on the main UI */}
                < button onClick={notesMaker} className= "btn btn-primary notes-btn"> Notes 
                </button>
                


            
                {/* If notesOpen state is true and rightSidePanel i.e. info panel is not opened
                and mainChats window is currently open then only show notes    */}
                {notesOpen && mainChats && name &&(
                    <NotesProvider>
                        <div className="container">
                            <h2 className="notes-name">{name.substring(6)} Notes</h2>
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
                {notesOpen && mainChats === null && (<div className="container">
                    <h2 style={{textAlign: "center"}}> Please select a chat!!</h2>
                </div>)}


                {/* Suggestion Message which are displayed above the chatbox */}
                { name && (
                    <SuggestionMessageProvider>
                        <SuggestionMessage/>  
                    </SuggestionMessageProvider>
                    
                )}
            </>
        )
    
    
}


const root =  document.createElement('div')
root.id = "notes-ui"

ReactDOM.render(<App/>, root) 