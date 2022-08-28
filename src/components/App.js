import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../firebase_";
import { updateProfile } from "@firebase/auth";
//import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [newName, setNewName] = useState("");
  // 렌더링만을 위한 state(newName)

  useEffect(async() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // if(user.displayName === null){
        //   updateProfile(user, {displayName: "anonymous"})
        // }
        setUserObj({
          uid: user.uid,
		  displayName: user.displayName ? user.displayName : 'Anonymous',
        //   updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
		updateProfile: (args) => user.updateProfile(args)
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
	setUserObj({
		uid : user.uid,
		displayName: user.displayName,
		updateProfile: (args) => user.updateProfile(args)
	});
  };

  return (
    <>
      <div className="Initializing">
        {init ? (
          <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
        ) : (
          "Initializing..."
        )}
      </div>
    </>
  );
}


export default App;
