import {React,useState,useEffect} from 'react';
import firebase from "../../../Components/database/Firebase"
import {Label} from "semantic-ui-react"
const Notification=(props)=>{
  const messageRef=firebase.database().ref("messages");
  const userRef=firebase.database().ref("users");
  const [channelVisited,setChannelVisited]=useState({})
  const [messageTimer,setmessageTime]=useState({})
  useEffect(()=>{
    if(props.user){
      userRef.child(props.user.uid).child('lastVisited').on("value",snap=>{
        setChannelVisited(snap.val())
      })
      messageRef.on("value",snap=>{
        let channelmsg=snap.val()
        let channelsid=Object.keys(channelmsg)
        let messageTime={}
        channelsid.forEach((channel)=>{
          let channelMessageKeys = Object.keys(channelmsg[channel]);
                  channelMessageKeys.reduce((agg, item) => {
                      messageTime[channel] = [...messageTime[channel] || []];
                      messageTime[channel].push(channelmsg[channel][item].timestamp);
                  })
        })
        setmessageTime(messageTime)
      })
    }
  },[props.user])
  const calNotif=(channelId)=>{
    if(channelVisited && messageTimer && props.channel && props.channel.id!==channelId){
      let lastVisited=channelVisited[channelId]
      let channelMess=messageTimer[channelId]
      if(channelMess){
        let notification=channelMess.filter(timestamp => !lastVisited || lastVisited<timestamp).length
        return notification === 0?null:<Label color="red">{notification}</Label>
      }
    }
    return null;
  }
  return <>{calNotif(props.notifyid)}</>
}

export default Notification
