import React from "react";
import { useState, useContext } from "react";
import { auth, googleProvider } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../layout";

export const Login = () => {
    const [userN, setUserN] = useState('')
    const [userLabel, setUserLabel] = useState(['Username', 'Email', 'Password', 'Log in', "Don't have an account? click here"]);
    const [userU, setUserU] = useState('');
    const [userP, setUserP] = useState('');

    const navigate = useNavigate();
    const context = useContext(AppContext);




    function createOrSignIn() {
        if (userN.includes('@') && userP.length > 7) {
            if (userLabel[0] == 'Username') {
                loginWithEmailAndPassword();
            } else {
                create_user();
            }

        }
        else {
           const email= document.querySelector('input_email');
           const password= document.querySelector('input_password');
           alert('please provide a valid email or password');
        }

    }


    const create_user = async () => {
        try {
            let response = await createUserWithEmailAndPassword(auth, userN, userP);
            console.log('Lets see what google create account return :');
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

const loginWithEmailAndPassword = async () => {
    
        try {
            let response = await signInWithEmailAndPassword(auth, userN, userP);
            console.log('Lets see what google sign in with email returns :');
            console.log(response);
        } catch (error) {
            console.log(error);
        }
}


const pop_up_sign_in = async () => {
    try {
        let response = await signInWithPopup(auth, googleProvider);
        // context.setCurrentUser(response);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}





function create_user_layout() {
    if (userLabel[0] === 'Username') {
        let new_label = [' Create Username', 'Create Email', ' Create Password', 'Create Account', "You have an account? Login"];
        setUserLabel(new_label);
    }
    else {
        let new_label = ['Username', 'Email', 'Password', 'Log in', "Don't have an account? click here"];
        setUserLabel(new_label);
    }
}


return (

    <div className="login_div">

        <form>
            <h3>Login Here</h3>

            <label htmlFor="username" style={userLabel[0] == 'Username' ? { display: 'none' } : { display: 'block' }}>{userLabel[0]}</label>
            <input type="" placeholder="username" style={userLabel[0] == 'Username' ? { display: 'none' } : { display: 'block' }} value={userU} id="username" onChange={(e) => setUserU(e.target.value)} />

            <label htmlFor="email">{userLabel[1]}</label>
            <input className="input_email" type="text" placeholder="Email or Phone" value={userN} id="email" onChange={(e) => setUserN(e.target.value)} />
            <div class="invalid-feedback">
                Please choose a valid email
            </div>
            <label htmlFor="password">{userLabel[2]}</label>
            <input className="input_password" type="password" placeholder="Password" value={userP} id="password" onChange={(e) => setUserP(e.target.value)} />
            <div class="invalid-feedback">
                Password must be at least 8 characters.
            </div>

            <button className="login_button mb-2" onClick={() => createOrSignIn()}>{userLabel[3]}</button>
            <span onClick={() => create_user_layout()} id='newaccount_text'>  <p>{userLabel[4]}</p></span>
            <div className="social">
                <div className="go"><span onClick={() => google_sign_in()}><i className="fab fa-google"></i>  Google</span></div>
                <div className="fb"><span onClick={() => facebook_sign_in()}><i className="fab fa-facebook"></i>  Facebook</span></div>
            </div>

        </form>
    </div>
);
}
