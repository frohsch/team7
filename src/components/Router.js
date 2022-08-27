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
import TogetherDetail from "../routes/DetailPage/TogetherDetail";
import AdDetail from "../routes/DetailPage/AdDetail";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {<Navigation userObj={userObj} isLoggedIn={isLoggedIn} />}

      <Routes>
        <>
          {/*폼 작성*/}
          <Route exact path="/adform" element={<AdForm />} />
          <Route exact path="/projectform" element={<ProjectForm />} />
          <Route exact path="/togetherform" element={<TogetherForm />} />

          {/*상세페이지*/}
          <Route exact path="/project_items" element={<ProjectDetail />} />
          <Route exact path="/together_items" element={<TogetherDetail />} />
          <Route exact path="/ad_items" element={<AdDetail />} />

          <Route exact path="/" element={<Home userObj={userObj} />} />
          <Route exact path="/project" element={<Project userObj={userObj} />} />
          <Route exact path="/participate" element={<Participate userObj={userObj} />} />
          <Route exact path="/publicize" element={<Publicize userObj={userObj} />} />
        </>

        {isLoggedIn ? (
          <>
            <Route exact path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj} />} />
            <Route exact path="/profileedit" element={<ProfileEdit refreshUser={refreshUser} userObj={userObj} />} />
          </>
        ) : (
          <Route exact path="/auth" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );

};
export default AppRouter;
