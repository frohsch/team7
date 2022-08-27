// Router.js
import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AdForm from "../routes/form/AdForm";
import ProjectForm from "../routes/form/ProjectForm";

const AppRouter = () => {
    const [isLoggedIn, setisLoggedIn] = useState(true);

    return (
        <Router>
            <Routes>
                <Route exact path="/adform" element={<AdForm />} />
                <Route exact path="/projectform" element={<ProjectForm />} />
            </Routes> 
        </Router>
      );
};

export default AppRouter;
