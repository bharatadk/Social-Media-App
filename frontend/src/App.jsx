import { useState, useEffect } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {loadUser} from "./Actions/User.js"
import {Header} from "./Components/Header/Header.jsx"
import {Home} from "./Components/Home/Home.jsx"
import {Login} from "./Components/Login/Login.jsx"
import {Account} from "./Components/Account/Account.jsx"
import {NewPost} from "./Components/NewPost/NewPost.jsx"

function App() {

	const {isAuthenticated} = useSelector((state)=>state.userReducer)
	const dispatch = useDispatch()
	useEffect(()=>{
		dispatch(loadUser())
	},[])
	return (
		<Router> 
		{isAuthenticated && <Header/> }

			<Routes>
			{isAuthenticated ? (
				<>
			<Route path = "/" element={ <Home/> } />
			<Route path = "/account" element={ <Account/> } />
			<Route path = "/newPost" element={ <NewPost/> } />

			</>
				)


				:(	<Route path = "*" element={ <Login/> } /> )}
			</Routes>

					
		</Router>
	)
}

export default App
