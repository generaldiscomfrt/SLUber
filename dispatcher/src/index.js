import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import IndexItem from './components/IndexItem';
import EditRide from './components/EditRide';
import LoginPage from "./components/LoginPage";

ReactDOM.render(
        <Router>
            <div>
                <Route exact path='/' component={LoginPage} />
                <Route path='/index' component={IndexItem}/>
            </div>
        </Router>,
        document.getElementById('root')
);
