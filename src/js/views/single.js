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

	const [searchVal, setSearchVal] = useState('');
	const [searchRes, setSearchRes] = useState([]);

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



			<nav class="navbar navbar-expand-lg navbar-light bg-dark w-100">

				<img className="img_brand" src={imglink} />
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<div className="route_div">
						<ul class="navbar-nav">
							<li class="nav-item active">
								<span class="nav-link" >News</span>
							</li>

							<li class="nav-item active">
								<span class="nav-link" >Characters</span>
							</li>
							<li class="nav-item">
								<span class="nav-link">Series</span>
							</li>
							<li class="nav-item">
								<span class="nav-link" >Events</span>
							</li>

						</ul>
						<div className="d-flex" >



							<div className="">
								<div class="search-box " >
									<button class="btn-search"><i class="fas fa-search"></i></button>
									<input type="text" class="input-search" placeholder="Type to Search..." />
								</div>

								<div className="" style={{ backgroundColor: "red", display: "none" }}>

									<span className="dropdown-item text-light" >fekfnqeknfe</span>
									<span className="dropdown-item text-light" >fekfnqeknfe</span>
									<span className="dropdown-item text-light" >fekfnqeknfe</span>

								</div>
							</div>

							<button className="btn btn-dark">wrgrgwrgrwg</button>
						</div>


					</div>

				</div>
			</nav>




		</div>



	);
};
