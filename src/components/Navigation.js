import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLemon } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Navi = styled.nav`
    margin: 0px;
    width: 100vw;
`
const NaviDiv = styled.div`
    width: 100%;
    height: 70px;
    /* border: 1px solid black; */
    columns: black;
`

const Navigation = ({ userObj, isLoggedIn, loginlink }) => {
    return (
        <>
            <Navi>
                <NaviDiv>
                    <ul style={{ display: "flex", justifyContent: "center", margin: 10 }}>
                        <li className="logoLi">
                            <Link to="/" >
                                <div className="logoImage" style={{  width: "50px", height: "50px", marginRight: "56vw" }}>
                                <FontAwesomeIcon icon={faLemon} color={"#48acff"} size="4x" />
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link className="naviLink" to="/project" style={{
                                margin: "15px 15px",
                                display: "flex",
                                flexdirection: "column",
                                alignitems: "center",
                                fontsize: "14px",
                                color: "black",
                                height: "auto",
                            }}>
                                <span>프로젝트</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="naviLink" to="/participate" style={{
                                margin: "15px 15px",
                                display: "flex",
                                flexdirection: "column",
                                alignitems: "center",
                                fontsize: "14px",
                                color: "black",
                                height: "auto",
                            }}>
                                <span>함께해요</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="naviLink" to="/publicize" style={{
                                margin: "15px 15px",
                                display: "flex",
                                flexdirection: "column",
                                alignitems: "center",
                                fontsize: "14px",
                                color: "black",
                                height: "auto",
                            }}>
                                <span>홍보해요</span>
                            </Link>
                        </li>
                        <li>
                            {isLoggedIn ? (
                                <Link
                                    className="naviLink"
                                    to='/profile'
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
                            ) : (
                                <Link
                                    className="naviLink"
                                    to='/profile'
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
                            )
                            }
                        </li>
                    </ul>
                    <hr></hr>
                </NaviDiv>
            </Navi>
        </>
    )
};
export default Navigation;

