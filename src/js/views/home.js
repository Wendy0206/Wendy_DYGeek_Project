import React from "react";
import { useState, useContext } from "react";

import "../../styles/home.css";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../layout";

import md5 from "md5";

import image1 from '../../img/captain.jpg';
import image2 from '../../img/Sentri.jpg';
import image3 from '../../img/Doom.jpg';
import image4 from '../../img/Soldier.jpg';
import image5 from '../../img/Doctor_Strange.jpeg';

export const Home = () => {

	const context = useContext(AppContext);
	const navigate = useNavigate();


	return (

		<div className="container catalog_div">

			<h1 className="nothing_to_show">There is nothing to show here</h1>
		
		</div>
	);
}
