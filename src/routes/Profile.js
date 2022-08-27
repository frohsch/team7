import React, { useEffect, useState } from "react";
import { authService, dbService } from "firebase_";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";

import { Link } from "react-router-dom";

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
        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        }
    };

    useEffect(() => {
        
    }, []);

    return (
        <div className="container">
            <div className="profileTitleDiv">
            <span className="profileMainTitile">Profile</span>  
            <div className="EditBtnDiv">
            <span onClick={onEditClick}>Edit</span></div>
                </div>
        <div className="profileContainer">
            <div className="profileformcss"><div className="profileTitle"><span>Username</span></div>
                <span className="profilecss"> {newDisplayName} </span>
            </div>
            <div className="profileformcss"><div className="profileTitle"><span>Name</span></div>
                <span className="profilecss"> {newDisplayName} </span>
            </div>
            <div className="profileformcss"><div className="profileTitle"><span>E Mail</span></div>
                <span className="profilecss"> {newDisplayName} </span>
            </div>
            <div className="profileformcss"><div className="profileTitle"><span>Website</span></div>
                <span className="profilecss"> {newDisplayName} </span>
            </div>
            <div className="profileformcss"><div className="profileTitle"><span>Bio</span></div>
                <span className="profilecss"> {newDisplayName} </span>
            </div>
            </div>
            <div className="Portfolio">
            <span className="profileMainTitile">Portfolio</span>  
            </div>

            {/* <form onSubmit={onSubmit} className="profileForm"> */}

                {/* <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    defaultValue={newDisplayName}
                    className="formInput"
                /> */}
                {/* <input
                    type="submit"
                    defaultValue="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                /> */}
            {/* </form> */}
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
        </span>
       </div>
    );
};

export default Profile;
