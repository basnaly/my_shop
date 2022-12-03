import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetListItems } from "../Redux/ItemRedux";
import BadgeOutOfStock from "./BadgeOutOfStock";
import ListItemBox from "./ListItemBox";

const ListItems = ({ selectedTab }) => {
    
	const listItems = useSelector((state) => state?.item?.listItems);

	const filteredListItems =
		selectedTab === "Discounts"
			? listItems.filter((el) => el.discount.discountPrice)
			: listItems.filter((el) => el.category === selectedTab);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(GetListItems());
	}, []);

	return (
		<div className="d-flex flex-column align-items-center overflow-auto h-100">
			{listItems.length === 0 ? (
				<div>You don't have any list items yet!</div>
			) : (
				<div className="d-flex flex-wrap align-items-center justify-content-evenly">
					{filteredListItems.map((el) => (
						<BadgeOutOfStock
							key={el.id}
							isOutOfStock={el.outOfStock}
						>
							<ListItemBox item={el} />
						</BadgeOutOfStock>
					))}
				</div>
			)}
		</div>
	);
};

export default ListItems;
