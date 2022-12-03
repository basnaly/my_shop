import React, { useEffect, useState, useRef } from "react";

import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import {
	Badge,
	ClickAwayListener,
	Grow,
	IconButton,
	MenuList,
	Popper,
} from "@mui/material";
import {
	AddAddressStyled,
	DeliveryStyled,
	LoginStyled,
	PaperStyled,
	TitleCartStyled,
	YellowButton,
} from "../styles/MuiStyles";
import { useDispatch, useSelector } from "react-redux";
import ListCartBox from "../Body/Cart/ListCartBox";
import { useNavigate } from "react-router";
import { CreateOrder } from "../Body/Redux/OrderRedux";
import { ClearCart, GetCartList } from "../Body/Redux/CartRedux";
import { DELIVERY_PRICE, DISCOUNT } from "../constants";
import DeliveryTime from "./DeliveryTime";
import TotalSum from "./TotalSum";


const CartDropDown = () => {

	const username = useSelector((state) => state?.user?.username);
	const listCartItems = useSelector((state) => state?.cart?.listCartItems);

	const userDistrict = useSelector((state) => state?.user?.address?.district);
	const deliveryPrice = DELIVERY_PRICE[userDistrict];

	const address = useSelector((state) => state?.user?.address);
	const isAddressExists =
		!!address.city &&
		!!address.street &&
		!!address.buildNumber &&
		!!address.phone;

	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const cartSum = listCartItems.reduce((prev, curr) => prev + curr.total, 0)

	let discountSum;
	let discountPersent;

    if (cartSum >= DISCOUNT[2].sum) {
        discountSum = +(cartSum * DISCOUNT[2].discount).toFixed(2)
		discountPersent = DISCOUNT[2].discount * 100
    } else if (cartSum >= DISCOUNT[1].sum) {
        discountSum = +(cartSum * DISCOUNT[1].discount).toFixed(2)
		discountPersent = DISCOUNT[1].discount * 100
    } else {
        discountSum = +(cartSum * DISCOUNT[0].discount).toFixed(2)  
		discountPersent = DISCOUNT[0].discount * 100
    }

	const totalSum = +(cartSum - discountSum + deliveryPrice).toFixed(2);

	const anchorRef = useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === "Escape") {
			setOpen(false);
		}
	}

	const createOrder = () => {
		navigate("/orders");
		setOpen(false);
		dispatch(CreateOrder(totalSum));
		dispatch(ClearCart());
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	useEffect(() => {
		dispatch(GetCartList());
	}, [username]);

	return (
		<div>
			<IconButton
				color="warning"
				ref={anchorRef}
				id="composition-button"
				aria-controls={open ? "composition-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				<Badge badgeContent={listCartItems.length}>
					<ShoppingBasketRoundedIcon
						sx={{ color: "yellow", fontSize: "36px" }}
					/>
				</Badge>
			</IconButton>

			<Popper
				data-testid="user-dropdown"
				open={open}
				container={document.body}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="bottom-start"
				transition
				sx={{ zIndex: 1 }}
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === "bottom-start"
									? "left top"
									: "left bottom",
						}}
					>
						<PaperStyled
							className="d-flex flex-column align-items-center"
							elevation={8}
						>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									className="d-flex flex-column align-items-center"
									autoFocusItem={open}
									id="composition-menu"
									aria-labelledby="composition-button"
									onKeyDown={handleListKeyDown}
								>
									{!username ? (
										<LoginStyled>Please login!</LoginStyled>
									) : (
										<div className="d-flex flex-column align-items-center">

											<TotalSum totalSum={totalSum} isAddressExists={isAddressExists}/>

											<div>
												<TitleCartStyled className="text-center mb-2">
													Your cart:
												</TitleCartStyled>

												<ListCartBox />
											</div>

											<DeliveryTime deliveryPrice={ deliveryPrice} isAddressExists={isAddressExists}/>

											<DeliveryStyled className="w-100 text-start">
        										Discount {discountPersent}% = {discountSum}€
    										</DeliveryStyled>

											<YellowButton
												variant={"outlined"}
												className="mt-3 mb-2"
												onClick={createOrder}
												disabled={
													listCartItems.length ===
														0 || !isAddressExists
												}
											>
												Order
											</YellowButton>

											{!isAddressExists ? (
												<AddAddressStyled>
													Please add your address!
												</AddAddressStyled>
											) : (
												""
											)}
										</div>
									)}
								</MenuList>
							</ClickAwayListener>
						</PaperStyled>
					</Grow>
				)}
			</Popper>
		</div>
	);
};

export default CartDropDown;
