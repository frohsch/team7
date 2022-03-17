import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";
import { updateProfile } from "@firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [newName, setNewName] = useState("");
  // 렌더링만을 위한 state(newName)


  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        if(user.displayName === null){
          // const ind = user.email.indexOf("@")
          // const end = user.email.substring(0,ind)
          // user.updateProfile({displayName:end})
          updateProfile(user, {displayName: "anonymous"})
        }
        setUserObj({
          // displayName: user.displayName,
          displayName: user.displayName ? user.displayName : 'Anonymous',
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
          });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setNewName(user.displayName);
    // const user = authService.currentUser;
    // setUserObj({
    //   displayName: user.displayName,
    //   uid: user.uid,
    //   updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
    // });
  };
  return (
    <>
    <div classname="Initializing"> 
      {init ? (<AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />) : ("Initializing...")}
      </div>
    </>
  );
}

export default App;
