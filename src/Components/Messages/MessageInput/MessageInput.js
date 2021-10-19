import {React,useState} from 'react';


import ReactDOM from "react-dom";
import {Segment,Input,Button} from "semantic-ui-react"
import firebase from '../../../Components/database/Firebase'
import ImageUpload from "../ImageUpload/ImageUpload"
import {connect} from "react-redux"
import {v4 as uuidv4 } from "uuid"
const MessageInput=(props)=>{
  const messageRef=firebase.database().ref('messages')
  const Imageref=firebase.storage().ref();
  const [MessageState,SetMessageState]=useState("");
  const [open,Setopen]=useState(false)
  const MessageInfo=(downloadUrl)=>{
    return{
      user:{
        avatar:props.user.photoURL,
        name:props.user.displayName,
        id:props.user.uid,

      },
      content:MessageState,
      image:downloadUrl||"",
      timestamp:firebase.database.ServerValue.TIMESTAMP
    }
  }
  const onSubmit=(downloadUrl) =>{
     if(MessageState || downloadUrl)
     {
       messageRef.child(props.channel.id)
       .push()
       .set(MessageInfo(downloadUrl))
       .then(()=>SetMessageState(''))
       .catch((err)=>console.log(err))
     }
  }
  const onMessageChange=(e)=>{
     const target=e.target
     SetMessageState(target.value)
  }

  const CreateActionButton=()=>{
    return(
    <>
        <Button icon="location arrow" onClick={()=>{onSubmit()}}/>
        <Button icon="upload icon" onClick={()=>Setopen(true)}/>
    </>)
  }
  const upload=(file,type)=>{
    const id=uuidv4();
     const FilePath=`chats/images/${id}.jpg`
     Imageref.child(FilePath).put(file,{contentType:type})
     .then((data)=>{
       data.ref.getDownloadURL()
       .then((url)=>{
         onSubmit(url)
       })
       .catch((err)=>console.log(err))
     })
     .catch((err)=>console.log(err))

  }
  return(
     <Segment>
       <Input
           onChange={onMessageChange}
           fluid={true}
           name="message"
           value={MessageState}
           label={CreateActionButton()}
           labelPosition="right"
       />
     <ImageUpload upload={upload} open={open} close={()=>Setopen(false)}/>
     </Segment>
  )
}
const mapStateToProps = (state) =>{
  return{
      user:state.user.currentUser,
      channel:state.channel.currentChannel
  }
}
export default connect(mapStateToProps)(MessageInput)
