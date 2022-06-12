// TODO: background script

import { useContext } from "react"
import NotesContext from "../context/NotesContext"
// chrome.runtime.onInstalled.addListener(() => {
//   // TODO: on installed function
// })


const {displayNotes} = useContext(NotesContext)

chrome.runtime.onMessage.addListener(reciever);

function reciever(request, sender, sendResponse){
  console.log(request);
  console.log("in bg")
  displayNotes(request.name)
}