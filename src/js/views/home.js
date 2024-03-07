import React from "react";
import { useState, useEffect, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../layout";

export const Home = () => {

	const context = useContext(AppContext);

	useEffect(() => {
		fetch('https://api.attackontitanapi.com/titans')
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as JSON
				return response.json();
			})
			.then(responseAsJson => {
				// Do stuff with the JSONified response
				//  console.log(responseAsJson);
				context.setListC(responseAsJson.results);
			})
			.catch(error => {
				console.log('Looks like there was a problem: \n', error);
			});

	}, []);



	function addFavorite(pos,el) {
		let newArray = [...context.favList];
		el.target.classList.add('testred');
		newArray.push(context.listC[pos]);
		context.setFavList(newArray);

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
								<span onClick={(e) => addFavorite(index,e)}><i id="liketest" class="fa-regular fa-heart fa-beat fa-xl"></i></span>
								
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
