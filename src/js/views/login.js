import React from "react";
import { useState, useEffect, useContext } from "react";
import { auth, googleProvider } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
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

    console.log(auth?.currentUser?.email)

    const fetch_newUser = async () => {
if(userN.includes('@') && userP.length>7)
    {
        try{
            await createUserWithEmailAndPassword(auth, userN, userP);
         
        }catch(error){
            console.log(error);
        }
      

    }   
    else{
        console.log('Please a valid email or password');
    }  

    }


    const pop_up_sign_in = async () => {
                try{
                    await signInWithPopup(auth, googleProvider);
                    context.setCurrentUser(response);
                }catch(error){
                    console.error(error);
                }
              
        
            } 


            

    const sign_out = async () => {
        try{
            await signOut(auth);
           
        }catch(error){
            console.error(error);
        }

    } 

    function createNewUser() {

        if (userLabel[0] === 'Username') {
            let new_label = [' Create Username', 'Create Email', ' Create Password', 'Create Account', "You have an account? Login"];
            setUserLabel(new_label);

        }
        else {
            let new_label = ['Username', 'Email', 'Password', 'Log in', "Don't have an account? click here"];
            setUserLabel(new_label);

        }
    }




    function login_function() {
        if (userLabel[0] == 'Username') {

            if (userN.length > 5 && userP.length > 5) {
                console.log(auth.currentUser.email)
                let test = [userN, userP];


                // fetch('https://turbo-rotary-phone-g44w56q9gw943pw7w-3000.app.github.dev/user/login', {
                //     method: 'POST',
                //     body: JSON.stringify(test),
                //     headers: {
                //         'Content-Type': 'application/json'
                //     }
                // })
                //     .then(res => {
                //         if (!res.ok) throw Error(res.statusText);
                //         return res.json();
                //     })
                //     .then(response => {
                //         context.setCurrentUser(response);
                //         navigate('/')

                //     })
                //     .catch(error => alert(error));

            }

            else {
                alert('Please enter a valid username and/or password')
                setUserN('')
                setUserP('')
            }
        }
        else {
            let test = ['Username', 'Email', 'Password', 'Log in'];
            setUserLabel(test)
            if (userN.length > 5 && userP.length > 5 && userU.length > 5) {
                fetch_newUser();
            }
            else {
                alert('Please enter a valid username, email and/or password')
                setUserN('')
                setUserP('')
                setUserU('')
            }




        }
        function fetch_newUser() {

            let testArray = [userU, userN, userP];
            fetch('https://turbo-rotary-phone-g44w56q9gw943pw7w-3000.app.github.dev/user/new', {
                method: 'POST',
                body: JSON.stringify(testArray),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (!res.ok) throw Error(res.statusText);
                    return res.json();
                })
                .then(response => console.log('Success:', response))
                .catch(error => console.error(error));



        }


    }

    function google_login_function() {


    }


    return (

        <div className="login_div">

            <form>
                <h3>Login Here</h3>

                <label htmlFor="username" style={userLabel[0] == 'Username' ? { display: 'none' } : { display: 'block' }}>{userLabel[0]}</label>
                <input type="" placeholder="username" style={userLabel[0] == 'Username' ? { display: 'none' } : { display: 'block' }} value={userU} id="username" onChange={(e) => setUserU(e.target.value)} />

                <label htmlFor="email">{userLabel[1]}</label>
                <input type="text" placeholder="Email or Phone" value={userN} id="email" onChange={(e) => setUserN(e.target.value)} />

                <label htmlFor="password">{userLabel[2]}</label>
                <input type="password" placeholder="Password" value={userP} id="password" onChange={(e) => setUserP(e.target.value)} />


                <button className="login_button mb-2" onClick={() => fetch_newUser()}>{userLabel[3]}</button>
                <span onClick={() => createNewUser()} id='newaccount_text'>  <p>{userLabel[4]}</p></span>
                <div className="social">
                    <div className="go"><span><i className="fab fa-google"></i>  Google</span></div>
                    <div className="fb"><span><i className="fab fa-facebook"></i>  Facebook</span></div>
                </div>

            </form>
        </div>
    );
}
