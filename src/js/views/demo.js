import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/demo.css";
import { AppContext } from "../layout";


export const Demo = () => {
	const location = useLocation();
	const data = location.state;
	const navigate = useNavigate();
    const [learMore, setLearnMore]= useState([]);

	useEffect(() => {
		downloadComics();
	}, []);


	const downloadComics = async () => {
		fetch('https://gateway.marvel.com/v1/public/characters/'+data.id+'/comics?ts=1&apikey=727378f140539c0b271e37b49cf9d9d6&hash=2f0a5da5cea5906c98b7a0005ee18982')
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => {

				let newArray = [...response.data.results];
				let newArray2 = [];
				newArray.map((elm) => {
					let each_elm = {}
					each_elm.title = elm.title;
					each_elm.id = elm.id;
					each_elm.description='Unfortunately there is no description here...'
					if (elm.textObjects.length>0){each_elm.description = elm.textObjects[0].text.slice(0, 50) + '...' ;
					};
					
				newArray2.push(each_elm);
				})

				setLearnMore(newArray2);
				
			})
			.catch(error => { console.error(error); return false; });
	return true;
	}



	return (
<div className="container catalog_div">
	<div className="back_home">
	<button className="btn btn-primary" onClick={()=>navigate('/')}>Back home</button>
	</div>

<h1 className="text-center mb-3 ">{data.name} List of comics</h1>
		<div className="demo_div">
<ul className="ul_demo">
	 {learMore.map((elm, ind) =>

<li key={ind}> 
	<div className="d-flex">
	<div className="mr-2"><p>{elm.title}</p></div>  
	  <div>{elm.description}</div> 
	     </div> 
		 </li>
)} 

</ul>


</div>
	</div>
		
	
	);
};
