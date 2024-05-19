import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";
import { AppContext } from "../layout";


export const Demo = () => {
const location =useLocation();
const data = location.state;
const context = useContext(AppContext);
const navigate = useNavigate();




	return (
		<div className="demo_div ">
			<div className="back_home">
				<button className="back_button" onClick={()=>navigate('/')}>Back home</button>
			</div>

			<div className=""></div>
				<div className="card h-25 card_demo" style={{width: "50%"}}>
			<img src={data.image} className="card-img-top img_demo" alt="..."/>
			<div className="card-body">
			  <h5 className="card-title">{data.name}</h5>
			  <p> Gender : Male<br/>
			 
			 Eye-Color :Brown</p>
		<div className="learn_like">
		<Link to="/">
		<button className="btn btn-outline-primary" >Go back</button>
		</Link>
		<span><i className="fa-regular fa-heart fa-xl"></i></span>
			  </div>
			</div>
		  </div>

			
		</div>
	);
};
