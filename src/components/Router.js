// Router.js
import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Form from "../routes/Form";
import ProjectForm from "../routes/ProjectForm";
import Test from "../routes/Test";
import ProjectDetails from "../routes/ProjectDetail";
import ParticipateBoard from "../routes/ParticipateBoard";
import ProjectBoard from "../routes/ProjectBoard";

const AppRouter = () => {
    const [isLoggedIn, setisLoggedIn] = useState(true);

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<ParticipateBoard />} />
                <Route exact path="/pd" element={<ProjectDetails />} />
            </Routes> 
        </Router>
      );
};

export default AppRouter;
