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
import {Register} from "./Components/Register/Register.jsx"
import {Account} from "./Components/Account/Account.jsx"
import {NewPost} from "./Components/NewPost/NewPost.jsx"
import {UpdateProfile} from "./Components/UpdateProfile/UpdateProfile.jsx"
import {UpdatePassword} from "./Components/UpdatePassword/UpdatePassword.jsx"
import {ForgotPassword} from "./Components/ForgotPassword/ForgotPassword.jsx"
import {ResetPassword} from "./Components/ResetPassword/ResetPassword.jsx"
import {UserProfile} from "./Components/UserProfile/UserProfile.jsx"
import {Search} from "./Components/Search/Search.jsx"
import {NotFound} from "./Components/NotFound/NotFound.jsx"

function App() {

	const {isAuthenticated} = useSelector((state)=>state.userReducer)
	const dispatch = useDispatch()
	useEffect(()=>{
		dispatch(loadUser())
	},[])
	return (
		<Router> 
		<div className="main">
		<div className="leftNavbar">
		{isAuthenticated && <Header/> }
		</div>
			<div className="rightSpace">
			<Routes>
			{isAuthenticated ? (
				<>


			<Route path = "/" element={ <Home/> } />
			<Route path = "/account" element={ <Account/> } />
			<Route path = "/newPost" element={ <NewPost/> } />
			<Route path = "/update/profile" element={ <UpdateProfile/> } />
			<Route path = "/update/password" element={ <UpdatePassword/> } />
			<Route path = "/User/:id" element={ <UserProfile/> } />
			<Route path = "/search" element={ <Search/> } />
			<Route path = "*" element={ <NotFound/> } />


				

			</>

		)


				:(	<>
					<Route path = "*" element={ <Login/> } />
					<Route path = "/register" element={ <Register/> } />
					<Route path = "/forgot/password" element={ <ForgotPassword/> } />
					<Route path = "/reset/password/:token" element={ <ResetPassword/> } />
					</> )}
			</Routes>
			</div>

		</div>			
		</Router>
	)
}

export default App
