import React from 'react';
import {Dimmer,Loader} from "semantic-ui-react"
import "./Autoscroll.css"
const Autoscroll=(props)=>{
  return(
    <Dimmer active={props.loading}>
       <Loader size="huge" content="Loading..."/>
    </Dimmer>
  )
}
export default Autoscroll
