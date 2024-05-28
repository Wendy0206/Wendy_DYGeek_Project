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
	const [width, setWidth] = useState(window.innerWidth);

	// window.addEventListener('resize', (e) => console.log('THis is our window screen width now', window.innerWidth));

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



	function search_function(val) {
		setSearchVal(val.target.value);

		let search_val = val.target.value;

		if (search_val.length < 2) {
			let clear_search = [];
			setSearchRes(clear_search);
		}

		else {

			let newObj = { name: val.target.value };


			fetch('https://marvel-heroic-api-unlock-the-mcu-legendary-characters.p.rapidapi.com/name?q=' + newObj.name, {

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
				.catch(error => console.error(error));

		}


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
								<div class="search-box" >
									<button class="btn-search"><i class="fas fa-search"></i></button>
									<input class="input-search" placeholder="Search your character" type="search" value={searchVal} onChange={(e) => search_function(e)} />
								</div>

								<div className={searchVal.length > 2 ? "search_r_div" : "no_search"}>

									{searchRes.map((elm, ind) =>
										<span key={ind} className="dropdown-item text-light" onClick={() => lookup_character()} >{elm.name}</span>
									)}

								</div>
							</div>
							<button className="button-81 mx-2" type="submit" onClick={() => login_logout()}>
								<i className={context.currentUser.username == ' Login' ? "fa-regular fa-user" : "fa-solid fa-right-from-bracket"} ></i>{context.currentUser.username}</button>

						</div>


					</div>

				</div>
			</nav>




		</div>






		// <div className=" text-light px-4 mb-2" style={{ backgroundColor: "black" }}>

		// 	<div className="row pt-2 " >
		// 		<div className="col ">

		// 			<nav className="navbar navbar-light " >
		// 				<a className="nav_link"><i className="fa-brands fa-tiktok fa-xl"></i></a>
		// 				<a className="nav_link"><i className="fa-brands fa-instagram fa-xl"></i></a>
		// 				<a className="nav_link"><i className="fa-brands fa-facebook fa-xl"></i></a>
		// 				<a className="nav_link"><i className="fa-brands fa-x-twitter fa-xl"></i></a>
		// 				<a className="nav_link"><i className="fa-brands fa-youtube fa-xl"></i></a>
		// 			</nav>

		// 		</div>
		// 		<div className="col"></div>
		// 		<div className="col pt-2">

		// 			<div className="dropdown">
		// 				<input className="form-control mr-m-6 w-100 dropdown-toggle" type="search" value={searchVal} aria-label="Search" id="dropdownMenuButton" data-bs-toggle="dropdown" placeholder="Search your character" onChange={(e) => search_function(e)} />

		// 				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ backgroundColor: "black" }}>
		// 					{searchRes.map((elm, ind) =>
		// 						<span key={ind} className="dropdown-item text-light" onClick={() => lookup_character()} >{elm.name}</span>

		// 					)}


		// 				</div>
		// 			</div>

		// 		</div>
		// 		<div className="col-1 pt-2" id="log_div" >
		// 			<button className="btn btn-outline-light " type="submit" onClick={() => login_logout()}>
		// 				<i className={context.currentUser.username == ' Login' ? "fa-regular fa-user" : "fa-solid fa-right-from-bracket"} ></i>{context.currentUser.username}</button>
		// 		</div>
		// 	</div>

		// 	<div className="row">
		// 		<div className="col-4"></div>
		// 		<div className="col">
		// 			<img className="star_img" src={imglink} />
		// 		</div>
		// 		<div className="col-4"></div>

		// 	</div>

		// 	<div className="row dark">
		// 		<div className="col"></div>
		// 		<div className="col ">
		// 			<nav className="navbar navbar-expand-lg d-flex justif-content-between">


		// 				<div className="navbar-nav">
		// 					<ul>
		// 						<li><span className="nav_link  nav_test" >News</span></li>
		// 						<li><span className="nav_link nav_test" onClick={() => navigate('/')}>Characters</span></li>
		// 						<li><span className="nav_link nav_test" onClick={() => navigate('/events')}>Events</span></li>
		// 						<li><span className="nav_link nav_test" onClick={() => navigate('/series')}>Series</span></li>
		// 					</ul>

		// 				</div>

		// 			</nav>
		// 		</div>
		// 		<div className="col"></div>

		// 	</div>
		// </div>
	);
};
