import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import axios from 'axios';

// Mui
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { SET_AUTHENTICATED } from './redux/types';

import themeFile from './util/theme';
import NavBar from './components/NavBar';
import UserPage from './components/pages/UserPage';
import DispensaryPage from './components/pages/DispensaryPage';
import LoginPage from './components/pages/LoginPage';
import OffersPage from './components/pages/OffersPage';
// import SignupPage from './components/pages/SignupPage';
import PageNotFound from './components/pages/PageNotFound';

import './App.css';
axios.defaults.baseURL = "https://us-central1-leafvip-dev.cloudfunctions.net";


const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/users";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
    window.location.href = "/users";  

  }
}


 function App() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                 <Route exact path="/login" component={LoginPage} />
                 <Route exact path="/users" component={UserPage} />
                 <Route exact path="/dispensaries" component={DispensaryPage} />
                 <Route exact path="/offers" component={OffersPage} />
                 <Route component={PageNotFound} />
              </Switch>
            </div>
          </Router>
        </Provider> 
      </ThemeProvider>
    )
  }

  export default App;