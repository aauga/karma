import { Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Details from './pages/Details';
import Companies from './pages/Companies';
import Coupons from './pages/Coupons';
import AddListing from './pages/AddListing';
import Loading from './components/loading';
import Navbar from './components/Navbar';
import NotFound from './components/common/NotFound';
import ProtectedRoute from './auth/protected-route';
import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div id='app' className='d-flex flex-column h-100'>
            <ToastContainer />
            <Navbar />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/details/:id' exact component={Details} />
                <Route path='/coupons' exact component={Companies} />
                <Route path='/coupons/:id' exact component={Coupons} />
                <ProtectedRoute path='/addlisting' component={AddListing} />
                <ProtectedRoute path='/profile' component={Profile} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default App;
