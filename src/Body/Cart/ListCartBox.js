import React from "react";
import { ItemCartStyled } from "../../styles/MuiStyles";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";
import { AddQuantityItem, RemoveQuantityItem } from "../CartRedux";

const ListCartBox = () => {

	const listCartItems = useSelector((state) => state?.cart?.listCartItems);

    const dispatch = useDispatch()

    const addQuantity = (index) => {
        dispatch(AddQuantityItem(index))
    }

    const removeQuantity = (index) => {
        dispatch(RemoveQuantityItem(index))
    }

	return (
		<React.Fragment>
			{listCartItems.map((item, index) => (
				<div className="d-flex align-items-center justify-content-between" 
                    key={item.itemName}
                >
					<ItemCartStyled>
						{item.itemName} {item.price} € x {item.quantity} = {" "}
						{item.total} €
					</ItemCartStyled>

                    <div className="d-flex">

					<AddShoppingCartRoundedIcon
						sx={{ color: "hotpink", margin: "0px 10px" }}
                        onClick={() => addQuantity(index)}
					/>

					<RemoveShoppingCartRoundedIcon 
                        sx={{ color: "hotpink" }}
                        onClick={() => removeQuantity(index)}
                    />

                    </div>

				</div>
			))}
		</React.Fragment>
	);
};

export default ListCartBox;
