import React from "react";
import { BadgeOutOfStockStyled } from "../../styles/MuiStyles";

const BadgeOutOfStock = ({ isOutOfStock, children }) => {
	
	if (!isOutOfStock) {
		return children;
	} else {
		return (
			<BadgeOutOfStockStyled
				badgeContent={"Out of stock"}
			>
				{children}
			</BadgeOutOfStockStyled>
		);
	}
};

export default BadgeOutOfStock;
