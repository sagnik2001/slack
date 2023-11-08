
/* Logic - To Cal notification what we are doing is that we first figuring out the last visit of user to every channel 
and we calculate the msg timing from every chat in channel 
and then just compare the timestamp */

import React, { useEffect, useState } from "react";
import firebase from "../../../server/firebase"
import { Label } from "semantic-ui-react";


const Notifications = (props) => {
    const userRef = firebase.database().ref("users");
    const msgRef = firebase.database().ref("messages");
    const [channelsVisited, setchannelsVisited] = useState([])
    const [allMsgsTime, setAllMsgTime] = useState([])
    useEffect(() => {
        if (props.user) {
            userRef.child(props.user.uid).child('lastVisited').on("value", snap => {
                setchannelsVisited(snap.val())
            })
            msgRef.on("value", snap => {
                let MessageIds = snap.val();
                if (MessageIds) {
                    let channelKeys = Object.keys(MessageIds);
                    let msgTime = [];
                    channelKeys.forEach(channelId => {
                        let msgsperChannelIds = Object.keys(MessageIds[channelId]);
                        msgsperChannelIds.reduce((accm, item) => {
                            msgTime[channelId] = [...msgTime[channelId] || []]
                            msgTime[channelId].push(MessageIds[channelId][item].timestamp);
                        })
                    })
                    setAllMsgTime(msgTime)
                }
            })
        }
    }, [props.user])

    const calNoti = (channelId) => {
        if (channelsVisited && allMsgsTime && props.channel && props.channel.id !== channelId) {
            let lastVisited = channelsVisited[channelId]
            let channelMsg = allMsgsTime[channelId];
            if (channelMsg) {
                let notification = channelMsg.filter(timestamp => !lastVisited || lastVisited < timestamp).length
                return notification === 0 ? null : <Label color="red">{notification}</Label>
            }
        }
        return null
    }

    return (
        <>{calNoti(props.notifyId)}</>
    )
}

export default Notifications
