import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import imglink from "../../img/DyGeek.png";

import { auth, googleProvider } from '../../config/firebase';
import { signOut } from "firebase/auth";


import "../../styles/navbar.css";
import { AppContext } from "../layout";

export const Navbar = () => {
	const context = useContext(AppContext);
	const navigate = useNavigate();
	const [searchVal, setSearchVal] = useState('');
	const [searchRes, setSearchRes] = useState([]);

	function login_logout() {

		if (context.currentUser.username == ' Login') {
			navigate('/login');
		}
		else {
			sign_out();


		}
	}


	const sign_out = async () => {
		try {
			await signOut(auth);
			let userObj = { id: null, username: ' Login' };
			context.setCurrentUser(userObj);
			navigate('/login');

		} catch (error) {
			console.error(error);
		}
	}



	const search_function = (val) => {

		setSearchVal(val.target.value);
		let search_val = val.target.value;
		if (search_val.length < 2) {
			let clear_res=[]
			setSearchRes(clear_res);
			return;
		}

		else {
			search_characters(val.target.value);
			
		}


	}


	const search_characters = (name) => {
		fetch('https://marvel-heroic-api-unlock-the-mcu-legendary-characters.p.rapidapi.com/name?q=' + name, {

			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'b7d8c24116msh18d47855c91a4c6p129b19jsn25ca23c193e6',
				'X-RapidAPI-Host': 'marvel-heroic-api-unlock-the-mcu-legendary-characters.p.rapidapi.com'
			}

		})
			.then(res => {
				if (!res.ok) {

					let newArray = [{ name: 'No matching characters found' }];
					setSearchRes(newArray);

				}
				return res.json();

			})
			.then(response => {

				let newArray = [];

				response.map((elm) => {
					let each_elm = {}
					each_elm.name = elm.name;
					each_elm.id = elm.id;
					each_elm.description = elm.description;
					//	each_elm.image=
					// each_elm.quote= elm.quote[0];	
					newArray.push(each_elm);
				})

					setSearchRes(newArray);
			
			})
			.catch(error => { return false });
	}

	const expand_search=()=>{
	let open_search=	document.querySelector('.input-search');
	open_search.classList.toggle('.input_expand');
	}


	return (


		<div className="">



			<nav class="navbar navbar-expand-lg navbar-light bg-dark w-100 mb-3">
				<h1 class="brand_text">DyGeek</h1>
				<img className="img_brand" src={imglink} />
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse collapse_div" id="navbarNav">
					<div className="route_div">

						<div className="navbar-nav">
							<ul className="ul_nav">
								<li><span className="  nav_test" >News</span></li>
								<li><span className=" nav_test" data-bs-toggle="collapse" onClick={() => navigate('/')}>Characters</span></li>
								<li><span className="nav_link nav_test" onClick={() => navigate('/events')}>Events</span></li>
								<li><span className="nav_link nav_test" onClick={() => navigate('/series')}>Series</span></li>
							</ul>

						</div>
						<div className="search_l_div" >

							<div className="search_login_div">
								<div class="search-box " >
									<button class="btn-search" onClick={()=> expand_search()}><i class="fas fa-search"></i></button>
									<input class="input-search" placeholder="Search your character" type="search" value={searchVal} onChange={(e) => search_function(e)} />
								</div>

								<div className={searchVal.length > 2 ? "search_r_div" : "no_search"}>

									{searchRes.map((elm, ind) =>
										<span key={ind} className="dropdown-item text-light" onClick={() => lookup_character()} >{elm.name}</span>
									)}

								</div>
							</div>
							<button className="button-81 mx-3" type="submit" onClick={() => login_logout()}>
								<i className={context.currentUser.username == ' Login' ? "fa-regular fa-user" : "fa-solid fa-right-from-bracket"} ></i>{context.currentUser.username}</button>

						</div>


					</div>

				</div>
			</nav>




		</div>



	);
};
