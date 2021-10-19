import {React,useState,useEffect} from 'react';
import { Menu, Icon, Modal, Button, Form, Segment } from 'semantic-ui-react';
import { connect } from "react-redux";
import {setChannel} from "../../../Components/store/actioncreator"
import firebase from "../../../Components/database/Firebase";
import "./Channel.css"
const Channel=(props)=>{
  const [modalOpen,SetModalOpen]=useState(false)
  const [AddChannelState, setAddChannelState]=useState({ Name: '', Description: '' })
  const [LoadChannelState, setLoadChannelState]=useState(false)
  const [Channels,setChannelState]=useState([])
  const setChannels=firebase.database().ref("channels")
  useEffect(() => {
    setChannels.on("child_added",(snapshot) => {
      setChannelState((currentState)=>{
        let updatedState = [...currentState];
  updatedState.push(snapshot.val());

  return updatedState;
      })
    })
    return ()=>setChannels.off()
  }, [])
  useEffect(()=>{
    if(Channels.length>0)
    props.selectChannel(Channels[0])
  },[!props.channel?Channels:null])
  const openModal=()=>{
    SetModalOpen(true)
  }
  const closeModal=()=>{
    SetModalOpen(false)
  }
  const formIsValid=()=>{
    return AddChannelState && AddChannelState.Name && AddChannelState.Description
  }
  const displayChannel=()=>{
    if(Channels.length>0){
      return Channels.map((channel)=>{
        return <Menu.Item
            key={channel.id}
            name={channel.name}
           onClick={() => props.selectChannel(channel)}
            active={props.channel && channel.id === props.channel.id }
          >
          {"# "+channel.name}
        </Menu.Item>
      })
    }
  }
  const onSubmitHandler=()=>{
    if(!formIsValid())
    return
    const key=setChannels.push().key;
    const channel={
      id:key,
      name:AddChannelState.Name,
      description:AddChannelState.Description,
      createdby:{
        name:props.user.displayName,
        avatar:props.user.photoURL,
      }
    }
    setLoadChannelState(true)
    setChannels.child(key)
    .update(channel)
    .then(()=>{
      setAddChannelState({Name: '', Description: ''})
      setLoadChannelState(false)
      closeModal()
    })
    .catch((e)=>{
      console.log(e);
    })
  }
  const handleInput=(e)=>{
    let target = e.target;
    setAddChannelState((currentState)=>{
      let updateState={...currentState}
      updateState[target.name]=target.value
      return updateState
    })
  }
  return(
    <>
       <Menu.Menu>
           <Menu.Item style={{fontSize:"17px"}}>
              <span>
                  <Icon name="edit outline icon"/> Channels &nbsp;
              </span>
              ({Channels.length})
           </Menu.Item>
           {displayChannel()}
           <Menu.Item>
           <span onClick={openModal} className="click">
               <Icon name="plus icon" /> Add Channel
               </span>
           </Menu.Item>
       </Menu.Menu>
       <Modal open={modalOpen} onClose={closeModal} className="mod">
           <Modal.Header>
              Create Channel
           </Modal.Header>
           <Modal.Content className="cont">
           <Form onSubmit={onSubmitHandler}>
               <Segment stacked>

                   <Form.Input
                     name="Name"
                     value={AddChannelState.Name}

                     onChange={handleInput}
                     type="text"
                     placeholder="Enter Channel Name"
                   />
                   <Form.Input
                     name="Description"
                     value={AddChannelState.Description}

                     onChange={handleInput}
                     type="text"
                     placeholder="Enter Channel description"
                   />

               </Segment>

           </Form>
           </Modal.Content>
           <Modal.Actions>
                 <Button loading={LoadChannelState} onClick={onSubmitHandler}>
                    <Icon name="save icon"></Icon> Save
                 </Button>
                 <Button onClick={closeModal}>
                    <Icon name="cancel icon"></Icon> Cancel
                 </Button>
           </Modal.Actions>
       </Modal>
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Channel);
