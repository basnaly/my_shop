import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

import { myTheme } from "./styles/MuiTheme";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./Header/Header";
import { MainStyled } from "./styles/MuiStyles";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { CheckUserWithBackend } from "./Body/Redux/UserRedux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderScreen from "./Body/Orders/OrderScreen";
import MainScreen from "./Body/MainScreen";
import { GetListItems } from "./Body/Redux/ItemRedux";

const AppMyShop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(CheckUserWithBackend());
		dispatch(GetListItems())
	}, []);

	return (
		<BrowserRouter>
			<MainStyled className="d-flex flex-column overflow-auto vh-100">
				<ThemeProvider theme={myTheme} >
					<Typography as='div' className="d-flex flex-column overflow-auto h-100">
						<Header />

						<Routes>
							<Route path="/orders" element={<OrderScreen />} />
							<Route path="/" element={<MainScreen />} />
						</Routes>
					
					</Typography>
				</ThemeProvider>
			</MainStyled>
		</BrowserRouter>
	);
};

export default AppMyShop;
