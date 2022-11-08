import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import ShopButton from "../Body/Orders/ShopButton";
import Login from "../Body/User/Login";
import Register from "../Body/User/Register";
import { HeaderStyled } from "../styles/MuiStyles";
import AddItemDialog from "./AddItemDialog";
import CartDropDown from "./CartDropDown";
import UserDropdown from "./UserDropdown";

const Header = () => {
	const userId = useSelector((state) => state?.user?.userId);

	return (
		<HeaderStyled className="d-flex align-items-center justify-content-between px-2 pt-1">
			<div>MyShop 🛍</div>

			<Routes>
				<Route path="/orders" element={<ShopButton />} />
				<Route path="/" element={<AddItemDialog />} />
			</Routes>

			{userId ? (
				<UserDropdown />
			) : (
				<div className="d-flex align-items-center">
					<Register />
					<Login />
				</div>
			)}
			<CartDropDown />
		</HeaderStyled>
	);
};

export default Header;
