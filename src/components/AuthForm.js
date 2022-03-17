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
            let errorMessage;
            if (errorCode === "auth/email-already-in-use") {
                errorMessage = "사용중인 이메일이에요.";
            } else if (errorCode === "auth/invalid-email") {
                errorMessage = "이메일 주소를 정확히 입력해주세요.";
            } else if (errorCode === "auth/operation-not-allowed") {
                errorMessage = "사용할 수 없는 이메일 혹은 비밀번호에요.";
            } else if (errorCode === "auth/weak-password") {
                errorMessage = "비밀번호가 너무 약해요.";
            } else if (errorCode === "auth/user-disabled") {
                errorMessage = "사용 중지된 계정이에요.";
            } else if (errorCode === "auth/user-not-found") {
                errorMessage = "존재하지 않는 이메일이에요.";
            } else if (errorCode === "auth/wrong-password") {
                errorMessage = "잘못된 비밀번호에요.";
            } else {
                errorMessage = "알 수 없는 오류가 발생했어요.";
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
                    value={email}
                    onChange={onChange}

                />
                <input
                    name="password"
                    className="authInput"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" className="authInput authSubmit" value={newAccount ? "Create Account" : "Log In"} />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
    )
}

export default AuthForm;