import React, { useState, useEffect } from "react";


const Home = ({ userObj }) => {
    const [search, setSearch] = useState("");

    return (
       <div className="container">
        <div className="mainLemona">
            <div className="LemonaSec">

            </div>
            <div className="LemonaSec">
                
            </div>

        </div>
        <div className="search">
            <input
            className="searchInput"
            placeholder="Search"
            required
            value={search}/>
            <button
            className="searchBtn">🔍</button>
        </div>
        <div className="hot"><span className="hotSpan">🔥HOT</span></div>
       </div>
    );
};
export default Home;