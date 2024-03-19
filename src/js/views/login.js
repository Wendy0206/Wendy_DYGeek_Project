import React from "react";
import { useState, useEffect, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/login.css";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../layout";

export const Login = () => {
    const [userN, setUserN] = useState('')
    const [userP, setUserP] = useState('')
    const context = useContext(AppContext);

    useEffect(() => {


    }, []);

    function get_username(val) {
        let test = val.target.value;
        setUserN(test)
    }

    function get_password(val) {
        let test = val.target.value;
        setUserP(test)
    }


    function login_function() {

        if (userN.length > 5 && userP > 7) {


            fetch('https://api.attackontitanapi.com/characters')
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    // Read the response as JSON
                    return response.json();
                })
                .then(responseAsJson => {
                    // Do stuff with the JSONified response

                    context.setCurrentUser(responseAsJson.results);
                })
                .catch(error => {
                    console.log('Looks like there was a problem: \n', error);
                });
        }

        else {
            alert('Please enter a valid username and/or password')
        }
    }



    return (

        <div className="container">
            <form>
                <h3>Login Here</h3>

                <label for="username">Username</label>
                <input type="text" placeholder="Email or Phone" value={context.userP} id="username" onChange={(e) => get_username(e)} />

                <label for="password">Password</label>
                <input type="password" placeholder="Password" value={context.userP} id="password" onChange={(e) => get_password(e)} />

                <button onClick={() => login_function()}>Log In</button>
                <div class="social">
                    <div class="go"><i class="fab fa-google"></i>  Google</div>
                    <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
                </div>
            </form>

        </div>
    );
}
