import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery';
import "../contentScript/contentScript.css"
import SuggestionPopup from './SuggestionPopup';
import SuggestionMessageContext from '../context/SuggestionMessageContext';

function SuggestionMessage() {

    const {messages,setMessages,edit,setEdit, sendMessage} = useContext(SuggestionMessageContext)
	

	
	// Fetching footer of WA and ading some css 
	var footer = $('footer._2cYbV');
    console.log(footer);
    if(!footer)
        return;
    footer.css(
        "padding", "33px 0 0 0"
    )
	
	// Creating a div for holding the messages and edit button
    var reply_div = document.getElementById("reply_div");
    if(reply_div){
        reply_div.parentNode.removeChild(reply_div);
    }
        
	reply_div = document.createElement("div");
	reply_div.id = 'reply_div';
    
    
	// Appending the reply_div to footer
	footer.append(reply_div);
	

	// Displaying the suggested messages  
	$.each(messages, function(i, p) {
        var ps = p.message;
        if(p.message.length > 47)
        	ps = p.substring(0,47)+"...";
		
        $('#reply_div').append('<button class="reply_click" value="'+p.message+'">'+ps+'</button>');
    });


	//Edit Button
    var editButton = document.getElementById("smart_reply_edit_button");
	if(editButton){
		console.log("Edit",editButton);
		$('#reply_div').append(editButton)
	}
	else{
		$('#reply_div').append('<button id="smart_reply_edit_button">Edit</button>')
	}


	// Edit Button event
	document.getElementById("smart_reply_edit_button").addEventListener("click", function(event) {
        setEdit(true)
    });

	// Message which are displayed above the chat when clicked will send the clicked message
    document.getElementById("reply_div").addEventListener("click", function(event) {
        var message = (event.target as HTMLInputElement).value
        sendMessage(message);
    });
    
    


	

	return (
		<>	
			{ edit && 
				<SuggestionPopup/>
			}
		</>
		
	)
	
}

export default SuggestionMessage