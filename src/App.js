import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import axios from 'axios';

// Mui
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { SET_AUTHENTICATED } from './redux/types';

import themeFile from './util/theme';
import NavBar from './util/NavBar';
import UserPage from './components/users/UserPage';
import DispensaryPage from './components/dispensaries/DispensaryPage';
import LoginPage from './components/authentication/LoginPage';
import OffersPage from './components/offers/OffersPage';
import BrandsPage from './components/brands/BrandsPage';
import PushNotificationsPage from './components/notifications/PushNotificationsPage';
import SurveyPage from './components/survey/SurveyPage';
import PageNotFound from './components/PageNotFound';
import './App.css';


axios.defaults.baseURL = "https://us-central1-leafvip-c42db.cloudfunctions.net";
// axios.defaults.baseURL = "https://us-central1-leafvip-dev.cloudfunctions.net"

const theme = createMuiTheme(themeFile);
const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
    window.location.href = "/";  

  }
}


 function App() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                 <Route exact path="/" component={UserPage} />
                 <Route exact path="/login" component={LoginPage} />
                 <Route exact path="/brands" component={BrandsPage} />
                 <Route exact path="/dispensaries" component={DispensaryPage} />
                 <Route exact path="/offers" component={OffersPage} />
                 <Route exact path="/surveys" component={SurveyPage} />
                 <Route exact path="/notifications" component={PushNotificationsPage} />
                 <Route component={PageNotFound} />
              </Switch>
            </div>
          </Router>
        </Provider> 
      </MuiThemeProvider>
    )
  }

  export default App;