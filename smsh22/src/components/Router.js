import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  // Routes,
  Switch,
} from "react-router-dom";
import Auth from "../page/Auth";
import Detail from "../page/Detail";
import Home from "../page/Home";
// import Auth from "routes/Auth";
// import Home from "routes/Home";
// import Profile from "routes/Profile";
// import Navigation from "components/Navigation";


const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {/* {isLoggedIn && <Navigation userObj={userObj} />} */}
      <Switch>
        {/* <Routes> */}
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/detail">
              <Detail userObj={userObj} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/"></Redirect>
          </>
        )}
      </Switch>
      {/* </Routes> */}
    </Router>
  );
};

export default AppRouter;
