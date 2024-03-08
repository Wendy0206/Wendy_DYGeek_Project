import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import imglink from "../../img/star_wars.png";
import rigoImage from "../../img/rigo-baby.jpg"

import { Context } from "../store/appContext";

import "../../styles/demo.css";



export const Demo = () => {
const location =useLocation();
const data = location.state;







	return (
		<div className="demo_div ">
			<div className="back_home">
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
			</div>
				<div class="card" style={{width: "50rem"}}>
			<img src={data.img} class="card-img-top" alt="..."/>
			<div class="card-body">
			  <h5 class="card-title">{data.name}</h5>
			  <p> Gender : Male<br/>
			 
			 Hair-Color : Black<br/>
			 Eye-Color :Brown</p>
		<div className="learn_like">
		<Link to="/">
		<button class="btn btn-outline-primary" >Go back</button>
		</Link>
		<span><i class="fa-regular fa-heart fa-xl"></i></span>
			  </div>
			</div>
		  </div>

			
		</div>
	);
};
