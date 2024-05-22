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
			
		fetch('https://marvel-heroic-api-unlock-the-mcu-legendary-characters.p.rapidapi.com/name?q='+data.name, {

		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'b7d8c24116msh18d47855c91a4c6p129b19jsn25ca23c193e6',
			'X-RapidAPI-Host': 'marvel-heroic-api-unlock-the-mcu-legendary-characters.p.rapidapi.com'
		}

	})
		
		.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => {

				let newArray = [...response];
				console.log('Lets see if our character gets through');
				console.log(newArray);
				let newArray2 = [];
				newArray.map((elm) => {
					each_elm.name = elm.name;
					each_elm.id = elm.id;
					each_elm.image = elm.thumbnail.path+'.'+ elm.thumbnail.extension;
					each_elm.powers = [...elm.powers];
					each_elm.description = (elm.description.length>5)? elm.description : 'Unfortunately there is no description here...'
					each_elm.series = elm.series.available;
		})
				// setListC(newArray2);
			})
			.catch(error => console.error(error));



	}, []);





	return (
		<div className="demo_div ">
		<div className="back_home">
		<Link to="/">
			<button className="btn btn-primary">Back home</button>
		</Link>
		</div>
			<div className="card" style={{width: "50rem"}}>
		<img src={data.img} className="card-img-top" alt="..."/>
		<div className="card-body">
		  <h5 className="card-title">{data.name}</h5>
		  <p> Gender : Male<br/>
		 
		 Hair-Color : Black<br/>
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
