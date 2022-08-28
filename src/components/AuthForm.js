import React, { useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import { dbService } from "firebase_";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-botton: 10px;
    padding-bottom: 10px;
`

const AuthError = styled.span`
    color: tomato;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
`

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const auth = getAuth();

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                await createUserWithEmailAndPassword(auth, email, password);
				await dbService.collection("users").add({
					userId: auth.currentUser.uid,
					displayName: auth.currentUser.displayName,
					email: auth.currentUser.email,
					bio: ""
				});
				
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            const errorCode = error.code;
            console.log(errorCode);
            let errorMessage;
            if (errorCode === "auth/email-already-in-use") {
                errorMessage = "이미 가입함.";
            } else if (errorCode === "auth/invalid-email") {
                errorMessage = "invalid email.";
            } else if (errorCode === "auth/operation-not-allowed") {
                errorMessage = "operation not allowed.";
            } else if (errorCode === "auth/weak-password") {
                errorMessage = "password is too weak.";
            } else if (errorCode === "auth/user-disabled") {
                errorMessage = "사용 중지된 계정이에요.";
            } else if (errorCode === "auth/user-not-found") {
                errorMessage = "user not found.";
            } else if (errorCode === "auth/wrong-password") {
                errorMessage = "wrong password.";
            } else {
                errorMessage = "error.";
            }
            setError(errorMessage);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
            <form onSubmit={onSubmit}>
                <Container>
                    <input
                        name="email"
                        className="authInput"
                        type="text"
                        placeholder="Email"
                        required
                        defaultValue={email}
                        onChange={onChange}
                        style={{
                            width: "500px",
                            padding: "10px",
                            backgroundcolor: "rgba(255, 255, 255, 1)",
                            outline: "0.5px solid black",
                            marginbottom: "20px",
                            fontsize: "14px",
                            color: "black",
                        }}
                    />
                </Container>
                <Container>
                <input
                    name="password"
                    className="authInput"
                    type="password"
                    placeholder="Password"
                    required
                    defaultValue={password}
                    onChange={onChange}
                    style={{
                        width: "500px",
                        padding: "10px",
                        backgroundcolor: "rgba(255, 255, 255, 1)",
                        outline: "0.5px solid black",
                        marginbottom: "10px",
                        fontsize: "14px",
                        color: "black",
                    }}
                />
                </Container>
                <Container>
                <input 
                    type="submit" 
                    className="authSubmit" 
                    value={newAccount ? "Create Account" : "Log In"} 
                    style={{
                        width: "502px",
                        textalign: "center",
                        background: "#48ACFF",
                        color: "white",
                        margintop: "10px",
                        cursor: "pointer",
                    }}
                />
                {error && <AuthError>{error}</AuthError>}
                </Container>
            </form>
            <span onClick={toggleAccount} style={{
                color: "#48ACFF",
                cursor: "pointer",
                margintop: "20px",
                marginbottom: "10px",
                display: "block",
                fontsize: "15px",
                textdecoration: "underline"}}
            >
            {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
    )
}

export default AuthForm;