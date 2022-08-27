import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import ProfileEdit from "../routes/ProfileEdit";
import Participate from "../routes/Participate";
import Project from "../routes/Project";
import Publicize from "../routes/Publicize";


const AppRouter = ( { isLoggedIn, userObj, refreshUser } ) => {
  return (
    <Router basename="/">
        {<Navigation userObj={userObj} isLoggedIn={isLoggedIn} />}

      <Routes>
        <>
        <Route exact={true} path={"/"} element={<Home userObj={userObj} />}></Route>
        <Route exact={true} path={"/project"} element={<Project userObj={userObj} />}></Route>
        <Route exact={true} path={"/participate"} element={<Participate userObj={userObj}  />}></Route>
        <Route exact={true} path={"/publicize"} element={<Publicize userObj={userObj} />}></Route>
        </>
        {isLoggedIn ? (
     <>
            <Route exact={true} path={"/profile"} element={<Profile refreshUser={refreshUser} userObj={userObj} />}></Route>
            <Route exact={true} path={"/profileedit"} element={<ProfileEdit refreshUser={refreshUser} userObj={userObj} />}></Route>
            </>
        ) : ( 
              <Route exact={true} path={"/auth"} element={<Auth />}></Route>
        
        )}  
      </Routes>
    </Router>
  );
};
export default AppRouter;