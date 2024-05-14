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

export const Series = () => {

	const context = useContext(AppContext);
	const navigate = useNavigate();
	const [randomImg, setRandomImg]= useState([]);

	useEffect(() => {

	

			fetch('https://gateway.marvel.com/v1/public/series?ts=1&apikey=727378f140539c0b271e37b49cf9d9d6&hash=2f0a5da5cea5906c98b7a0005ee18982')
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
					each_elm.image = elm.thumbnail.path+'.'+ elm.thumbnail.extension;
					each_elm.description = (elm.description!=null)? elm.description.slice(0,40) + '...' : 'Unfortunately there is no description here...'		
					each_elm.start=elm.startYear;
					each_elm.type = elm.type;
					newArray2.push(each_elm);
				})
				
				// var random_img_clone=[random_img[0].image,random_img[1].image,random_img[2].image,random_img[3].image,random_img[4].image];

				context.setListSeries(newArray2);
				
				
				
				let random_img=newArray2.filter((elm)=>elm.image.indexOf('_not_')==-1).map(({image})=>({image}));
				console.log('Our random image test starts here, check this :');
				
                setRandomImg(random_img);
				console.log(randomImg);
				
                  

			})
			.catch(error => console.error(error));


	}, []);




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
						{/* <i class="fa-solid fa-sliders fa-2xl"></i> */}
						Filter
					</button>
					<ul className="dropdown-menu text-lg" role='button' aria-labelledby="dropdownMenuButton">
						<li><span className="dropdown-item" onClick={() => filter_listing_function(1)}>Name (A-Z)</span></li>
						<li><span className="dropdown-item" onClick={() => filter_listing_function(2)}>Comics</span></li>
						<li><span className="dropdown-item" onClick={() => filter_listing_function(3)}>Genre</span></li>

					</ul>
				</div>

				<button className="fav_button" onClick={() => navigate("/single")}>Favorites <span className="suptest">{context.favList.length}</span> </button>

			</div>

			<div className="slideshow3">
				<img class="img_sl" src={image1} />
				<img class=" img_sl" src={image2} />
				<img class=" img_sl" src={image3} />
				<img class=" img_sl" src={image4} />
				<img class=" img_sl" src={image4} />

				{/* <img class="img_sl" src={random_img[0]} />
				<img class=" img_sl" src={random_img[1]} />
				<img class=" img_sl" src={random_img[2]} />
				<img class=" img_sl" src={random_img[3]} />
				<img class=" img_sl" src={random_img[4]} /> */}

			</div>


			<div className="list_div">



				{context.listSeries.map((element, index) =>
					<div key={index} className="card" style={{ width: "15rem" }}>
						<img src={element.image} className="card-img-top" alt="..." />

						<div className="card-body h-50">
							<h5 className="card-title">{element.title}</h5>
							<p>Type : {element.type} <br />
								Star : {element.start}		<br />
								Description : {element.description}</p>
							<div className="learn_like">
								<Link to={`/demo/${element.title}`} state={element}> <button className="learn_button" >Learn More</button></Link>
								<span onClick={() => addFavorite(element, index)}><i className={context.favList.includes(element) ? "fa-solid fa-heart fa-bounce fa-2xl testred" : "fa-regular fa-heart fa-2xl fa-bounce "}></i></span>

							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
