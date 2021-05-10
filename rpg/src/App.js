import React, { useEffect } from "react";
import { HashRouter, Route, Switch, Link, useHistory } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Register/Register.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import { Provider } from "react-redux";
import store from "./store"
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";



const App = () => {
  const history = useHistory();
  const auth = store.getState().auth;

  useEffect(() => {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      store.dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        history.push("/");
      }
    }
  }, [history])

  return (
    <Provider store={store}>
      <HashRouter>
        {auth.isAuthenticated ?
          <div>
            <Link to="/Home">Home</Link>
          </div>
          :
          <div>
          </div>
        }
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/Register" component={Register} />
          <PrivateRoute exact path="/Home" auth={auth} component={Home} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
