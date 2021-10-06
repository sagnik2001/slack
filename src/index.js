import {React,useEffect} from 'react';
import ReactDOM from 'react-dom';
import "semantic-ui-css/semantic.min.css";/*So That we can use it everywhere*/
import App from './App';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn.js';
import Register from './Components/Register/Register.js';
import { withRouter } from 'react-router-dom'


ReactDOM.render(
  <React.StrictMode>
//     <Router>
//       <Switch>
// /*         <Route path="/login" component={LogIn}/>
//          <Route path="/register" component={Register}/>*/
//          <Route path="/" component={App}/>
//       </Switch>
//     </Router>
<App/>

</React.StrictMode>,
  document.getElementById('root')
);
