import {React,useState} from 'react';
import {Modal,Button,Input,Icon} from 'semantic-ui-react';
import "./ImageUpload.css"
import mime from 'mime-types';
const ImageUpload=(props)=>{
  const [fileState,SetFileState] =useState(null)
    
  const acceptedFiles =["image/png","image/jpeg"]
  const OnfileAdded=(e)=>{
    const file=e.target.files[0]
    if(file)
    SetFileState(file)
  }
  const onSubmit=()=>{
    if(fileState && acceptedFiles.includes(mime.lookup(fileState.name))){
      props.upload(fileState,mime.lookup(fileState.name))
      props.close()
      SetFileState(null)
    }
  }
  return(
    <Modal basic open={props.open} onClose={props.close} className="mod1">
       <Modal.Header>Select A Image</Modal.Header>
       <Modal.Content>
           <Input
             type="file"
             name="file"
             onChange={OnfileAdded}
             label="File Type(png,jpeg)"
             fluid
           />
       </Modal.Content>
       <Modal.Actions>
          <Button color="green" onClick={onSubmit}>
              <Icon name="check square outline icon"/>Add Image
          </Button >
          <Button color="red" onClick={props.close}>
               <Icon name="close icon"/> Cancel

          </Button>
       </Modal.Actions>
    </Modal>
  )
}
export default ImageUpload
