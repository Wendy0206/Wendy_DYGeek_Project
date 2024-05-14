import React from "react";
import {useEffect, useContext } from "react";

import "../../styles/home.css";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../layout";


import image1 from '../../img/captain.jpg';
import image2 from '../../img/Sentri.jpg';
import image3 from '../../img/Doom.jpg';
import image4 from '../../img/Soldier.jpg';
import image5 from '../../img/Doctor_Strange.jpeg';

export const Characters = () => {

	const context = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {

			fetch('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=727378f140539c0b271e37b49cf9d9d6&hash=2f0a5da5cea5906c98b7a0005ee18982')
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => {
			
				let newArray = [...response.data.results];
			
				let newArray2 = [];
				newArray.map((elm) => {
					let each_elm = {}
					each_elm.name = elm.name;
					each_elm.id = elm.id;
					each_elm.image = elm.thumbnail.path+'.'+ elm.thumbnail.extension;
					each_elm.comics = elm.comics.available;
					each_elm.description = (elm.description.length>5)? elm.description.slice(0,40) + '...' : 'Unfortunately there is no description here...'
					each_elm.series = elm.series.available;

					newArray2.push(each_elm);
				})
				context.setListC(newArray2);

			})
			.catch(error => console.error(error));


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

		console.log('char id to add ' + fav)
		fetch('https://turbo-rotary-phone-g44w56q9gw943pw7w-3000.app.github.dev/user/' + context.currentUser.id + '/favorite/' + fav + '/t', {
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
		fetch('https://turbo-rotary-phone-g44w56q9gw943pw7w-3000.app.github.dev/user/' + context.currentUser.id + '/favorite/' + fav + '/h', {
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



	const sortName = (a, b) => {
		let nameA = a.name.toUpperCase();
		let nameB = b.name.toUpperCase();
		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
	}


	const sortComics = (a, b) => a.comics - b.comics;
	const sortSeries = (a, b) => a.series - b.series;

	function filter_listing_function(val) {
		var test = [...context.listC];
		if (val == 1) {
			var final = test.toSorted(sortName);
		}
		else if (val == 2) {
			var final = test.toSorted(sortComics);
		}
		else if (val == 3) {
			var final = test.toSorted(sortSeries);	
		} 
		context.setListC(final);
	}


	

	return (

		<div className="container catalog_div">

			<div className=" d-flex justify-content-between pt-2">
				<div className="dropdown text-start ">
					<button
						className="fav_button px-3 dropdown-toggle"
						type="button"
						id="dropdownMenuButton"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						{/* <i className="fa-solid fa-sliders fa-2xl"></i> */}
						Filter
					</button>
					<ul className="dropdown-menu text-lg" role='button' aria-labelledby="dropdownMenuButton">
						<li><span className="dropdown-item" onClick={() => filter_listing_function(1)}>Name (A-Z)</span></li>
						<li><span className="dropdown-item" onClick={() => filter_listing_function(2)}>Comics (High-Low)</span></li>
						<li><span className="dropdown-item" onClick={() => filter_listing_function(3)}>Series (High-Low)</span></li>

					</ul>
				</div>

				<button className="fav_button" onClick={() => navigate("/single")}>Favorites <span className="suptest">{context.favList.length}</span> </button>

			</div>

			<div className="slideshow3">
				<img className="img_sl" src={image1} />
				<img className=" img_sl" src={image2} />
				<img className=" img_sl" src={image3} />
				<img className=" img_sl" src={image4} />
				<img className=" img_sl" src={image5} />

			</div>


			<div className="list_div">



				{context.listC.map((element, index) =>
					<div key={index} className="card" style={{ width: "15rem", height:"" }}>
						<img src={element.image} className="card-img-top card_img" alt="..." />

						<div className="card-body h-50">
							<div className="card_center_div">
							<h5 className="card-title">{element.name}</h5>
							<p>Comics :{element.comics} <br />
								Series: {element.series}		<br />
								Description : {element.description}</p>

								</div>
							<div className="learn_like">
								<Link to={`/demo/${element.name}`} state={element}> 
								<button className="learn_button" >Learn More</button>
								</Link>

								<span onClick={() => addFavorite(element, index)}><i className={context.favList.includes(element) ? "fa-solid fa-heart fa-bounce fa-2xl testred" : "fa-regular fa-heart fa-2xl fa-bounce "}></i></span>

							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);

}

