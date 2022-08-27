import React from "react";
import { authService } from "../firebase_"
import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faLemon } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {

  const onSocialClick = async (event) => {
    const name = event.target.name;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faLemon}
        color={"#48ACFF"}
        size="8x"
        style={{ marginBottom: 50 }}
      />

      <AuthForm />

      <div className="authOr" >or</div>
  
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
        <FontAwesomeIcon icon={faGoogle} />  Continue with Google
        </button>
      </div>
    </div>
    
  );
};

export default Auth;
