import React, { useState } from "react";
import { BasketButton } from "../../styles/MuiStyles";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import { Badge } from "@mui/material";
import { useDispatch } from "react-redux";
import { AddNewBasketItem } from "../BasketReducer";

const Basket = ({item}) => {

	const dispatch = useDispatch()

	const addBasketItem = () => {

		const basketData = {
			itemName: item.itemName,
			image: item.image,
			price: item.price,
			unit: item.unit,
			note: item.note,
			quantity: 1,
			total: item.price
		};

		dispatch(AddNewBasketItem(basketData))
		console.log(basketData.total)

	}

	return (
		<div>
			<BasketButton
				variant={"outlined"}
				className=" mb-3"
				onClick={addBasketItem}
			>
				<ShoppingBasketRoundedIcon />
				
			</BasketButton>
		</div>
	);
};

export default Basket;
