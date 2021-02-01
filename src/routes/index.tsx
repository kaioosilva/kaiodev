import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import LandingPage from '../pages/landingPage';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={LandingPage} />

    </Switch>
);

export default Routes;