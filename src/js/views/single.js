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

	
	useEffect(() => {
	

	}, []);






	return (
		<div className="list_div ">

{context.favList.map((element,ind)=>


<div key={ind} className="card card_size" >
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



	);
};



	
	// const getMovies = async () => {
	// 	try {
	// 		const data = await getDocs(moviesCollectionRef);

	// 		const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
	// 		console.log(filteredData);
	// 		setMovies(filteredData);

	// 	} catch (error) {
	// 		alert(error);
	// 	}

	// };

	// const uploadmovie = async () => {

	// 	try {
	// 		await addDoc(moviesCollectionRef, {
	// 			Title: 'Mars Express',
	// 			release: '02/2012',
	// 			rating: 'PG-65',
	// 			userID: auth?.currentUser?.uid
	// 		});
	// 		getMovies();

	// 	} catch (error) {
	// 		alert(error);

	// 	}

	// }

	// const deleteMovie = async () => {

	// 	try {
	// 		const moviedoc = doc(db, "Movies", "Mhg2eoYawoAqZWNAMrPz");
	// 		await deleteDoc(moviedoc);
	// 		; getMovies();

	// 	} catch (error) {
	// 		alert(error);

	// 	}

	// }

	// const updatemovie = async () => {
	// 	try {
	// 		const moviedoc = doc(db, "Movies", "EMxolQZPNQsCeD46uyFo");
	// 		await updateDoc(moviedoc, { Title: 'Harry Potter 5' });
	// 		getMovies();
	// 	} catch (error) {
	// 		alert(error);
	// 	}
	// }

	// const uploadfile = async () => {
	// 	if (!uploadF) return;
	// 	const filesfolderref = ref(storage, `ProjectFiles/${uploadF.name}`);
	// 	try {
	// 		await uploadBytes(filesfolderref, uploadF);
	// 		console.log('It works')
	// 	} catch (error) {
	// 		alert(error);
	// 	}

	// }
