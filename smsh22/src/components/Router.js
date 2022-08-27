import React from "react";
import {
  HashRouter as Router,
  // Redirect,
  Route,
  Routes,
  // Switch,
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
      {/* <Switch> */}
      <div
        // style={{
        //   maxWidth: 890,
        //   width: "100%",
        //   margin: "0 auto",
        //   marginTop: 80,
        //   display: "flex",
        //   justifyContent: "center",
        // }}
          >
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />}/>
            <Route exact path="/detail" element={<Detail/>} />
            {/* <Redirect from="*" to="/"></Redirect> */}
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />} />
            {/* <Redirect from="*" to="/"></Redirect> */}
          </>
        )}
      {/* </Switch> */}
      </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
