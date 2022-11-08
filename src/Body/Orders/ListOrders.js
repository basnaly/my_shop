import moment from "moment";
import React from "react";
import { LightYellowButton, OrderDataStyled, SpanOrderStyled } from "../../styles/MuiStyles";

const ListOrders = ({ order }) => {

	const formatedDay = moment(order.date).format("ddd MMM Do YY");

	return (
		<OrderDataStyled className="d-flex align-items-center mt-2">
			<div className="mx-2">Date: 
                <SpanOrderStyled>{formatedDay}</SpanOrderStyled>
            </div>

			<div className="mx-2">Items: 
                <SpanOrderStyled>{order.totalQuantity}</SpanOrderStyled>
            </div>

			<div className="mx-2">Total sum: 
                <SpanOrderStyled>{order.totalSum}</SpanOrderStyled>
                €
            </div>

			<LightYellowButton
				variant={"outlined"}
				className="mx-2"
				// onClick={backHome}
			>
				Details
			</LightYellowButton>
		</OrderDataStyled>
	);
};

export default ListOrders;
