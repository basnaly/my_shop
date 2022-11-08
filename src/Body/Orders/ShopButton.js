import React from "react";
import { useNavigate } from "react-router";
import { PinkButton } from "../../styles/MuiStyles";

const ShopButton = () => {
	const navigate = useNavigate();

	const backHome = () => {
		navigate("/");
	};

	return (
		<PinkButton
			variant={"outlined"}
			// className="mt-3 mb-2"
			onClick={backHome}
		>
			Back to shop
		</PinkButton>
	);
};

export default ShopButton;
