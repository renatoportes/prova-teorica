import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";

function RoutesApp() {
	return (
		<Routes>
			<Route path='/home' element={<Home />} />
			<Route path='/' element={<SignIn />} />
		</Routes>
	);
}

export default RoutesApp;
