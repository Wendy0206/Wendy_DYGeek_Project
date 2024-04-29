import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import imglink from  "../../img/GeekZ.png";

import "../../styles/home.css";
import { AppContext } from "../layout";

export const Navbar = () => {
	const context = useContext(AppContext);
    const navigate= useNavigate();

	return (
		<div className=" text-light pt-2 px-4" style={{backgroundColor:"black"}}>
			<div className="row pt-2 " style={{backgroundColor:"black"}}>
				
				<div className="col ">
					<nav className="navbar navbar-light " style={{backgroundColor:"black"}}>
						<a><i className="fa-brands fa-tiktok fa-xl"></i></a>
						<a><i className="fa-brands fa-instagram fa-xl"></i></a>
						<a><i className="fa-brands fa-facebook"></i></a>
						<a><i className="fa-brands fa-x-twitter fa-xl"></i></a> 
						<a><i className="fa-brands fa-youtube fa-xl"></i></a>
						</nav>
						</div>
						<div className="col-6"></div>
						<div className="col-2">

							<input className="form-control mr-m-6 w-100" type="search" placeholder="Search" aria-label="Search" />

						</div>
						<div className="col-1 " id="log_div" >
                       
							<button className="btn btn-outline-light " type="submit" onClick={()=> navigate('/login')}><i className="fa-regular fa-user"></i>{context.currentUser.user}</button>
						
						</div>
					
				


			</div>

			<div className="row">
				<div className="col-4"></div>
				<div className="col">
				<img className="star_img" src={imglink}/>			
				</div>
				<div className="col-4"></div>
			
			
			</div>

			<div className="row dark">
				<div className="col"></div>
				<div className="col ">
					<nav className="navbar navbar-expand-lg d-flex justif-content-between">
					
							<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">

									
									<a className="nav-link text-secondary"  href="#">News</a>
									<a className="nav-link text-secondary nav_test"  href="#">Characters</a>
									<a className="nav-link  text-secondary" href="#">Movies</a>
									<a className="nav-link  text-secondary " href="#">Series</a>
									<a className="nav-link  text-secondary " href="#">Events</a>
									

								</div>
								
							</div>
					
					</nav>
				</div>
				<div className="col"></div>

			</div>
		</div>
	);
};
