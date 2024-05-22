import React from "react";
import { useState, useContext } from "react";
import { auth, googleProvider } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../layout";

export const Login = () => {
    const [userLabel, setUserLabel] = useState(['Username', 'Email', 'Password', 'Log in', "Don't have an account? click here"]);
    const [userE, setUserE] = useState('')
    const [userCP, setUserCP] = useState('');
    const [userP, setUserP] = useState('');
    const [warningP, setWarningP] = useState('');

    const navigate = useNavigate();
    const context = useContext(AppContext);
    const [validationText, setValidationText] = useState(['Password or Email incorrect', '']);



    function createOrSignIn() {

        if (!userE.includes('@')) {
            const email = document.querySelector('.input_email');
            email.classList.toggle('is-invalid');
            return false;
        }

        if (userP.length < 6) {
            const password = document.querySelector('.input_password');
            password.classList.toggle('is-invalid');
            return false;
        }


        if (userLabel[0] == 'Username') {
            loginWithEmailAndPassword();
        } else {

            if (userCP != userP) {
                const password2 = document.querySelector('.input_password2');
                password2.classList.toggle('is-invalid');
                return false;
            }
            else {
                create_user();
            }

        }

    }


    const create_user = async () => {
        try {
            let response = await createUserWithEmailAndPassword(auth, userE, userP);
            create_user_layout();
            // console.log('Lets see what google create account return :');
         

        } catch (error) {
            alert(error.message);
        }
    }

    const loginWithEmailAndPassword = async () => {

        try {
            await signInWithEmailAndPassword(auth, userE, userP);
            var str = auth?.currentUser?.email;
            let usern = ' ' + str.substring(0, str.indexOf("@"));

            let user_cred = { id: auth.currentUser.getIdToken(), username: usern.toUpperCase() };

            context.setCurrentUser(user_cred);
            navigate('/characters')
        } catch (error) {
            const password = document.querySelector('.input_password');
            password.classList.add('is-invalid');
        }
    }


    const google_sign_in = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            // context.setCurrentUser(response);

            // var str = auth?.currentUser?.email;
            // let usern = ' ' + str.substring(0, str.indexOf("@"));
            // let user_cred = { id: auth.currentUser.getIdToken(), username: usern.toUpperCase() };
            // context.setCurrentUser(user_cred);

        } catch (error) {
            console.error(error);
        }
    }





    function create_user_layout() {
        setUserE('');
        setUserP('');
        setUserCP('');
        const email = document.querySelector('.input_email');
        email.classList.remove('is-invalid');
        const password = document.querySelector('.input_password');
        password.classList.remove('is-invalid');
        const password2 = document.querySelector('.input_password2');
        password2.classList.remove('is-invalid');
        if (userLabel[0] === 'Username') {
            let new_label = [' Confirm password', 'Create Email', ' Create Password', 'Create Account', "You have an account? Login"];
            setUserLabel(new_label);

            let valid = ['Password must be at least 8 characters', "Passwords don't match"];
            setValidationText(valid);

        }
        else {
            let valid = ['Password or Email incorrect', ""];
            setValidationText(valid);
            let new_label = ['Username', 'Email', 'Password', 'Log in', "Don't have an account? click here"];
            setUserLabel(new_label);
        }
    }


    return (

        <div className="login_div">

            <form>
                <h3>Login Here</h3>

                <label htmlFor="email">{userLabel[1]}</label>
                <input className="input_email" type="text" placeholder="Email or Phone" value={userE} id="email" onChange={(e) => setUserE(e.target.value)} />
                <div className="invalid-feedback">
                    Please choose a valid email
                </div>

                <label htmlFor="password">{userLabel[2]}</label>
                <input className="input_password" type="password" placeholder="Password" value={userP} onChange={(e) => setUserP(e.target.value)} />
                <div className="invalid-feedback">
                    {validationText[0]}
                </div>

                <label htmlFor="confirmPassword" style={userLabel[0] == 'Username' ? { display: 'none' } : { display: 'block' }}>{userLabel[0]}</label>
                <input className="input_password2" type="password" placeholder="Reenter password" style={userLabel[0] == 'Username' ? { display: 'none' } : { display: 'block' }} value={userCP} id="confirmPassword" onChange={(e) => setUserCP(e.target.value)} />
                <div className="invalid-feedback">
                    {validationText[1]}
                </div>

                <button type="button" className="login_button mb-2" onClick={() => createOrSignIn()}>{userLabel[3]}</button>
                <span onClick={() => create_user_layout()} id='newaccount_text'>  <p>{userLabel[4]}</p></span>
                <div className="social">
                    <div className="go"><span onClick={() => google_sign_in()}><i className="fab fa-google"></i>  Google</span></div>
                    <div className="fb"><span onClick={() => facebook_sign_in()}><i className="fab fa-facebook"></i>  Facebook</span></div>
                </div>

            </form>
        </div>
    );
}
