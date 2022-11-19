import React from "react";
import {
	BadgeCartStyled,
	BadgeStyled,
	BasketButton,
} from "../../styles/MuiStyles";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import { useDispatch, useSelector } from "react-redux";
import { AddCartItem } from "../CartRedux";

const Cart = ({ item }) => {

	const listCartItems = useSelector((state) => state?.cart?.listCartItems);
	const cartItem = listCartItems.find((el) => el.itemName === item.itemName);

	const dispatch = useDispatch();

	const addCartItem = () => {
		const cartData = {
			outOfStock: item.outOfStock,
			itemName: item.itemName,
			image: item.image,
			price: item.price,
			unit: item.unit,
			note: item.note,
			quantity: 1,
			total: item.price,
		};

		dispatch(AddCartItem(cartData));
	};

	return (
		<div>
			<BasketButton
				variant={"outlined"}
				className=" mb-3"
				onClick={addCartItem}
				disabled={item.outOfStock === true}
			>
				{item.outOfStock === true ? (
					<BadgeStyled badgeContent={"Out of stock"} >
						<ShoppingBasketRoundedIcon />
					</BadgeStyled>
				) : cartItem ? (
					<BadgeCartStyled badgeContent={cartItem.quantity}>
						<ShoppingBasketRoundedIcon />
					</BadgeCartStyled>
				) : (
					<ShoppingBasketRoundedIcon />
				)}
			</BasketButton>
		</div>
	);
};

export default Cart;
