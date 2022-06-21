import React from "react";
import ReactDOM  from "react-dom";
import { createContext,useState } from "react";
import { v4 as uuidv4} from 'uuid'
import SuggestionMsgData from "../data/SuggestionMsgData";
import $ from 'jquery';


const SuggestionMessageContext = createContext(null);


export const SuggestionMessageProvider = ({children}) => {
    
    const initialMsgs =  localStorage.getItem("Sugg_messages")===null ? SuggestionMsgData: JSON.parse(localStorage.getItem("Sugg_messages"))

    const [messages, setMessages] = useState(initialMsgs)
    var total_messages = 0;

    const [edit, setEdit] = useState(false)
    

    window.onload = function() {
        if(window.location.host === 'web.whatsapp.com'){
            const suggMsgs =  localStorage.getItem("Sugg_messages")=== null ? SuggestionMsgData: JSON.parse(localStorage.getItem("Sugg_messages"))
            setMessages(suggMsgs)
        }
    };


    const addMessage = (newMessage) => {    
        setMessages([...messages, newMessage])
        localStorage.setItem("Sugg_messages", JSON.stringify([...messages, newMessage]))
    }

    
    const deleteMsg = (id) =>{
        if(window.confirm('Are you sure you want to delete?')){
            setMessages(messages.filter((item) => item.id!== id))
            const newMessages = messages.filter((item) => item.id!== id)
            localStorage.removeItem("Sugg_messages")
            localStorage.setItem("Sugg_messages", JSON.stringify([...newMessages]))
        }
    }



    const eventFire = async (e, t) =>{
        var n = document.createEvent("MouseEvents");
        return n.initMouseEvent(t, !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), new Promise(function(t) {
            var o = setInterval(function() {
                document.querySelector('span[data-icon="send"]') && (e.dispatchEvent(n), t((clearInterval(o), "BUTTON CLICKED")))
            }, 500)
        })
    }


    const sendMessage = (message) => {
        if(!message)
            return;
        
        var messageBox = document.querySelectorAll("[contenteditable='true']")[1]
        var event = new Event("Input", {"bubbles":true, "cancelable":true, "composed": true});
        
        if(!(messageBox && (messageBox != undefined)))
            return;
        
        
        // messageBox.innerHTML = message.replace(/ /gm, " ")
        document.execCommand('insertHTML', false, message)
        messageBox.dispatchEvent(event)
        
        eventFire(document.querySelector('span[data-icon="send"]'), "click");


        if(document.querySelectorAll("[contenteditable='true']")[1].innerHTML === '') {
            setTimeout(async function () {
                await sendMessage(message);
            }, 500)
        };
    }



    return <SuggestionMessageContext.Provider value={{
        messages,
        edit,
        setMessages,
        setEdit,
        addMessage,
        deleteMsg,
        sendMessage,
        eventFire,
    }}>
        {children}
    </SuggestionMessageContext.Provider>

}


export default SuggestionMessageContext;