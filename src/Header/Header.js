import React from "react";
import { useSelector } from "react-redux";
import Login from "../Body/User/Login";
import Register from "../Body/User/Register";
import { HeaderStyled } from "../styles/MuiStyles";
import AddItemDialog from "./AddItemDialog";
import CartDropDown from "./CartDropDown";
import UserDropdown from "./UserDropdown";

const Header = () => {

	const userId = useSelector(state => state?.user?.userId)

	return (
		<HeaderStyled className="d-flex align-items-center justify-content-between ps-2">
			<div>MyShop 🛍</div>
			<AddItemDialog />
			{
				userId ? <UserDropdown /> :
				<div className="d-flex align-items-center">
					<Register />
					<Login />
				</div>
			}
			<CartDropDown />
		</HeaderStyled>
	);
};

export default Header;
