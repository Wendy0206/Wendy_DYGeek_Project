import React from "react";
import { useState, useEffect, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/login.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../layout";

export const Login = () => {
    const [userN, setUserN] = useState('')
    const [userLabel, setUserLabel] = useState(['Username', 'Email', 'Password', 'Log in', "Don't have an account? click here"]);
    const [userU, setUserU] = useState('')
    const [userP, setUserP] = useState('')
    const [logInfo, setLogInfo] = useState([])
    const navigate = useNavigate();
    const context = useContext(AppContext);

    useEffect(() => {


    }, []);


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

                let test = [userN, userP]


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

                    })
                    .catch(error => alert(error));

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



    return (

        <div className="login_div">



            <form>
                <h3>Login Here</h3>

                <label htmlFor="username" style={userLabel[0] == 'Username' ? { display: 'none' } : { display: 'block' }}>{userLabel[0]}</label>
                <input type="" placeholder="username" style={userLabel[0] == 'Username' ? { display: 'none' } : { display: 'block' }} value={userU} id="username" onChange={(e) => setUserU(e.target.value)} />

                <label htmlFor="email">{userLabel[1]}</label>
                <input type="text" placeholder="Email or Phone" value={userN} id="email" onChange={(e) => setUserN(e.target.value)} />

                <label for="password">{userLabel[2]}</label>
                <input type="password" placeholder="Password" value={userP} id="password" onChange={(e) => setUserP(e.target.value)} />


                <button className="login_button mb-2" onClick={() => login_function()}>{userLabel[3]}</button>
                <span onClick={() => createNewUser()} id='newaccount_text'>  <p>{userLabel[4]}</p></span>
                <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                </div>

            </form>
        </div>
    );
}
