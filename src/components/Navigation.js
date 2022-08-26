import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faAnchor } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
    <nav className="navi">
        <div className="navidiv">
        <ul style = {{ display: "flex", justifyContent: "center", margin: 10 }}>
            <li className="logoLi">
                <Link to="/" >
                    <div className="logoImage">

                    {/* <image src = "/public/logo.png" alt = "logo"/> */}
                    {/* <FontAwesomeIcon icon={faAnchor} color={"#48ACFF"} size="2x" /> */}
                    </div>
                </Link>
            </li>
            <li>
                 <Link className="naviLink" to="/project">
                    <span>프로젝트</span>
                </Link>
            </li>
            <li>
                 <Link className="naviLink" to="/participate">
                    <span>함께해요</span>
                </Link>
            </li>
            <li>
                 <Link className="naviLink" to="/publicize">
                    <span>홍보해요</span>
                </Link>
            </li>
            
            <li>
                <Link
                className="naviLink"
                    to="/profile"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontSize: 12,
                        marginLeft: 120,
                        marginTop: 10
                    }}
                >
                    <FontAwesomeIcon icon={faUser} color={"#707070"} size="2x" />
                </Link>
            </li>
        </ul>
        <hr />
        </div>
    </nav>


);

export default Navigation;