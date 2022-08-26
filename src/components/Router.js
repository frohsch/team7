import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import ProfileEdit from "../routes/ProfileEdit";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router basename="/">
        {<Navigation  />}
      <Routes>
          <>
            <Route exact={true} path={"/"} element={<Home />}>
            </Route>

            <Route exact={true} path={"/profile"} element={<Profile />}>
              {isLoggedIn ? (
              <>
              <Route exact={true} path={"/profileedit"} element={<ProfileEdit />}></Route>
              </>
              ) : (
                <>
                <Route exact={true} path={"/auth"} element={<Auth />}></Route>
                </>
              )}
            </Route>
          </>
        {/* ) : ( */}
            <>
              <Route exact={true} path={"/"} element={<Auth />}>
              {/* <Auth /> */}
              </Route>
            </>
        {/* )} */}
      </Routes>
    </Router>
  );
};
export default AppRouter;