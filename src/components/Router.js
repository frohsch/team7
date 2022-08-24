// Router.js
import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Form from "../routes/Form";
import ProjectForm from "../routes/ProjectForm";
import Test from "../routes/Test";

const AppRouter = () => {
    const [isLoggedIn, setisLoggedIn] = useState(true);

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<ProjectForm />} />
                <Route exact path="/test" element={<Test />} />
            </Routes> 
        </Router>
      );
};

export default AppRouter;
