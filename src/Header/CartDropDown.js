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
	PaperStyled,
	TitleCartStyled,
	TotalStyled,
	TotalSumStyled,
	YellowButton,
} from "../styles/MuiStyles";
import { useDispatch, useSelector } from "react-redux";
import ListCartBox from "../Body/Cart/ListCartBox";
import { useNavigate } from "react-router";
import { CreateOrder } from "../Body/OrderRedux";
import { ClearCart, GetCartList } from "../Body/CartRedux";
import { DELIVERY_PRICE } from "../constants";

const CartDropDown = () => {

	const username = useSelector((state) => state?.user?.username);
	const listCartItems = useSelector((state) => state?.cart?.listCartItems);

	const userDistrict = useSelector((state) => state?.user?.address?.district);
	const deliveryPrice = DELIVERY_PRICE[userDistrict]
	// const listOrders = useSelector((state) => state?.order?.listOrders);

	const address = useSelector((state) => state?.user?.address);
	const isAddressExists =
		!!address.city &&
		!!address.street &&
		!!address.buildNumber &&
		!!address.phone;

	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const totalSum = (+deliveryPrice + +listCartItems
		.reduce((prev, curr) => prev + curr.total, 0))
		.toFixed(2);

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
									<TotalStyled>
										Total:
										<TotalSumStyled className="mx-2">
											{totalSum}
										</TotalSumStyled>
										€
									</TotalStyled>

									<hr className="mx-2 my-1 w-100" />

									<div>
										<TitleCartStyled className="text-center mb-2">
											Your cart:
										</TitleCartStyled>

										<ListCartBox deliveryPrice={deliveryPrice}/>
									</div>

									<YellowButton
										variant={"outlined"}
										className="mt-3 mb-2"
										onClick={createOrder}
										disabled={
											listCartItems.length === 0 ||
											!isAddressExists
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
