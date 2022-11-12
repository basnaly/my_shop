import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderTitleStyled } from "../../styles/MuiStyles";
import { GetListOrders } from "../OrderRedux";
import ListOrders from "./ListOrders";

const OrderScreen = () => {

	const userId = useSelector((state) => state.user.userId);
    const listOrders = useSelector(state => state?.order?.listOrders)

    const dispatch = useDispatch();

    useEffect(() => {
		dispatch(GetListOrders())
	}, [userId])


	return (
		<div className="d-flex flex-column align-items-center">
			<OrderTitleStyled className="text-center m-2">
                Your orders:
            </OrderTitleStyled>

            {
                listOrders.map(order => 
                    <ListOrders key={order.id} order={order}/> 
                )
            }
		</div>
	);
};

export default OrderScreen;
