import React, { useState } from 'react'
import { Icon, Input, Modal,Button } from 'semantic-ui-react'
import mime from "mime-types"

 const AudioUpload = (props) => {

    const [fileState,setFileState]=useState(null);
    const acceptedTypes=["audio/mpeg" ,"audio/wav"];
    const onFileAdded=(e)=>{
        const file=e.target.files[0];
        if(file){
            setFileState(file);
        }
    }
    const onSubmit=()=>{
        if (fileState && acceptedTypes.includes(mime.lookup(fileState.name))) {
            props.uploadAudio(fileState, mime.lookup(fileState.name));
            props.onClose();
            setFileState(null);
        }
    }
    return (
        <div>
            <Modal open={props.open} onClose={props.onClose}>
                <Modal.Header>Select a Audio</Modal.Header>
                <Modal.Content>
                    <Input
                    type="file"
                    name="file"
                    label="file Type(mp3,wav)"
                    onChange={onFileAdded}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={onSubmit}>
                        <Icon name="checkmark">Add</Icon>
                    </Button>
                    <Button color='red' onClick={props.onClose}>
                        <Icon name="remove">Cancel</Icon>
                    </Button>
                </Modal.Actions>
            </Modal>
            
        </div>
    )
}
export default AudioUpload