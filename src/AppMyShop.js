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

const AppMyShop = () => {

	const dispatch = useDispatch()

	useEffect(() => {

        dispatch(CheckUserWithBackend())

    }, []);

	return (
		<MainStyled className="d-flex flex-column vh-100">
			<ThemeProvider theme={myTheme}>
				<Typography>
					<Header />
					<ListItems />
				</Typography>
			</ThemeProvider>
		</MainStyled>
	);
};

export default AppMyShop;
