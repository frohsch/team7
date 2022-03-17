import React from "react";
import { authService } from "fbase"
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from "firebase/auth";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faAnchor } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {

  const onSocialClick = async (event) => {
    const name = event.target.name;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faAnchor}
        color={"#94b1ff"}
        size="5x"
        style={{ marginBottom: 70 }}
      />
      <AuthForm />
      <div >
      <div className="authOr" >or</div>
      </div>
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
        <FontAwesomeIcon icon={faGoogle} />  Continue with Google
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
        <FontAwesomeIcon icon={faGithub} />  Continue with Github
        </button>
      </div>
      
      
    </div>
  );
};

export default Auth;