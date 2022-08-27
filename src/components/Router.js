// Router.js
import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import ProfileEdit from "../routes/ProfileEdit";
import Participate from "../routes/Participate";
import Project from "../routes/Project";
import Publicize from "../routes/Publicize";
import ProjectDetail from "../routes/DetailPage/ProjectDetail";
import AdForm from "../routes/form/AdForm";
import ProjectForm from "../routes/form/ProjectForm";
import TogetherForm from "../routes/form/TogetherForm";
import Show from "../routes/Show";
import Content from "./Content";
import GetImage from "./GetImage";
import Form from "../routes/Form";
//import Test from "../routes/Test";
import ParticipateBoard from "../routes/Board/ParticipateBoard";
import ProjectBoard from "../routes/Board/ProjectBoard";
import TogetherDetail from "../routes/DetailPage/TogetherDetail";
import AdDetail from "../routes/DetailPage/AdDetail";

const AppRouter = ( { isLoggedIn, userObj, refreshUser } ) => {
  return (
    <Router basename="/">
        {<Navigation userObj={userObj} isLoggedIn={isLoggedIn} />}

      <Routes>
        <>
        <Route exact path="/adform" element={<AdForm userObj={userObj}/>} />
        <Route exact path="/projectform" element={<ProjectForm userObj={userObj}/>} />
        <Route exact path="/togetherform" element={<TogetherForm userObj={userObj}/>} />
        <Route exact path="/content" element={<Content />} />
        <Route exact path="/show" element={<Show />} />
        <Route exact path="/getimage" element={<GetImage />} />
        <Route exact path="/project_items" element = {<ProjectDetail userObj={userObj}/>}/>
		<Route exact path="/together_items" element = {<TogetherDetail userObj={userObj}/>}/>
		<Route exact path="/ad_items" element = {<AdDetail userObj={userObj}/>}/>
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
