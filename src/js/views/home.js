import React from "react";
import { useState, useEffect, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../layout";

export const Home = () => {

	const context = useContext(AppContext);

	useEffect(() => {
		fetch('https://api.attackontitanapi.com/characters')
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as JSON
				return response.json();
			})
			.then(responseAsJson => {
				// Do stuff with the JSONified response
			
				context.setListC(responseAsJson.results);
                if (context.currentUser.id!=null){
					
				}
		

			})
			.catch(error => {
				console.log('Looks like there was a problem: \n', error);
			});

	}, []);

	
		





	function addFavorite(elm,pos) {
		let newArray2 = context.favList.find((element) => element==elm);

		if(!newArray2){
			let newArray = [...context.favList];
	
			newArray.push(context.listC[pos]);
			context.setFavList(newArray);
		}
		else{
			
			let newArray= context.favList.filter((element,index)=> element!=elm);
			context.setFavList(newArray);
	
		}
		

	}


	
	return (

		<div className="container">
			<div className="seefavorite">
				<Link to="/single">
					<button class="back_button" >Favorites <span className="suptest">{context.favList.length}</span> </button>
				</Link>
			</div>
			<div className="list_div">
				{context.listC.map((element, index) =>
					<div key={index} class="card" style={{ width: "15rem" }}>
						<Link to={`/demo/${element.name}`} state={element}><img src={element.img} class="card-img-top" alt="..." /> </Link>

						<div class="card-body">
							<h5 class="card-title">{element.name}</h5>
							<p> Gender : Male <br />

								Hair-Color : Black<br />
								Eye-Color :Brown</p>

						
							<div className="learn_like">
								<Link to={`/demo/${element.name}`} state={element}> <button class="learn_button" >Learn More</button></Link>
								<span onClick={() => addFavorite(element, index)}><i  class={context.favList.includes(element)? "fa-solid fa-heart fa-bounce fa-xl testred" : "fa-regular fa-heart fa-bounce " }></i></span>
								
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
