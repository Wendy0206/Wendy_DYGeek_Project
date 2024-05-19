import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";

import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./views/login";
import { Characters } from "./views/characters";
import { Series } from "./views/series";
import { Events } from "./views/events";


export const AppContext = createContext();

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	
	const [favList, setFavList] = useState([]);
	const [currentUser, setCurrentUser] = useState( {id:null, user: "  Log in"});


	return (
		<div>
			<AppContext.Provider value={{
				favList,
				setFavList,
				currentUser,
				setCurrentUser
			}} >
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar/>
					<Routes>			
					<Route path="/" element={<Home />}/>
					<Route path="/characters" element={<Characters/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/series" element={<Series/>} />
					<Route path="/events" element={<Events/>} />
						<Route path="/demo/:ind" element={<Demo />} />
						<Route path="/single" element={<Single />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
			</AppContext.Provider>
		</div>
	);
};

export default injectContext(Layout);
