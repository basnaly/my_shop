import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

import { myTheme } from "./styles/MuiTheme";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./Header/Header";
import { MainStyled } from "./styles/MuiStyles";
import Typography from "@mui/material/Typography";
import ListItems from "./Body/Items/ListItems";
import { useDispatch } from "react-redux";
import { CheckUserWithBackend } from "./Body/UserRedux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderScreen from "./Body/Orders/OrderScreen";
import MainScreen from "./Body/Items/MainScreen";

const AppMyShop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(CheckUserWithBackend());
	}, []);

	return (
		<BrowserRouter>
			<MainStyled className="d-flex flex-column overflow-auto vh-100">
				<ThemeProvider theme={myTheme} >
					<Typography as='div' className="d-flex flex-column overflow-auto">
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
