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
const [searchVal, setSearchVal]= useState('');
const [searchRes, setSearchRes]= useState([]);

function search_function(val){
	setSearchVal(val.target.value);

	let newArray = [...searchRes];
let newObj= {name:val.target.value};
newArray.push(newObj);
setSearchRes(newArray);

	// fetch('1https://gateway.marvel.com/v1/public/characters?ts=1&apikey=727378f140539c0b271e37b49cf9d9d6&hash=2f0a5da5cea5906c98b7a0005ee18982')
	// 		.then(res => {
	// 			if (!res.ok) throw Error(res.statusText);
	// 			return res.json();
	// 		})
	// 		.then(response => {
			
	// 			let newArray = [...response.data.results];
			
	// 			let newArray2 = [];
	// 			newArray.map((elm) => {
	// 				let each_elm = {}
	// 				each_elm.name = elm.name;
	// 				each_elm.id = elm.id;
					
	// 				newArray2.push(each_elm);
	// 			})
	// 			setSearchRes(newArray2);

	// 		})
	// 		.catch(error => console.error(error));



}





	return (
		<div className="demo_div ">
			<div className="back_home">
				<button className="back_button" onClick={()=>navigate('/')}>Back home</button>

				<div class="dropdown">
				<input className="form-control dropdown-toggle" type="search" value={searchVal}  id="dropdownMenuButton" data-bs-toggle="dropdown"  placeholder="Search your character"  aria-haspopup="true" aria-expanded="false" onChange={(e)=>search_function(e)}/>
  {/* <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button> */}
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
	{searchRes.map((elm)=>
	<a class="dropdown-item" href="#">{elm.name}</a>
	)}
  
    
  </div>
</div>



			</div>

			<div className=""></div>
				<div className="card h-25 card_demo" style={{width: "50%"}}>
			<img src={data.image} className="card-img-top img_demo" alt="..."/>
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
