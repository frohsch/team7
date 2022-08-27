import React, { useEffect, useState } from "react";
import { authService, dbService } from "firebase_";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "@firebase/auth";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding: 10vh 0 0 0;
  justify-content: center;
  align-items: center;
`

const ProfileDiv = styled.div`
width: 100vw;
display: flex;
`

const ProfileContainer = styled.div`
width: 573px;
float: left;
`

const ProfileFormCss= styled.div`
width: 40vw;
  height: 25px;
  margin: 50px 0 0 0;
  border-bottom: 1px solid #464646;
  display: flex;
`
const ProfileTitle= styled.div`
color: black;
  width: 100px;
  font-size: 14px;
  height: auto;
`

const EditBtnDiv=styled.div`
font-size: 14px;
  width: 80px;
  height: 40px;
  color: #707070;
  background-color: #CCE8FF;
  border-radius: 20px;
  text-align: center;
  margin: 50px 45vw 0 0;
  padding: 12px;
  cursor: pointer;
`

const Profile = ({ refreshUser, userObj }) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const onEditClick = () => {
        navigate("/profileedit");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        }
    };

    useEffect(() => {

    }, []);

    return (
        <Container>
            <ProfileDiv>
                <span className="profileMainTitile">Profile</span>
                <EditBtnDiv>
                    <span onClick={onEditClick}>Edit</span>
                </EditBtnDiv>
            </ProfileDiv>
            <ProfileContainer>
                <ProfileFormCss>
                    <ProfileTitle><span>Username</span></ProfileTitle>
                    <span className="profilecss" style={{ fontsize: "14px", color: "#464646"}}> {newDisplayName} </span>
                </ProfileFormCss>
                <ProfileFormCss>
                    <ProfileTitle><span>Name</span></ProfileTitle>
                    <span className="profilecss" style={{ fontsize: "14px", color: "#464646"}}> {newDisplayName} </span>
                </ProfileFormCss>
                <ProfileFormCss>
                    <ProfileTitle><span>E Mail</span></ProfileTitle>
                    <span className="profilecss" style={{ fontsize: "14px", color: "#464646"}}> {newDisplayName} </span>
                </ProfileFormCss>
                <ProfileFormCss>
                    <ProfileTitle><span>Website</span></ProfileTitle>
                    <span className="profilecss" style={{ fontsize: "14px", color: "#464646"}}> {newDisplayName} </span>
                </ProfileFormCss>
                <ProfileFormCss>
                    <div className="profileTitle"><span>Bio</span></div>
                    <span className="profilecss" style={{ fontsize: "14px", color: "#464646"}}> {newDisplayName} </span>
                </ProfileFormCss>
            </ProfileContainer>
            <ProfileDiv>
                <span className="profileMainTitile">Portfolio</span>
            </ProfileDiv>

            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </Container>
    );
};

export default Profile;
