import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import imglink from "../../img/GeekZ.png";

import "../../styles/navbar.css";
import { AppContext } from "../layout";

export const Navbar = () => {
	const context = useContext(AppContext);
	const navigate = useNavigate();
	const [searchVal, setSearchVal]= useState('');
	const [searchRes, setSearchRes]= useState([]);



	function search_function(val){
		let clear_res=[];
		setSearchRes(clear_res);
		let search_val=val.target.value;
		
	if(search_val.length>3){
		
		let newArray = [...searchRes];
		let newObj= {name:val.target.value};
		newArray.push(newObj);
		
	
	
		fetch('https://marvel-heroic-api-unlock-the-mcu-legendary-characters.p.rapidapi.com/name?q='+newObj.name,{
	
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'b7d8c24116msh18d47855c91a4c6p129b19jsn25ca23c193e6',
				'X-RapidAPI-Host': 'marvel-heroic-api-unlock-the-mcu-legendary-characters.p.rapidapi.com'
			}
	
		})
				.then(res => {
					if (!res.ok) {
					
						console.log('Not found check if it was called :');
						let newArray = [{name:'No matching characters found'}];
						setSearchRes(newArray);
						setSearchVal('');
				
					}
					return res.json();
					
				})
				.then(response => {
				
					let newArray = [];
					
			
					response.map((elm) => {
						let each_elm = {}
						each_elm.name = elm.name;
						each_elm.id = elm.id;
						each_elm.description= elm.description;
					//	each_elm.image=
					// each_elm.quote= elm.quote[0];	
						newArray.push(each_elm);
					})
					console.log('Do we really get this character or? ');
					console.log(newArray);
					setSearchRes(newArray);
	
				})
				.catch(error => console.error(error));
	
			}
			setSearchVal(val.target.value);
	
	}
	
	function lookup_character(){
		
	}
	
	

	return (
		<div className=" text-light pt-2 px-4 mb-2" style={{ backgroundColor: "black" }}>
			<div className="row pt-2 " style={{ backgroundColor: "black" }}>

				<div className="col ">
					<nav className="navbar navbar-light " style={{ backgroundColor: "black" }}>
						<a className="nav_link"><i className="fa-brands fa-tiktok fa-xl"></i></a>
						<a className="nav_link"><i className="fa-brands fa-instagram fa-xl"></i></a>
						<a className="nav_link"><i className="fa-brands fa-facebook fa-xl"></i></a>
						<a className="nav_link"><i className="fa-brands fa-x-twitter fa-xl"></i></a>
						<a className="nav_link"><i className="fa-brands fa-youtube fa-xl"></i></a>
					</nav>
				</div>
				<div className="col-6"></div>
				<div className="col-2">

					{/* <input className="form-control mr-m-6 w-100" type="search" placeholder="Search" aria-label="Search" /> */}
					<div class="dropdown">
				<input className="form-control mr-m-6 w-100 dropdown-toggle" type="search" value={searchVal} aria-label="Search" id="dropdownMenuButton" data-bs-toggle="dropdown"  placeholder="Search your character"  aria-haspopup="true" aria-expanded="false" onChange={(e)=>search_function(e)}/>
 
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
	{searchRes.map((elm, ind)=>
	<span  key={ind} class="dropdown-item" onClick={()=>lookup_character()} >{elm.name}</span>
	)}
  
    
  </div>
</div>



				</div>
				<div className="col-1 mt-3 ml3" id="log_div" >
					<button className="btn btn-outline-light " type="submit" onClick={() => navigate('/login')}>
						<i className="fa-regular fa-user"></i>{context.currentUser.user}</button>
				</div>

			</div>

			<div className="row">
				<div className="col-4"></div>
				<div className="col">
					<img className="star_img" src={imglink} />
				</div>
				<div className="col-4"></div>

			</div>

			<div className="row dark">
				<div className="col"></div>
				<div className="col ">
					<nav className="navbar navbar-expand-lg d-flex justif-content-between">

						<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
							<div className="navbar-nav">
								<ul>
									<li><span className="nav_link  nav_test" onClick={() => navigate('/')}>News</span></li>
									<li><span className="nav_link nav_test" onClick={() => navigate('/characters')}>Characters</span></li>
									<li><span className="nav_link nav_test" onClick={() => navigate('/events')}>Events</span></li>
									<li><span className="nav_link nav_test" onClick={() => navigate('/series')}>Series</span></li>
								</ul>

							</div>

						</div>

					</nav>
				</div>
				<div className="col"></div>

			</div>
		</div>
	);
};
