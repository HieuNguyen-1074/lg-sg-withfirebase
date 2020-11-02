import React, {useState , useEffect} from 'react'
import './App.css';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import FormLogin from './components/FormLogin';
import Home from './components/Home';
import FormSign from './components/FormSign';

function App() {
  const [islogin ,setIslogin] = useState({username : false , password : false}) 

  return (
    <div className="App">
     <Router>
       <Switch>
         <Route exact path="/" ><FormLogin islogin = {
           {
             islogin : islogin,
             setIslogin : setIslogin
           }
         } /></Route>
          <Route exact path="/sign" ><FormSign />  </Route>
         {
           ((islogin.password === true && islogin.username === true) ? 
           <Route  exact path = "/home" ><Home /></Route> : 
           <Redirect to="/" />)
         }
         
        
       </Switch>
       
     </Router>
    </div>
  );
}

export default App;
