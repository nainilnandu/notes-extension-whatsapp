import React, { useEffect, useContext } from 'react'
import "../contentScript/contentScript.css"
import SuggestionMsgItem from './SuggestionMsgItem';
import SuggestionMessageContext from '../context/SuggestionMessageContext';


function SuggestionMsgListInPopup() {
    
    const {messages,setMessages} = useContext(SuggestionMessageContext)
    const suggMsgs =  localStorage.getItem("Sugg_messages")===null ? []: JSON.parse(localStorage.getItem("Sugg_messages"))
   
    
    return (
        <div>
           { suggMsgs.map((item) =>(
                <SuggestionMsgItem item = {item}/>
            ))}     
        </div>
    )
}

export default SuggestionMsgListInPopup