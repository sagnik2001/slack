import { Sidebar } from "./components/sidebar/Sidebar";
import Messages from "./components/Messages/Messages";
import "./App.css";
import { Grid } from "semantic-ui-react";
import Background from './images/background.jpg';
function App() {
  return (
    <Grid columns="equal" style={{backgroundImage: `url(${Background})`}}>
      <Sidebar />
      <Grid.Column className="messagepanel">
        <Messages />
      </Grid.Column>

      <Grid.Column width={3} className="messageSide">
        <span></span>
      </Grid.Column>
    </Grid>
  );
}

export default App;
