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


const AppRouter = ( {isLoggedIn, userObj} ) => {
  return (
    <Router basename="/">
        {<Navigation userObj={userObj}  />}

      <Routes>
        <>
        <Route exact={true} path={"/"} element={<Home />}></Route>
        <Route exact={true} path={"/project"} element={<Project />}></Route>
        <Route exact={true} path={"/participate"} element={<Participate  />}></Route>
        <Route exact={true} path={"/publicize"} element={<Publicize />}></Route>
        </>
        {isLoggedIn ? (
     
            <Route exact={true} path={"/profile"} element={<Profile userObj={userObj} />}></Route>
      
        ) : (
              <Route exact={true} path={"/auth"} element={<Auth />}></Route>
        
        )}
      </Routes>
    </Router>
  );
};
export default AppRouter;