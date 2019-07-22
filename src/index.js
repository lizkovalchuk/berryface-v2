import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import fire from "./config/Fire";
import "assets/scss/material-kit-react.scss?v=1.4.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import RegisterPage from "views/RegisterPage/RegisterPage.jsx";


var hist = createBrowserHistory();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        // localStorage.setItem('user', user.uid);
        // Not necessary, but possible, to save the user to local storage
      } else {
        this.setState({ user: null });
        //  localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <Router history={hist}>
        <Switch>
          <Route path="/login-page" component={LoginPage} />
          <Route path="/register-page" component={RegisterPage} />
          {this.state.user ? (<Route path="/profile-page" component={ProfilePage} />) : (<Route path="/" component={LandingPage} />)}
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

/*

HOW IT WAS

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login-page" component={LoginPage} />
      <Route path="/register-page" component={RegisterPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

*/