import React from 'react';
import {connect} from 'react-redux';
import pick from 'lodash/pick';

import Login from './Login';
import Grid from './Grid';
import config from '../../config.json';

const Home = ({connectionStatus, locations, user}) => (
  <section>
    <header className="app-header navbar">
      <a className="navbar-brand" href="#" style={{color: 'white'}}>performads challenge</a>
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link nav-pill avatar" href={config.repo}>
            <img
              src="https://avatars1.githubusercontent.com/u/1662766?s=40&v=4"
              className="img-avatar"
              alt="code source"
            />
          </a>
        </li>
      </ul>
    </header>
    <div>
      {!connectionStatus && <div>Connecting to DB...</div>}
      {connectionStatus && !user && <Login />}
      {connectionStatus && user && locations.length === 0 && <div>Getting locations...</div>}
      {connectionStatus && user && locations.length > 0 && <Grid />}
    </div>
  </section>
);

const selector = state => pick(state, ['connectionStatus', 'locations', 'user']);

export default connect(selector)(Home);

// curl -i -X GET \
// "https://graph.facebook.com/v2.12/295469802058/locations?fields=location,hours,store_location_descriptor,phone&access_token=EAACEdEose0cBAIwZCDXYe2nZBZCZC1i0AcJf77Q3ZAxKSCvXdW2sOiCkWaYZB9JJIfTbZCZAEBdH2VagBeY1hbxM00TFLpULEfZBAXJzp8pUeQoterZAIuh9WYpDpH5iwRgyITdDdPOPOtKkm9Lic72ZAOHZAlmR2ERSggdYSkPsmElyDI8eQRZABTzbDfRLGiWcp9FIZD"
