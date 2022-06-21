import React from 'react'
import '../contentScript/contentScript.css'
import {FaTimes, FaEdit} from 'react-icons/fa'
import SuggestionMsgListInPopup from './SuggestionMsgListInPopup'
import SuggestionMsgItem from './SuggestionMsgItem'
import SuggestionMessageContext from '../context/SuggestionMessageContext';
import $ from 'jquery';
import { useEffect, useContext } from 'react'
import { useState, useCallback } from 'react'
import { v4 as uuidv4} from 'uuid'



function SuggestionPopup() {

    var my_number = null
    const {messages,setMessages,edit,setEdit, addMessage,sendMessage} = useContext(SuggestionMessageContext)



    const msg_list = (event) => {
        if((event.target.localName == 'div') && (event.target.className == 'popup_list_message')){
            setEdit(false)
            sendMessage(event.target.innerText);       
        }
        console.log(messages)
    }

    const handleAdd = (e) =>{
        e.preventDefault()
        var nmessage = $("#add_message").val();
        if(nmessage !== ''){
            var newMessage = {
                id: uuidv4(),
                message: nmessage
            }
            addMessage(newMessage)
            $("#add_message").val("")
        }
    }


    return (
        <div className='modal'>
            <div className="modal-content">
                <div className="popup-heading">
                    Edit/Add quick replies
                </div>
                <div id = "sugg_message_list" onClick={msg_list}>
                    <SuggestionMsgListInPopup/>
                </div>
                <button id="close_edit" onClick={() => setEdit(false)}>
                    <FaTimes color='#E18B43'/>
                </button>
                <textarea typeof='text' 
                        id="add_message" 
                        placeholder="Type your quick reply here"
                        >
                </textarea>

                <button id="add_message_btn" onClick={handleAdd}>
                    Add Template
                </button>

            </div>
           
        </div>
    )
}

export default SuggestionPopup