import React from "react";
import { useState, useEffect, useContext } from "react";

import "../../styles/home.css";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../layout";

import md5 from "md5";

import image1 from '../../img/captain.jpg';
import image2 from '../../img/Sentri.jpg';
import image3 from '../../img/Doom.jpg';
import image4 from '../../img/Soldier.jpg';
import image5 from '../../img/Doctor_Strange.jpeg';

export const Events = () => {

	const context = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {



		fetch('https://gateway.marvel.com/v1/public/events?ts=1&apikey=727378f140539c0b271e37b49cf9d9d6&hash=2f0a5da5cea5906c98b7a0005ee18982')
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => {
				console.log('Our test starts here, lets see :');

				let newArray = [...response.data.results];

				let newArray2 = [];
				newArray.map((elm) => {
					let each_elm = {}
					each_elm.title = elm.title;
					each_elm.id = elm.id;
					each_elm.image = elm.thumbnail.path + '.' + elm.thumbnail.extension;
					each_elm.description = (elm.description != null) ? elm.description.slice(0, 50) + '...' : 'Unfortunately there is no description on this one...'
					each_elm.start = (elm.start == null) ? 'Unknown' : elm.start.slice(0,11);

					newArray2.push(each_elm);
				})
				console.log('Our events test starts here, check this :');
				console.log(newArray2);
				context.setListEvents(newArray2);


			})
			.catch(error => console.error(error));


	}, []);

	const sortTitle = (a, b) => {
		let nameA = a.title.toUpperCase();
		let nameB = b.title.toUpperCase();
		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
	}

	const sortDate = (a, b) => {
		let dateA = a.start.toUpperCase();
		let dateB = b.start.toUpperCase();
		if (dateA < dateB) return -1;
		if (dateA > dateB) return 1;
	  }
	

	  function filter_listing_function(val) {
		var test = [...context.listEvents];
		if (val == 1) {
			var final = test.toSorted(sortTitle);
		}
		else {
			var final = test.toSorted(sortDate);
		}
		context.setListEvents(final);

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
						<li><span className="dropdown-item" onClick={() => filter_listing_function(1)}>Title (A-Z)</span></li>
						<li><span className="dropdown-item" onClick={() => filter_listing_function(2)}>Release date</span></li>
					
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



				{context.listEvents.map((element, index) =>
					<div key={index} className="card" style={{ width: "15rem" }}>
						<img src={element.image} className="card-img-top card_img" alt="..." />

						<div className="card-body h-50">
							<div className="card_center_div">
								<h5 className="card-title">{element.title}</h5>
								<p>
									Start: {element.start}<br />
									Description : {element.description}</p>
							</div>
							<div className="learn_like">
								<Link to={`/demo/${element.name}`} state={element}> <button className="learn_button" >Learn More</button></Link>
								<span onClick={() => addFavorite(element, index)}><i className={context.favList.includes(element) ? "fa-solid fa-heart fa-bounce fa-2xl testred" : "fa-regular fa-heart fa-2xl fa-bounce "}></i></span>

							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
