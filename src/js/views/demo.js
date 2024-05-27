import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";
import { AppContext } from "../layout";
import { auth } from '../../config/firebase';
import { db } from "../../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';


export const Demo = () => {
	const location = useLocation();
	const data = location.state;
	const context = useContext(AppContext);
	const navigate = useNavigate();

	const [listing, setListing] = useState([{ name: 'cwekcmkcm;', age: 34 }]);

	useEffect(() => {



	}, []);





	return (
		<div className="demo_div ">
			<div className="back_home">
				<Link to="/">
					<button className="btn btn-primary">Back home</button>
				</Link>
			</div>
			<div className="card" style={{ width: "50rem" }}>
				<img src={data.image} className="card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">{data.name}</h5>
					<p> Gender : Male<br />

						Hair-Color : Black<br />
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
