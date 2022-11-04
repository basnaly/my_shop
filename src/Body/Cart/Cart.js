import React, { useState } from "react";
import { BasketButton } from "../../styles/MuiStyles";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import { Badge } from "@mui/material";
import { useDispatch } from "react-redux";
import { AddNewCartItem } from "../CartReducer";

const Cart = ({item}) => {

	const dispatch = useDispatch()

	const addCartItem = () => {

		const cartData = {
			itemName: item.itemName,
			image: item.image,
			price: item.price,
			unit: item.unit,
			note: item.note,
			quantity: 1,
			total: item.price
		};

		dispatch(AddNewCartItem(cartData))
		console.log(cartData.total)

	}

	return (
		<div>
			<BasketButton
				variant={"outlined"}
				className=" mb-3"
				onClick={addCartItem}
			>
				<ShoppingBasketRoundedIcon />
				
			</BasketButton>
		</div>
	);
};

export default Cart;
