import {Sidebar} from "./Components/Sidebar/Sidebar"
import Message from "./Components/Messages/Message"
import {Grid} from "semantic-ui-react"
import "./App.css"
function App() {
  return (

  <Grid columns="equal">
        <Sidebar />
<Grid.Column className="modal">
    <Message />
</Grid.Column>
  <Grid.Column width={3}>
     <span></span>
  </Grid.Column>
   </Grid>
  );
}

export default App;
