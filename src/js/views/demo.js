import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import rigoImage from "../../img/rigo-baby.jpg";

import { Context } from "../store/appContext";

import "../../styles/demo.css";



export const Demo = () => {
const location =useLocation();
const data = location.state;
	return (
		<div className="container ">
			<div className="back_home">
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
			</div>
				<div class="card" style={{width: "50rem"}}>
			<img src={rigoImage} class="card-img-top" alt="..."/>
			<div class="card-body">
			  <h5 class="card-title">{data.name}</h5>
			  <p> Gender : {data.gender}<br/>
			 
			 Hair-Color : {data.hair_color}<br/>
			 Eye-Color : {data.eye_Color}</p>
		<div className="learn_like">
		<button class="btn btn-outline-primary" >Learn More</button>
		<span><i class="fa-regular fa-heart fa-xl"></i></span>
			  </div>
			</div>
		  </div>

			
		</div>
	);
};
