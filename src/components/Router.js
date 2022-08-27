// Router.js
import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Form from "../routes/Form";
import ProjectForm from "../routes/ProjectForm";
import Test from "../routes/Test";
import ProjectDetails from "../routes/ProjectDetail";
import Forum from "../routes/Forum";

const AppRouter = () => {
    const [isLoggedIn, setisLoggedIn] = useState(true);

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Forum />} />
                <Route exact path="/pd" element={<ProjectDetails />} />
            </Routes> 
        </Router>
      );
};

export default AppRouter;
