import React from "react";
import { useSelector } from "react-redux";
import {
	BadgeItemStyled,
	BoxStyled,
	ItemDataStyled,
	ItemNameStyled,
} from "../../styles/MuiStyles";

import Cart from "../Cart/Cart";

import DeleteItemDialog from "./DeleteItemDialog";
import EditItemForm from "./EditItemForm";

const ListItemBox = ({ item }) => {
	const userId = useSelector((state) => state?.user?.userId);

	const boxStyledContent = (
		<BoxStyled
			boxShadow={24}
			p={1}
			className="d-flex flex-column position-relative align-items-center m-3 mt-4"
			sx={{ width: "250px", backgroundColor: item.outOfStock ? "lightgray" : "linen" }}
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

	return item.discount.discountPrice > 0 ? (
		<BadgeItemStyled
			badgeContent={`${item.discount.discountPrice}€ for 
				${item.discount.discountAmount} ${item.unit}`}
		>
			{boxStyledContent}
		</BadgeItemStyled>
	) : (
		boxStyledContent
	);
};

export default ListItemBox;
