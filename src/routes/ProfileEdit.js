import React, { useEffect, useState } from "react";
import { authService, dbService } from "firebase_";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        } window.location.replace("/#/profileedit")
        window.location.replace("/#/profile")
        window.location.reload()
    };


    useEffect(() => {
        
    }, []);

    return (
        <div className="container">
        <div className="profileContainer">
            <form onSubmit={onSubmit} className="profileForm">

            <div className="profileTitleDiv">
            <span className="editprofileMainTitile">Profile</span> 
                </div>
        <div className="profileContainer">
            <div className="profileformcss"><div className="profileTitle"><span>Username</span></div>
                <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    defaultValue={newDisplayName}
                    className="profileeditcss" /> 
            </div>
            <div className="profileformcss"><div className="profileTitle"><span>Name</span></div>
            <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    defaultValue={newDisplayName}
                    className="profileeditcss" /> 
            </div>
            <div className="profileformcss"><div className="profileTitle"><span>E Mail</span></div>
            <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    defaultValue={newDisplayName}
                    className="profileeditcss" /> 
            </div>
            <div className="profileformcss"><div className="profileTitle"><span>Website</span></div>
            <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    defaultValue={newDisplayName}
                    className="profileeditcss" /> 
            </div>
            <div className="profileformcss"><div className="profileTitle"><span>Bio</span></div>
            <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    defaultValue={newDisplayName}
                    className="profileeditcss" /> 
            </div>
            </div>
            <div className="editPortfolio">
            <span className="editprofileMainTitile">Portfolio</span>  
            </div>

                {/* <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    defaultValue={newDisplayName}
                    className="formInput"
                />*/}
                <input
                    type="submit"
                    Value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                /> 
            </form>
        </div>
        </div>
    );
};

export default Profile;