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
				let test = []
				let final = []


				test = [...responseAsJson.results];
				test.forEach((elm) => {

					let test2 = {
						id: elm.id,
						name: elm.name,
						img: elm.img
					}
					final.push(test2)
				})
				context.setListC(final);


			})
			.catch(error => {
				console.log('Looks like there was a problem: \n', error);
			});


	}, []);




	function addFavorite(elm, pos) {
		let newArray2 = context.favList.find((element) => element == elm);

		if (!newArray2) {
			let newArray = [...context.favList];

			newArray.push(context.listC[pos]);
			context.setFavList(newArray);
			fetch_add_fav(context.listC[pos].id);

		}
		else {

			let newArray = context.favList.filter((element, index) => element != elm);
			fetch_remove_fav(context.listC[pos].id)
			context.setFavList(newArray);

		}
	}

	function fetch_add_fav(fav) {
		let testArray = [context.currentUser.id, fav];
	
		console.log('char id to add '+fav)
		fetch('https://turbo-rotary-phone-g44w56q9gw943pw7w-3000.app.github.dev/user/'+ context.currentUser.id +'/favorite/'+fav+'/t', {
			method: 'POST', // or 'POST'
			body: JSON.stringify(testArray),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => console.log('Success:', response))
			.catch(error => console.error(error));


	}

	function fetch_remove_fav(fav) {
		let testArray = [context.currentUser.id, fav];
		fetch('https://turbo-rotary-phone-g44w56q9gw943pw7w-3000.app.github.dev/user/' + context.currentUser.id + '/favorite/' + fav+'/h', {
			method: 'DELETE', // or 'POST'
			body: JSON.stringify(testArray),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => console.log('Success:', response))
			.catch(error => console.error(error));


	}




return (

	<div className="container">
		<div className="seefavorite">
			<Link to="/single">
				<button className="back_button" >Favorites <span className="suptest">{context.favList.length}</span> </button>
			</Link>
		</div>
		<div className="list_div">
			{context.listC.map((element, index) =>
				<div key={index} className="card" style={{ width: "15rem" }}>
					<Link to={`/demo/${element.name}`} state={element}><img src={element.img} className="card-img-top" alt="..." /> </Link>

					<div className="card-body">
						<h5 className="card-title">{element.name}</h5>
						<p> Gender : Male <br />

							Hair-Color : Black<br />
							Eye-Color :Brown</p>


						<div className="learn_like">
							<Link to={`/demo/${element.name}`} state={element}> <button className="learn_button" >Learn More</button></Link>
							<span onClick={() => addFavorite(element, index)}><i className={context.favList.includes(element) ? "fa-solid fa-heart fa-bounce fa-xl testred" : "fa-regular fa-heart fa-bounce "}></i></span>

						</div>
					</div>
				</div>
			)}
		</div>
	</div>
);
}
