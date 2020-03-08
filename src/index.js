import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';

import App from './App';
import FakeNewsDetector from './fakeNewsDetector/main/index';

ReactDOM.render(
    <Router>
        <Route exact path="/" component={App} />
        <Route path="/fakeNewsDetector" component={FakeNewsDetector} />
    </Router>
, document.getElementById('root'));

