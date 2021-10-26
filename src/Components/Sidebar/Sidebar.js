import React from 'react';
import { Menu , Responsive} from 'semantic-ui-react';
import User from './UserInfo.js';
import Channel from './Channel/Channel.js';
import PvtChannel from './PrivateChat/PrivateChat.js';
import "./Sidebar.css";
const style = {
    backgroundColor: "#4a154b",
    fontSize: "1.2rem",
      overflowY: 'scroll',
    };
export const Sidebar = () => {
    return (< Menu vertical fixed="left" borderless size="large" style={style} >
       <User/>
       <Channel/>
       <PvtChannel/>
    </Menu>
    )
}
