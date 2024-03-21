import React from "react";
import { useState, useEffect, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/login.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../layout";

export const Login = () => {
    const [userN, setUserN] = useState('')
    const [userP, setUserP] = useState('')
    const [logInfo, setLogInfo] = useState([])
    const navigate = useNavigate();
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

        if (userN.length > 5 && userP.length >5) {

        let test= [userN,userP]
      
        
        fetch('https://turbo-rotary-phone-g44w56q9gw943pw7w-3000.app.github.dev/user/login', {
                method: 'POST',
                body: JSON.stringify(test), 
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (!res.ok) throw Error(res.statusText);
                    return res.json();
                })
                .then(response => {
                    context.setCurrentUser(response);
                    navigate('/')
                
                } )
                .catch(error => alert(error));    
           
        }

        else {
            alert('Please enter a valid username and/or password')
            setUserN('')
            setUserP('')
        }
    }



    return (

        <div className="container">
       
                <h3>Login Here</h3>
         
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Email or Phone" value={userN} id="username" onChange={(e) => get_username(e)} />

                <label for="password">Password</label>
                <input type="password" placeholder="Password" value={userP} id="password" onChange={(e) => get_password(e)} />

                <button onClick={() => login_function()}>Log In</button>
                <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                </div>
            
              
        </div>
    );
}
