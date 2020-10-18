import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserContext from './context/UserContext';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import SuccessNotify from './pages/SuccessNotify';
import Login from './pages/Login/Login';
import Forgot from './pages/Login/Forgot';
import Reset from './pages/Login/Reset';
import DashboardPending from './pages/Dashboard/DashboardPending';
import DashboardApproved from './pages/Dashboard/DashboardApproved';

function Routes() {
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('token') || '');
    }, [token])

    return (
        <UserContext.Provider value={{token, setToken}}>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Landing}/>
                    <Route path='/app' component={OrphanagesMap}/>
                    
                    <Route path='/orphanages/create/success' component={SuccessNotify}/>
                    <Route path='/orphanages/create' component={CreateOrphanage}/>
                    <Route path='/orphanages/:id' component={Orphanage}/>

                    <Route path='/login' component={Login} />
                    <Route path='/forgot' component={Forgot} />
                    <Route path='/reset/:resetToken' component={Reset} />

                    <Route path='/dashboard/approved' component={DashboardApproved} />
                    <Route path='/dashboard' component={DashboardPending} />
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default Routes;