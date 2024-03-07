
import React from "react";
import { useState, useEffect, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../layout";
import { Context } from "../store/appContext";

export const Single = () =>{
	
	const context= useContext(AppContext);

	

	function deletefavorite(pos){
	//	console.log('before deletion ',newArray);
		let newArray= context.favList.filter((element,index)=> index!=pos);
		context.setFavList(newArray);
		console.log('after deletion ', newArray);
		
	}



return (


<div className="demo_div ">
			<div className="back_home">
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
			</div>

	<div className="list_div">
		{context.favList.map((element, index)=>
			<div key={index} class="card" style={{width: "15rem"}}>
				<Link to={`/demo/${element.name}`} state={element}><img src={element.img} class="card-img-top" alt="..."/> </Link>
			
			<div class="card-body">
			  <h5 class="card-title">{element.name}</h5>
			  <p> Gender : Male <br/>
			 
		Hair-Color : Black<br/>
		Eye-Color :Brown</p>

		<div className="learn_like">
		<Link to={`/demo/${element.name}`}> <button class="btn btn-outline-primary" >Learn More</button></Link>
		<span onClick={()=> deletefavorite(index)}><i class="fa-solid fa-trash fa-bounce"></i></span>
			  </div>
			</div>
		  </div>
		)}
	</div>
	</div>
);
	}

