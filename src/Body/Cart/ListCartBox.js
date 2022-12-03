import React from "react";
import { ItemCartStyled } from "../../styles/MuiStyles";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";
import { AddQuantityItem, RemoveQuantityItem } from "../Redux/CartRedux";
import DiscountIcon from "@mui/icons-material/Discount";

const ListCartBox = () => {

	const listCartItems = useSelector((state) => state?.cart?.listCartItems);

	const dispatch = useDispatch();

	const addQuantity = (index) => {
		dispatch(AddQuantityItem(index));
	};

	const removeQuantity = (index) => {
		dispatch(RemoveQuantityItem(index));
	};

	return (
		<React.Fragment> 
			{listCartItems.map((item, index) => (
					<div
						className="d-flex align-items-center border-bottom" //justify-content-between
						key={item.itemName}
					>
						{item.isDiscount ? (
							<DiscountIcon
								sx={{
									color: "#FF1493",
									fontSize: "24px",
									marginRight: "10px",
								}}
							/>
						) : (
							""
						)}

						<ItemCartStyled className="me-3">
							{item.itemName} {item.quantity} {item.unit} x {item.price} €
							 = {item.total} €
						</ItemCartStyled>

						<div className="d-flex ms-auto">
							<AddShoppingCartRoundedIcon
								sx={{ color: "#FF1493", margin: "0px 10px" }}
								onClick={() => addQuantity(index)}
							/>

							<RemoveShoppingCartRoundedIcon
								sx={{ color: "#FF1493" }}
								onClick={() => removeQuantity(index)}
							/>
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default ListCartBox;
