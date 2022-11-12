import moment from "moment";
import React from "react";
import { OrderDataStyled, SpanOrderStyled } from "../../styles/MuiStyles";
import DialogDetailsOrder from "./DialogDetailsOrder";

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
                <SpanOrderStyled className="me-2">
					{order.totalSum}
				</SpanOrderStyled>
                €
            </div>

			<DialogDetailsOrder items={order.items}/>

		</OrderDataStyled>
	);
};

export default ListOrders;
