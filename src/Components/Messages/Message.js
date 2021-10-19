import {React,useState,useEffect} from 'react';
import MessageHeader from "./MessageHeader/MessageHeader"
import MessageInput from "./MessageInput/MessageInput"
import MessageContent from "./MessageContent/MessageContent"
import {connect} from "react-redux";
import firebase from "../.././Components/database/Firebase"
import {Segment,Comment} from "semantic-ui-react"

import "./Message.css"
const Message=(props)=>{
  const messageRef=firebase.database().ref("messages")
  const [messageState,SetMessageState] = useState([])
  const [SearchState,SetSearchState] = useState("")
  useEffect(()=>{
    if(props.channel){
      SetMessageState([])
    messageRef.child(props.channel.id).on("child_added",(snap)=>{
      SetMessageState((currentState)=>{
        let updateState = [...currentState]
        updateState.push(snap.val())
        return updateState
      })
    })
    return ()=>messageRef.child(props.channel.id).off()
  }
},[props.channel])
  const displayMessage=()=>{
    let messagetoDisplay= SearchState ? filterTerm():messageState
    if(messagetoDisplay.length > 0)
    {
      return messagetoDisplay.map((message)=>{
        return <MessageContent check={message.user.id===props.user.uid} key={message.timestamp} message={message}/>
      })
    }
  }
  const userCount=()=>{
    const count=messageState.reduce((acc,message)=>{
      if(!acc.includes(message.user.name)){
        acc.push(message.user.name)
      }
      return acc
    },[])
    return count.length
  }
  const searchTerm=(e)=>{
    const target = e.target
    SetSearchState(target.value)
  }
  const filterTerm=()=>{
    const regex = new RegExp(SearchState,"gi")
    const messages=messageState.reduce((acc,message)=>{
      if((message.content && message.content.match(regex)) || message.user.name.match(regex)){
        acc.push(message)
      }
      return acc
    },[])
    return messages
  }
  return(
    <div className="whole">
       <MessageHeader search={searchTerm} channelName={props.channel?.name} uniqUser={userCount()}/>
        <Segment className="messageContent">
            <Comment.Group>
             {displayMessage()}
            </Comment.Group>
        </Segment>
       <MessageInput/>
    </div>
  )
}
const mapStateToProps = (state) =>{
  return{
  channel:state.channel.currentChannel,
  user:state.user.currentUser
}
}
export default connect(mapStateToProps)(Message)
