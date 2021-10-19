import {React,useState,useEffect} from 'react';
import { Menu, Icon} from 'semantic-ui-react';
import { connect } from "react-redux";
import {setChannel} from "../../../Components/store/actioncreator"
import firebase from "../../../Components/database/Firebase";

const PvtChannel=(props)=>{

  const [Users,setUsersState]=useState([])
  const [userstatus,setUserstatus] = useState([])
  const setUsers=firebase.database().ref("users")
  const connectRef=firebase.database().ref(".info/connected")
  const status=firebase.database().ref("status")
  useEffect(() => {
    setUsers.on("child_added",(snapshot) => {
      setUsersState((currentState)=>{
        let updatedState = [...currentState];
        let user=snapshot.val()
        user.name=user.displayName;
        user.id=snapshot.key;
        user.isPrivateChat = true;
  updatedState.push(user);

  return updatedState;
      })
    })
    connectRef.on("value",snap=>{
      if(props.user && snap.val()){
        const userStateRef=status.child(props.user.uid)
        userStateRef.set(true)
        userStateRef.onDisconnect().remove();
      }
    })

    return ()=>{setUsers.off();connectRef.off();}
  }, [props.user])
 useEffect(()=>{
   status.on("child_added",snap=>{
     setUserstatus((currentstate)=>{
       let updated = [...currentstate]
       updated.push(snap.key)
       return updated
     })
   })
   status.on("child_removed",snap=>{
     setUserstatus((currentstate)=>{
       let updated = [...currentstate]
       let index=updated.indexOf(snap.key)
       updated.slice(index,1)
       return updated
     })
   })
   return()=> status.off()
 },[Users])
  const displayChats=()=>{
    if(Users.length>0){
      return Users.filter((user)=>user.id!==props.user.uid).map((user)=>{
        return <Menu.Item
            key={user.id}
            name={user.name}
           onClick={() => selectUser(user)}
            active={props.channel && generateChannelId(user.id)  === props.channel.id }
          >
          <Icon name="circle" color={`${userstatus.indexOf(user.id) !== -1 ? "green" : "red"}`}/>
          {"@ "+user.name }
        </Menu.Item>
      })
    }
  }
  const selectUser=(user)=>{
    let userTemp={...user}
    userTemp.id=generateChannelId(user.id)
    props.selectChannel(userTemp)
  }
  const generateChannelId = (userId) => {
        if (props.user.uid < userId) {
            return props.user.uid + userId;
        }
        else {
            return userId + props.user.uid;
        }
    }

  return(

       <Menu.Menu style={{marginTop:"35px"}}>
           <Menu.Item style={{fontSize:"17px"}}>
              <span>
                  <Icon name="wechat icon"/> Chats &nbsp;
              </span>
              ({Users.length-1})
           </Menu.Item>
           {displayChats()}

       </Menu.Menu>

)
}
const mapStateToProps = (state) =>{
  return{
    user:state.user.currentUser,
    channel:state.channel.currentChannel
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    selectChannel: (channel) => dispatch(setChannel(channel))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PvtChannel);
