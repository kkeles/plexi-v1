import React, { useState, useContext } from 'react'
import { AccContext } from '../components/AWSactions/AccContext';
import SignupConfirm from "../components/pagelayouts/SignupConfirm"
import { Auth } from "aws-amplify";

const Signup = () => {
    const accContext = useContext(AccContext);
    const [email, setEmail] = [accContext.email, accContext.setEmail]
    const [password, setPassword] = useState("");
    const [name, setName] = [accContext.name, accContext.setName];
    const [signedUp, setSignedUp] = [accContext.signedUp, accContext.setSignedUp];

    const authenticate = async (event) => {
        event.preventDefault();
        try {
            setSignedUp(true);
            await Auth.signUp({
                username: email,
                password,
                attributes: {
                    name: name
                }
            });

        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    return (
        <React.Fragment>
            <form onSubmit={authenticate}>
                <label htmlFor="email">E-mail: </label>
                <input value={email} onChange={e => setEmail(e.target.value)} />
                <br />
                <label htmlFor="name">Name: </label>
                <input value={name} onChange={e => setName(e.target.value)} />
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <br />
                <button type="submit">Sign Up</button>
            </form>
            {signedUp ? <SignupConfirm /> : <div>Sign up first</div>}
        </React.Fragment>

    )
}

export default Signup;