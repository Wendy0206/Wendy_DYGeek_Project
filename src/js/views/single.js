
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../layout";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Single = () => {

	const context = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {




	}, []);






	return (
		<div className="container catalog_div">

			<h1 className="nothing_to_show">There is nothing to show here</h1>

		</div>
	);
}

