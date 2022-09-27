import React, { lazy, Suspense, useState, useEffect } from "react";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import ThemeProvider from './themes/themeProvider';
import JsProjectProvider from './context/use-current-project';

import { Router, Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./pages/landingPage.jsx";
import { createBrowserHistory } from 'history';
import NavBar from "./core/navBar/index.jsx";

import AbstractiveSummarisation from './components/projects/abstractiveSummarisation/main/index.jsx'
import AutonomousDriving from './components/projects/autonomousDriving/main/index.jsx';
import DocumentAnalysisNLP from './components/projects/documentAnalysisNLP/main/index.jsx';
import FakeNewsDetector from './components/projects/fakeNewsDetector/main/index.jsx';
import FaceRecognition from './components/projects/faceRecognition/main/index.jsx';
import ResidualNetworks from './components/projects/residualNetworks/index.jsx';
import ConvNetTensorflow from './components/projects/convNetTensorflow/main/index.jsx';
import KerasIntro from './components/projects/kerasIntro/main/index.jsx'
import Covid from './components/projects/covid/index.jsx';
import { DataScience, JSThirty } from './pages/topicMainPage/index.js';

const createClassName = createGenerateClassName({
  productionPrefix: "shell",
})

// Only loads the component if needed
// const AuthLazy = lazy(() => import('./components/AuthApp'));
// const MarketingLazy = lazy(() => import('./components/MarketingApp'));
// const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const history = createBrowserHistory();

export default () => {
  // const [isSignedIn, setIsSignedIn] = useState(false);

  // useEffect(() => {
  //   if (isSignedIn) {
  //     history.push('/dashboard');
  //   }
  // }, [isSignedIn]);

  return (
    <ThemeProvider>
      <JsProjectProvider>
        <Router history={history}>
          <StylesProvider generateClassName={createClassName}>
            <div>
              <NavBar />
              <Suspense fallback={<div>Loading....</div>}>
                <Switch>
                  {/* <Route path='/auth'>
                <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
              </Route>
              <Route path='/dashboard'>
                {!isSignedIn && <Redirect to="/"/>}
                <DashboardLazy /> 
              </Route> */}
                  <Route path='/data-science' component={DataScience} />
                  <Route path="/js30" component={JSThirty} />
                  <Route path="/residual-networks" component={ResidualNetworks} />
                  <Route path="/covid" component={Covid} />
                  <Route path="/convNet-tensorflow" component={ConvNetTensorflow} />
                  <Route path="/keras-introduction" component={KerasIntro} />
                  <Route path="/autonomous-driving" component={AutonomousDriving} />
                  <Route path="/abstractive-summarisation" component={AbstractiveSummarisation} />
                  <Route path="/fake-news-detector" component={FakeNewsDetector} />
                  <Route path="/document-analysis-NLP" component={DocumentAnalysisNLP} />
                  <Route path="/face-recognition" component={FaceRecognition} />
                  <Route path='/' component={LandingPage} />
                </Switch>
              </Suspense>
            </div>
          </StylesProvider>
        </Router>
      </JsProjectProvider>
    </ThemeProvider>
  )
}