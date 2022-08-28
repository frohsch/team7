import React from "react";
import { authService, dbService } from "../firebase_"
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
import styled from "styled-components";

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10vh 0 0 0;
  justify-content: center;
  align-items: center;
`

const AuthOr = styled.div`
  width: 100%;
  color: black;
  cursor: default;
  margin-top: 10px;
  display: flex;
  font-size: 14px;
  text-shadow: 0 1px fade(#FFF, 40%);
  width: 530px;
  justify-content: center;
  align-items: center;
`

const AuthBtns = styled.div`
margin-top: 30px;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 500px;
`

const Auth = () => {

  //소셜 로그인 버튼 클릭시
  const onSocialClick = async (event) => {
    const name = event.target.name;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    await signInWithPopup(authService, provider).then((result) => {
		if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime){
			console.log("new");
			console.log(result);
			dbService.collection("users").add({
				userId: result.user.uid,
				displayName: result.user.displayName,
				email: result.user.email,
				bio: ""
			});
		}
	});

  };

  return (
    <AuthContainer>
      <FontAwesomeIcon
        icon={faLemon}
        color={"#48ACFF"}
        size="8x"
        style={{ marginBottom: 50 }}
      />

      <AuthForm />
      <AuthOr>or</AuthOr>

      <AuthBtns>
        <button 
          onClick={onSocialClick} 
          name="google" 
          className="authBtn"
          style={{
            cursor: "pointer",
            margin: "0px",
            fontsize: "14px",
            width: "500px",
            padding: "10px 20px",
            border: "0.5px solid black",
            textalign: "center",
            backgroundcolor: "white",
            color: "black",
          }}
        >
        <FontAwesomeIcon icon={faGoogle} />  Continue with Google
        </button>
      </AuthBtns>
    </AuthContainer>

  );
};

export default Auth;
