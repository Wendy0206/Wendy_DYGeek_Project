import React from "react";
import { Link } from "react-router-dom";
import imglink from "../../img/star_wars.png";
import rigoImage from "../../img/rigo-baby.jpg"
import "../../styles/home.css";

export const Navbar = () => {
	return (
		<div className=" text-light pt-2" style={{backgroundColor:"black"}}>
			<div className="row pt-2 " style={{backgroundColor:"black"}}>
				
				<div className="col">
					<nav class="navbar navbar-light " style={{backgroundColor:"black"}}>
						<a><i class="fa-brands fa-tiktok fa-xl"></i></a>
						<a><i class="fa-brands fa-instagram fa-xl"></i></a>
						<a><i class="fa-brands fa-facebook"></i></a>
						<a><i class="fa-brands fa-x-twitter fa-xl"></i></a> 
						<a><i class="fa-brands fa-youtube fa-xl"></i></a>
						<div className="col-7"></div>
						<div className="col-2">

							<input class="form-control mr-m-6 w-100" type="search" placeholder="Search" aria-label="Search" />

						</div>
						<div className="col-1">

							<button class="btn btn-outline-secondary mr-0" type="submit">Search</button>

						</div>
					</nav>
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
					<nav class="navbar navbar-expand-lg d-flex justif-content-between">
					
							<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div class="navbar-nav ">

									<a class="nav-link active " aria-current="page" href="#">News</a>
									<a class="nav-link" href="#">Video</a>
									<a class="nav-link " href="#">film</a>
									<a class="nav-link " href="#">Series</a>
									<a class="nav-link " href="#">Game</a>
									<a class="nav-link " href="#">Disney</a>

								</div>
								
							</div>
					
					</nav>
				</div>
				<div className="col"></div>

			</div>
		</div>
	);
};