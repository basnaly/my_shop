import { useSelector } from "react-redux";
import {
	TotalDescriptionStyled,
	TotalStyled,
	TotalSumStyled,
} from "../styles/MuiStyles";

const TotalSum = ({ totalSum, isAddressExists }) => {
	
	const listItems = useSelector((state) => state?.item?.listItems);
	const cartItems = useSelector((state) => state?.cart?.listCartItems);

	const discountItems = listItems.filter((el) => el?.discount?.discountPrice);

	const a = cartItems?.map((el) => {
		const discountItem = discountItems.find(
			(item) =>
				el?.itemName === item?.itemName &&
				el?.quantity >= item?.discount?.discountAmount
		);
		if (!discountItem) {
			return el;
		} else {
			return {
				...el,
				total:
					(discountItem?.discount?.discountPrice /
						discountItem?.discount?.discountAmount) *
					el?.quantity,
			};
		}
	});
	console.log(a);

	if (!isAddressExists) {
		return "";
	}

	return (
		<>
			<TotalStyled>
				Total:
				<TotalDescriptionStyled>
					Your cart - discount + delivery =
				</TotalDescriptionStyled>
				<TotalSumStyled className="mx-2">{totalSum}</TotalSumStyled>€
			</TotalStyled>

			<hr className="mx-2 my-1 w-100" />
		</>
	);
};

export default TotalSum;
