import React from "react";
import { Link } from "react-router-dom";
import imglink from "../../img/star_wars.webp";

export const Navbar = () => {
	return (
		<div className=" bg-dark text-light">
			<div className="row mt-4">
				<div className="col">
					<nav class="navbar navbar-light bg-dark justify-content-between">
						<a class="navbar-brand"><i class="fa-brands fa-tiktok fa-xl fa-xl"></i></a><a><i class="fa-brands fa-instagram fa-xl"></i></a>
						<a><i class="fa-brands fa-facebook"></i></a><a><i class="fa-brands fa-x-twitter fa-xl"></i></a> <a><i class="fa-brands fa-youtube fa-xl"></i></a>
						<div className="col-8"></div>
						<div className="col-1">

							<input class="form-control mr-sm-10" type="search" placeholder="Search" aria-label="Search" />

						</div>
						<div className="col-1">

							<button class="btn btn-outline-success mr-0" type="submit">Search</button>

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
				<div className="col-4"></div>
				<div className="col-4 mt-4">
					<nav class="navbar navbar-expand-lg bg-body-tertiary">
						<div class="container-fluid">
							<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
								<div class="navbar-nav">
									<a class="nav-link active" aria-current="page" href="#">News</a>
									<a class="nav-link" href="#">Video</a>
									<a class="nav-link" href="#">film</a>
									<a class="nav-link" href="#">Series</a>
									<a class="nav-link" href="#">Game</a>
									<a class="nav-link" href="#">Disney</a>

								</div>
							</div>
						</div>
					</nav>
				</div>
				<div className="col-4"></div>

			</div>
		</div>
	);
};
