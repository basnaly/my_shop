import { useTheme } from "@emotion/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	BoxStyled,
	ItemDataStyled,
	ItemNameStyled,
	PinkButton,
} from "../../styles/MuiStyles";

import Cart from "../Cart/Cart";

import DeleteItemDialog from "./DeleteItemDialog";
import EditItemForm from "./EditItemForm";

const ListItemBox = ({ item }) => {

	const userId = useSelector((state) => state?.user?.userId);

	return (
		<BoxStyled
			boxShadow={24}
			p={1}
			className="d-flex flex-column position-relative align-items-center m-3 mt-4"
			sx={{ width: "250px", backgroundColor: "linen" }}
		>
			<ItemNameStyled className="m-2">{item.itemName}</ItemNameStyled>

			<img
				src={item.image}
				alt={item.itemName}
				width="100"
				height="100"
				className="m-2"
			/>

			<ItemDataStyled className="m-1">
				{item.price} € per {item.unit}
			</ItemDataStyled>

			<ItemDataStyled className="m-1 mb-3">{item.note}</ItemDataStyled>

			{userId === item.createUser ? (
				<div>
					<EditItemForm item={item} />

					<DeleteItemDialog item={item} />
				</div>
			) : (
				<Cart item={item} />
			)}
		</BoxStyled>
	);
};

export default ListItemBox;
