import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";
import { AppContext } from "../layout";
import { NavigationContext } from "react-router/dist/lib/context";

export const Demo = () => {
const location =useLocation();
const data = location.state;
const context = useContext(AppContext);
const navigate = useNavigate();
const [searchVal, setSearchVal]= useState('');
const [searchRes, setSearchRes]= useState([]);

function search_function(val){
	let clear_res=[];
	setSearchRes(clear_res);
	let search_val=val.target.value;

	
if(search_val.length>3){
	
	let newArray = [...searchRes];
	let newObj= {name:val.target.value};
	newArray.push(newObj);
	


	fetch('https://marvel-heroic-api-unlock-the-mcu-legendary-characters.p.rapidapi.com/name?q='+newObj.name,{

		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'b7d8c24116msh18d47855c91a4c6p129b19jsn25ca23c193e6',
			'X-RapidAPI-Host': 'marvel-heroic-api-unlock-the-mcu-legendary-characters.p.rapidapi.com'
		}

	})
			.then(res => {
				if (!res.ok) {
				
					console.log('Not found check if it was called :');
					let newArray = [{name:'No matching characters found'}];
					setSearchRes(newArray);
					setSearchVal('');
			
				}
				return res.json();
				
			})
			.then(response => {
			
				let newArray = [];
				
		
				response.map((elm) => {
					let each_elm = {}
					each_elm.name = elm.name;
					each_elm.id = elm.id;
					each_elm.description= elm.description;
				//	each_elm.image=
				// each_elm.quote= elm.quote[0];	
					newArray.push(each_elm);
				})
				console.log('Do we really get this character or? ');
				console.log(newArray);
				setSearchRes(newArray);

			})
			.catch(error => console.error(error));

		}
		setSearchVal(val.target.value);

}





	return (
		<div className="demo_div ">
			<div className="back_home">
				<button className="back_button" onClick={()=>navigate('/')}>Back home</button>

				<div class="dropdown">
				<input className="form-control dropdown-toggle" type="search" value={searchVal}  id="dropdownMenuButton" data-bs-toggle="dropdown"  placeholder="Search your character"  aria-haspopup="true" aria-expanded="false" onChange={(e)=>search_function(e)}/>
 
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
	{searchRes.map((elm, ind)=>
	<span  key={ind} class="dropdown-item" >{elm.name}</span>
	)}
  
    
  </div>
</div>



			</div>

			<div className=""></div>
				<div className="card h-25 card_demo" style={{width: "50%"}}>
			<img src={data.image} className="card-img-top img_demo" alt="..."/>
			<div className="card-body">
			  <h5 className="card-title">{data.name}</h5>
			  <p> Gender : Male<br/>
			 
			 Hair-Color : Black<br/>
			 Eye-Color :Brown</p>
		<div className="learn_like">
		<Link to="/">
		<button className="btn btn-outline-primary" >Go back</button>
		</Link>
		<span><i className="fa-regular fa-heart fa-xl"></i></span>
			  </div>
			</div>
		  </div>

			
		</div>
	);
};
