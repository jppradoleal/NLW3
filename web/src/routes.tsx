import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import SuccessNotify from './pages/SuccessNotify';
import Login from './pages/Login/Login';
import Forgot from './pages/Login/Forgot';
import Reset from './pages/Login/Reset';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Landing}/>
                <Route path='/app' component={OrphanagesMap}/>
                
                <Route path='/orphanages/create/success' component={SuccessNotify}/>
                <Route path='/orphanages/create' component={CreateOrphanage}/>
                <Route path='/orphanages/:id' component={Orphanage}/>

                <Route path='/login' component={Login} />
                <Route path='/forgot' component={Forgot} />
                <Route path='/reset' component={Reset} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;