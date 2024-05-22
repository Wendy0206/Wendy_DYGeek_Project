import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";
import { AppContext } from "../layout";
import { auth } from '../../config/firebase';
import { storage } from '../../config/firebase';
import { db } from "../../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage"


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
		getMovies();

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
		<div className="demo_div ">



			<ul >
				{movies.map((element, index) =>
					<li key={index} ><p>

						Title: {element.Title}<br />
						rating : {element.rating}<br />
						Release: {element.release}

					</p></li>
				)}


			</ul>


			<input className="form-control[[" type="file" onChange={(e) => setUploadF(e.target.files[0])} placeholder="Upload your file here" />
			<button className="btn btn-light" onClick={() => uploadfile()}>Update  movie</button><br />


			<button className="btn btn-success" onClick={() => updatemovie()}>Update  movie</button><br />
			<button className="btn btn-danger" onClick={() => deleteMovie()}>Delete movie</button>






			{/* <div className="back_home">
				<button className="back_button" onClick={()=>navigate('/')}>Back home</button>
			</div>

			<div className=""></div>
				<div className="card h-25 card_demo" style={{width: "50%"}}>
			<img src={data.image} className="card-img-top img_demo" alt="..."/>
			<div className="card-body">
			  <h5 className="card-title">{data.name}</h5>
			  <p> Gender : Male<br/>
			 
			 Eye-Color :Brown</p>
		<div className="learn_like">
		<Link to="/">
		<button className="btn btn-outline-primary" >Go back</button>
		</Link>
		<span><i className="fa-regular fa-heart fa-xl"></i></span>
			  </div>
			</div>
		  </div>

			 */}
		</div>
	);
};
