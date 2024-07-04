import React from "react";
import { useState, useEffect, useContext } from "react";

import "../../styles/home.css";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../layout";
import { Loader } from '../component/loader'

export const Events = () => {

	const context = useContext(AppContext);
	const navigate = useNavigate();
	const [listEvents, setListEvents] = useState([]);
	const [slideList, setSlideList] = useState(['https://cdn.marvel.com/content/1x/dpool2024004_marvelvsalien.jpg',
		'https://cdn.marvel.com/content/1x/uncx2024002_cover.jpg', 'https://cdn.marvel.com/content/1x/aven2023018_cover.jpg',
		'https://cdn.marvel.com/content/1x/xfact2024002_cover.jpg', 'https://cdn.marvel.com/content/1x/phx2024002_cov.jpg']);
	

	useEffect(() => {

		let check_storage = JSON.parse(sessionStorage.getItem('allevents'));
		if (!check_storage) {
			
			getEvents();
		}
		else {
		//	console.log('we already have events in storage')
		setListEvents(check_storage);
			let count = 0;
			let random_image = check_storage.filter((elm) => {
				if (!(elm.image.includes('image_not_')) && count < 5) {
					count++;
					return true;
				}
				return false;
			})
				.map(elm => elm.image);
			setSlideList(random_image);

		}
	}, []);


	const getEvents = async () => {
		await downloadEvents();
	}



	const downloadEvents = async () => {

		fetch('https://gateway.marvel.com/v1/public/events?ts=1&apikey=727378f140539c0b271e37b49cf9d9d6&hash=2f0a5da5cea5906c98b7a0005ee18982')
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => {
				let newArray = [...response.data.results];

				let newArray2 = [];
				newArray.map((elm) => {
					let each_elm = {}
					each_elm.name = elm.title;
					each_elm.id = elm.id;
					each_elm.image = elm.thumbnail.path + '.' + elm.thumbnail.extension;
					each_elm.description = (elm.description != null) ? elm.description.slice(0, 50) + '...' : 'Unfortunately there is no description on this one...'
					each_elm.start = (elm.start == null) ? 'Unknown' : elm.start.slice(0, 11);
					newArray2.push(each_elm);
				})

				setListEvents(newArray2);
				sessionStorage.setItem("allevents", JSON.stringify(newArray2));
				let random_image = [0];
				let count = 0;
				random_image = newArray2
					.filter((elm) => {
						if (!(elm.image.includes('image_not_')) && count < 5) {
							count++;
							return true;
						}
						return false;
					})
					.map(elm => elm.image);
				setSlideList(random_image);

			})
			.catch(error => console.error(error));

	}


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
		var test = [...listEvents];
		if (val == 1) {
			var final = test.toSorted(sortTitle);
		}
		else {
			var final = test.toSorted(sortDate);
		}
		setListEvents(final);

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
				<img className="img_sl" src={slideList[4]} />
				<img className=" img_sl" src={slideList[3]} />
				<img className=" img_sl" src={slideList[2]} />
				<img className=" img_sl" src={slideList[1]} />
				<img className=" img_sl" src={slideList[0]} />

			</div>

				<div className="list_div">

					{listEvents.map((element, index) =>
						<div key={index} className="card card_size" >
							<img src={element.image} className="card-img-top card_img" alt="..." />

							<div className="card-body h-50">
								<div className="card_center_div">
									<h5 className="card-title">{element.name}</h5>
									<p>
										Start: {element.start}<br />
										Description : {element.description}</p>
								</div>
								<div className="learn_like">
									{/* <Link to={`/demo/${element.name}`} state={element}>  */}

									<button className="learn_button" >Learn More</button>
									{/* </Link> */}
									<span onClick={() => addFavorite(element, index)}><i className={context.favList.includes(element) ? "fa-solid fa-heart fa-bounce fa-2xl testred" : "fa-regular fa-heart fa-2xl fa-bounce "}></i></span>

								</div>
							</div>
						</div>
					)}
				</div>
		</div>

	);
}
