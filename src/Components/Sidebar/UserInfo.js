import React from 'react';
import {Grid,Header,Icon,Image,Dropdown} from 'semantic-ui-react';
import { connect } from "react-redux";
import firebase from "../database/Firebase"
import "./UserInfo.css"
const User=(props)=>{
 const getDropdownOptions=()=>{
   return[{
     key:'signOut',
     text:<span onClick={signOut}><Icon name="sign-out alternate icon"/>Sign out</span>
   }]
 }
const signOut=()=>{
  firebase.auth().signOut().then(()=>console.log("SignOut"))
}
  if(props.user){
  return(
    <Grid>
       <Grid.Column>
          <Grid.Row>
             <Header style={{padding:"1.3rem"}} inverted as="h2">
                <Icon name="wechat"/>
                <Header.Content>Chatify</Header.Content>
             </Header>
             <Header inverted as="h4" style={{padding:".75rem"}}>
             <Dropdown
                trigger={  <span>
                 <Image src={props.user.photoURL} avatar></Image>
                   {props.user.displayName}
                </span>
              }
              options={getDropdownOptions()}
                >
                </Dropdown>
             </Header>
          </Grid.Row>
       </Grid.Column>
    </Grid>
  )}
  return null;
}
const mapStateToProps=(state)=>{
  return{
    user:state.user.currentUser
  }
}
export default connect(mapStateToProps) (User)
