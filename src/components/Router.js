import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router basename="/">
        {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact={true} path={"/"} element={<Home userObj={userObj} />}>
              {/* <Home /> */}
            </Route>
            <Route exact={true} path={"/profile"} element={<Profile userObj={userObj} />}>
              {/* <Home /> */}
            </Route>
          </>
        ) : (
            <>
              <Route exact={true} path={"/"} element={<Auth />}>
              {/* <Auth /> */}
              </Route>
            </>
        )}
      </Routes>
    </Router>
  );
};
export default AppRouter;