import {React,useState} from 'react';
import {Grid,Form,Segment,Icon,Header,Button,Message} from 'semantic-ui-react';
import firebase from '../../Components/database/Firebase';
import {Link} from "react-router-dom"
import "./LogIn.css"
const LogIn=()=>{
  let user={

    email:"",
    password:"",

  };
  let errors=[]
  const mystyle={
    maxWidth:"500px",
   alignItems: "center",
   justifyContent:"center",
  }
  const [User, setUser] = useState(user)
  const [Error, setError] = useState(errors)
  const [isLoading,SetLoading] = useState(false)
  const handleInput = (event) =>{
    let target=event.target
    setUser((currentState)=>{
      let currentuser={...currentState}
      currentuser[target.name]=target.value
      return currentuser
    })
  }
  const formaterrors=()=>{
  return  Error.map((err,index)=><p key={index}>{err.message}</p>)
  }
  const checkform=()=>{
    if(isFormEmpty())
    {
      setError((error)=>error.concat({message:"Please fill in all the fields"}))
      return false
    }


    return true
  }
  const isFormEmpty=()=>{
    return !User.password.length||!User.email.length
  }
  const onSubmitHandler=(event)=>{
    event.preventDefault();

    setError(()=>[])
    if(checkform()){
      SetLoading(true)
      firebase.auth().signInWithEmailAndPassword(User.email, User.password)
               .then(createUser=>{
                   SetLoading(false)
                console.log(createUser);
               })
               .catch(servererr=>{
                    SetLoading(false)
                 setError((error)=>error.concat(servererr))})
    }

  }
  return(
    <Grid verticalalign="middle" textAlign="center" className="register" >
       <Grid.Column style={mystyle}>
         <Header icon as ="h2">
            <Icon name="slack"/>
            LogIn
         </Header>
           <Form onSubmit={onSubmitHandler}>
               <Segment stacked>

                   <Form.Input
                     name="email"
                     value={User.email}
                     icon="mail"
                     iconPosition="left"
                     onChange={handleInput}
                     type="email"
                     placeholder="UserEmail"
                   />
                   <Form.Input
                     name="password"
                     value={User.password}
                     icon="lock"
                     iconPosition="left"
                     onChange={handleInput}
                     type="password"
                     placeholder="Password"
                   />

               </Segment>
                  <Button disabled={isLoading} loading={isLoading}>
                    <Icon name="hand point right"/>
                   &nbsp;LogIn</Button>
           </Form>
         {Error.length>0 && <Message error>
           <h3>Errors</h3>
           {formaterrors()}
         </Message>}

         <Message>
          Not An User ? <Link to="/register">&nbsp;<Icon name="sign-in"/>SignIn</Link>
         </Message>
       </Grid.Column>
    </Grid>
  )
}
export default LogIn
