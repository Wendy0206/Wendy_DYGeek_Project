import React from "react";
import { useEffect, useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../layout";
import { Loader } from '../component/loader'



export const Characters = () => {

	const context = useContext(AppContext);
	const navigate = useNavigate();
	const [listC, setListC] = useState([]);
	const [slideList, setSlideList] = useState(['https://cdn.marvel.com/content/1x/dpool2024004_marvelvsalien.jpg',
		'https://cdn.marvel.com/content/1x/uncx2024002_cover.jpg', 'https://cdn.marvel.com/content/1x/aven2023018_cover.jpg',
		'https://cdn.marvel.com/content/1x/xfact2024002_cover.jpg', 'https://cdn.marvel.com/content/1x/phx2024002_cov.jpg']);




	useEffect(() => {
		getCharacters();

		//sessionStorage.clear();
		// let check_storage = JSON.parse(sessionStorage.getItem('allcharacters'));
		// if (!check_storage) {
		// 	console.log('this was triggered');
		
		// } else {
		// 	//console.log('we already have characters in storage')
		// 	setListC(check_storage);
		// 	let count = 0;
		// 	let random_image = check_storage.filter((elm) => {
		// 		if (!(elm.image.includes('image_not_')) && count < 5) {
		// 			count++;
		// 			return true;
		// 		}
		// 		return false;
		// 	})
		// 		.map(elm => elm.image);
		// 	setSlideList(random_image);
		// }
	}, []);



	const getCharacters = async () => {
		try {
			await downloadCharacters();

		} catch (error) {
			console.log(error);
		} 
	}


	const downloadCharacters = async () => {
		fetch('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=727378f140539c0b271e37b49cf9d9d6&hash=2f0a5da5cea5906c98b7a0005ee18982')
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => {

				let newArray = [...response.data.results];
				var random_image = [];

				let newArray2 = [];
				newArray.map((elm) => {
					let each_elm = {}
					each_elm.name = elm.name;
					each_elm.id = elm.id;
					each_elm.image = elm.thumbnail.path + '.' + elm.thumbnail.extension;
					each_elm.comics = elm.comics.available;
					each_elm.description = (elm.description.length > 5) ? elm.description.slice(0, 40) + '...' : 'Unfortunately there is no description here...'
					each_elm.series = elm.series.available;
					newArray2.push(each_elm);
				})


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
				setListC(newArray2);
				sessionStorage.setItem("allcharacters", JSON.stringify(newArray2));


			})
			.catch(error => { console.error(error); return false; });

	}

	function addFavorite(elm, pos) {

		if (context.currentUser.token) {
			let newArray2 = context.favList.find((element) => element == elm);

			if (!newArray2) {
				let newArray = [...context.favList];
				newArray.push(listC[pos]);
				context.setFavList(newArray);
				fetch_add_fav(listC[pos].id);
			}
			else {
				let newArray = context.favList.filter((element, index) => element != elm);
				fetch_remove_fav(listC[pos].id)
				context.setFavList(newArray);

			}
		} else {
			navigate('/login');
		}
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
		var test = [...listC];
		if (val == 1) {
			var final = test.toSorted(sortName);
		}
		else if (val == 2) {
			var final = test.toSorted(sortComics);
		}
		else if (val == 3) {
			var final = test.toSorted(sortSeries);
		}
		setListC(final);
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
						<img className="img_sl" src={slideList[4]} />
						<img className=" img_sl" src={slideList[3]} />
						<img className=" img_sl" src={slideList[2]} />
						<img className=" img_sl" src={slideList[1]} />
						<img className=" img_sl" src={slideList[0]} />

					</div>


					<div className="list_div">

						{listC.map((element, index) =>
							<div key={index} className="card card_size" >
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

