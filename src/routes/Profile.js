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
        }
    };

    const getMyKuromis = async () => {
        const q = query(
            collection(dbService, "rooo"),
            where("creatorId", "==", userObj.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    };

    useEffect(() => {
        getMyKuromis();
    }, []);

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    value={newDisplayName}
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
        </span>
        </div>
    );
};

export default Profile;

// import React from "react";

// function Profile({ userObj }) {
//   const { email, password, name } = user || {};
//   return (
//     <div className = "container">
//       <h1>Profile</h1>
//       <dt>Email</dt>
//       <dd>{email}</dd>
//       <dt>Password</dt>
//       <dd>{password}</dd>
//       <dt>Name</dt>
//       <dd>{name}</dd>
//       </div>
//   );
// }

// export default Profile;