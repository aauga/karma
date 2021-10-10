
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './components/loading';
import ProtectedRoute from './auth/protected-route';
import AddListing from './pages/AddListing';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/AddListing" component={AddListing} />
      <ProtectedRoute path="/profile" component={Profile} />
    </Switch>
    </div>
  );
}

export default App;
