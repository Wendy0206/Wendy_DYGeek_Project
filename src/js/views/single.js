
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate  } from "react-router-dom";
import { AppContext } from "../layout";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Single = () => {

	const context = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {

		console.log('test')
		fetch('https://turbo-rotary-phone-g44w56q9gw943pw7w-3000.app.github.dev/user/'+context.currentUser.id+'/favorite')              
		.then(res => {
			if (!res.ok) throw Error(res.statusText);
			return res.json();
		})
		.then(response => {

		let test= [...response]
		let test2={}
		let final=[]
		
	        test.forEach ((elm)=>{

			test2=context.listC[elm.people_id];
			
				final.push(test2)	;

		})
		context.setFavList(final)


		} )

		.catch(error => alert(error));  





	}, []);




	function deletefavorite(pos) {
		let test = context.favList[pos];
		console.log(context.favList[pos])
		let test2 = context.listC.indexOf(test)
		console.log(test2)
		
		// let newArray= context.favList.filter((element,index)=> index!=pos);
		// context.setFavList(newArray);
		//delete_fetch(test2);	

	}

	function delete_fetch(fav) {
		let test = [context.currentUser.id, fav]
		fetch('https://turbo-rotary-phone-g44w56q9gw943pw7w-3000.app.github.dev/user/'+context.currentUser.id +'/favorite/'+fav, {
			method: 'PUT',
			body: JSON.stringify(test), // data can be a 'string' or an {object} which comes from somewhere further above in our application
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => console.log('Success:', response))
			.catch(error => console.error(error));
	}




	return (


		<div className="demo_div ">
			<div className="back_home">
				<Link to="/">
					<button className="back_button">Back home</button>
				</Link>
			</div>

			<div className="list_div">
				{context.favList.map((element, index) =>
					<div key={index} className="card" style={{ width: "15rem" }}>
						<Link to={`/demo/${element.name}`} state={element}><img src={element.img} className="card-img-top" alt="..." /> </Link>

						<div className="card-body">
							<h5 className="card-title">{element.name}</h5>
							<p> Gender : Male <br />

								Hair-Color : Black<br />
								Eye-Color :Brown</p>

							<div className="learn_like">
								<Link to={`/demo/${element.name}`}> <button className="btn btn-outline-primary" >Learn More</button></Link>
								<span onClick={()=>deletefavorite(index)}><i className="fa-solid fa-trash fa-bounce"></i></span>

							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

