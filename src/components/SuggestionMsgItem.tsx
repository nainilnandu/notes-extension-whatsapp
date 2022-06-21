import React, { useContext } from 'react'
import "../contentScript/contentScript.css"
import Card from './shared/Card'
import SuggestionMessageContext from '../context/SuggestionMessageContext';

function SuggestionMsgItem({item}) {
    const {messages, setMessages,deleteMsg} = useContext(SuggestionMessageContext)

    
    return (
        <div id = "message-item">
            <div className="popup_list_message">
                {item.message}
            </div>
            <button onClick={() => deleteMsg(item.id)} className="delete_message" >X</button>

        </div>
    )
}

export default SuggestionMsgItem