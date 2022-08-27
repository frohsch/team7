import React, { useState } from "react";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

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
            <form onSubmit={onSubmit} className="container">
                <input
                    name="email"
                    className="authInput"
                    type="text"
                    placeholder="Email"
                    required
                    defaultValue={email}
                    onChange={onChange}

                />
                <input
                    name="password"
                    className="authInput"
                    type="password"
                    placeholder="Password"
                    required
                    defaultValue={password}
                    onChange={onChange}
                />
                <input type="submit" className="authSubmit" value={newAccount ? "Create Account" : "Log In"} />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
    )
}

export default AuthForm;