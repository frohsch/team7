// Router.js
import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AdForm from "../routes/form/AdForm";
import ProjectForm from "../routes/form/ProjectForm";
import TogetherForm from "../routes/form/TogetherForm";
import Show from "../routes/Show";
import Content from "./Content";

const AppRouter = () => {
    const [isLoggedIn, setisLoggedIn] = useState(true);

    return (
        <Router>
            <Routes>
                <Route exact path="/adform" element={<AdForm />} />
                <Route exact path="/projectform" element={<ProjectForm />} />
                <Route exact path="/togetherform" element={<TogetherForm />} />
                <Route exact path="/content" element={<Content />} />
                <Route exact path="/show" element={<Show />} />
            </Routes> 
        </Router>
      );
};

export default AppRouter;
