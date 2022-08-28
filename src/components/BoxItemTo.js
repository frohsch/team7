import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import '../BoardStyle/ProjectPosts.css';

const Container = styled.div`
width: "100%",
height: "100%",
display: "flex",
flexDirection: "column",
justify: "center",
display: "grid",
gridTemplateRows: "1fr ",
gridTemplateColumns: "1fr 1fr 1fr",
margin: "45px",
`

const BoxItemTo = ({ userObj, listObj, isOwner }) => {
    let navigate = useNavigate();

    const onDetaillistClick = () => {
        navigate(`/together_items`, {
            replace: false,
            state: { data: listObj.projectId },
        });
    };

    return (
        <>
            <Container onClick={onDetaillistClick}>
                <div className="card-wrapper">
                    <div className="card-title">{listObj.title}</div>
                    <div className="card-body">
                        <div className="card-body-text">
                            <div className="card-body-text-content">{listObj.introduce}</div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="username">{"userName"}</div>
                        <div className="date">{
                            new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                            }).format(listObj.createdAt)}</div>
                        <div className="view">{listObj.view + "  👀"}</div>
                    </div>
                </div>
            </Container>
        </>
    );
};
export default BoxItemTo;
