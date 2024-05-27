import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css";
import { AppContext } from "../layout";
import { auth } from '../../config/firebase';
import { storage } from '../../config/firebase';
import { db } from "../../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage"
import imglink from "../../img/DyGeek.png";

export const Single = () => {
	const location = useLocation();
	const data = location.state;
	const context = useContext(AppContext);
	const navigate = useNavigate();
	const [movies, setMovies] = useState([]);
	const moviesCollectionRef = collection(db, 'Movies');
	const [uploadF, setUploadF] = useState(null);

	const getMovies = async () => {
		try {
			const data = await getDocs(moviesCollectionRef);

			const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			console.log(filteredData);
			setMovies(filteredData);

		} catch (error) {
			alert(error);
		}

	};
	useEffect(() => {
		// getMovies();

	}, []);


	const uploadmovie = async () => {

		try {
			await addDoc(moviesCollectionRef, {
				Title: 'Mars Express',
				release: '02/2012',
				rating: 'PG-65',
				userID: auth?.currentUser?.uid
			});
			getMovies();

		} catch (error) {
			alert(error);

		}

	}

	const deleteMovie = async () => {

		try {
			const moviedoc = doc(db, "Movies", "Mhg2eoYawoAqZWNAMrPz");
			await deleteDoc(moviedoc);
			; getMovies();

		} catch (error) {
			alert(error);

		}

	}

	const updatemovie = async () => {
		try {
			const moviedoc = doc(db, "Movies", "EMxolQZPNQsCeD46uyFo");
			await updateDoc(moviedoc, { Title: 'Harry Potter 5' });
			getMovies();
		} catch (error) {
			alert(error);
		}
	}

	const uploadfile = async () => {
		if (!uploadF) return;
		const filesfolderref = ref(storage, `ProjectFiles/${uploadF.name}`);
		try {
			await uploadBytes(filesfolderref, uploadF);
			console.log('It works')
		} catch (error) {
			alert(error);
		}

	}


	return (
		<div className="single_div ">


			{/* <div class="search-container">

				<input class="search expandright" id="searchright" type="search" name="q" placeholder="Search" />
				<label class="button searchbutton" for="searchright"><span class="mglass">&#9906;</span></label>

			</div> */}

			<div className="row">



				<div className="col-2">
					<nav className="navbar navbar-light " >
						<a className="nav_link"><i className="fa-brands fa-tiktok fa-xl"></i></a>
						<a className="nav_link"><i className="fa-brands fa-instagram fa-xl"></i></a>
						<a className="nav_link"><i className="fa-brands fa-facebook fa-xl"></i></a>
						<a className="nav_link"><i className="fa-brands fa-x-twitter fa-xl"></i></a>
						<a className="nav_link"><i className="fa-brands fa-youtube fa-xl"></i></a>
					</nav>
				</div>

				<div className="col">

					<img className="star_img" src={imglink} />

					<ul>
						<li><span className="nav_link  nav_test" onClick={() => navigate('/home')}>News</span></li>
						<li><span className="nav_link nav_test" onClick={() => navigate('/')}>Characters</span></li>
						<li><span className="nav_link nav_test" onClick={() => navigate('/events')}>Events</span></li>
						<li><span className="nav_link nav_test" onClick={() => navigate('/series')}>Series</span></li>
					</ul>


				</div>

				<div className="col d-dlex">

					<div className="dropdown">
						<input className="form-control mr-m-6 w-100 dropdown-toggle" type="search" aria-label="Search" id="dropdownMenuButton" data-bs-toggle="dropdown" placeholder="Search your character" aria-haspopup="true" aria-expanded="false" onChange={(e) => search_function(e)} />

						<div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ backgroundColor: "black" }}>

							<span className="dropdown-item text-light"  >64u44h545y</span>

						</div>
					</div>

					<button className="btn btn-outline-dark " type="submit" onClick={() => login_logout()}>
						Wendy D</button>


				</div>
			</div>


		</div>



	);
};
