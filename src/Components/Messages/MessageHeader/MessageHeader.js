import React from 'react';
import {Segment,Header,Input,Icon} from "semantic-ui-react"
const MessageHeader=(props)=>{
  return(
     <Segment clearing >
         <Header floated="left" fluid="true" as ="h2" >
            <span>
             {(props.isPrivateChat ? "@ " : "# ") + props.channelName}
              { !props.isPrivateChat ? <Icon name="comment alternate outline"/> : <Icon name="envelope square"/>}
            </span>
            <Header.Subheader>{props.uniqUser} User{props.uniqUser<=1 ? "" : "s"}</Header.Subheader>
         </Header>
         <Header floated="right">
            <Input
              name="search"
              icon="search"
              placeholder="Search for message..."
              size="mini"
              onChange={props.search}
            />
         </Header>
     </Segment>
  )
}
export default MessageHeader
