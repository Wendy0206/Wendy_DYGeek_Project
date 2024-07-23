import React from "react";
import { useState, useEffect, useContext } from "react";

import "../../styles/home.css";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../layout";
import { Loader } from '../component/loader'

export const Events = () => {

	const context = useContext(AppContext);
	const navigate = useNavigate();
	const [listNews, setListNews] = useState([]);
	const [slideList, setSlideList] = useState(['https://cdn.marvel.com/content/1x/dpool2024004_marvelvsalien.jpg',
		'https://cdn.marvel.com/content/1x/uncx2024002_cover.jpg', 'https://cdn.marvel.com/content/1x/aven2023018_cover.jpg',
		'https://cdn.marvel.com/content/1x/xfact2024002_cover.jpg', 'https://cdn.marvel.com/content/1x/phx2024002_cov.jpg']);
	

	useEffect(() => {
		getNews();
		
	}, []);


	const getNews = async () => {
		await downloadNews();
	}



	const downloadNews = async () => {

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
						each_elm.description = (elm.description != null) ? elm.description.slice(0, 50) + '...' : 'Unfortunately there is no description on this one...'
					each_elm.start = (elm.start == null) ? 'Unknown' : elm.start.slice(0, 11);
					newArray2.push(each_elm);
				})

				setListNews(newArray2);
				

			})
			.catch(error => console.error(error));

	}


	const sortTitle = (a, b) => {
		let nameA = a.title.toUpperCase();
		let nameB = b.title.toUpperCase();
		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
	}


	function filter_listing_function(val) {
		var test = [...listNews];
		if (val == 1) {
			var final = test.toSorted(sortTitle);
		}
		else {
			var final = test.toSorted(sortDate);
		}
		setListNews(final);

	}




	return (
		<div className="container catalog_div">

			<div className=" d-flex justify-content-between mt-3">
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

					
				</div>
		</div>

	);
}
