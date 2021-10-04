
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/login';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
