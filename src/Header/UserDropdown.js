import React, { useEffect, useRef, useState } from "react";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useSelector } from "react-redux";
import { ClickAwayListener, Grow, IconButton, MenuList, Popper, Typography } from "@mui/material";
import { PaperStyled, UserMenuStyled } from "../styles/MuiStyles";
import Logout from "../Body/User/Logout";
import { useNavigate } from "react-router";

const UserDropdown = () => {

	const username = useSelector((state) => state?.user?.username);

	const [open, setOpen] = useState(false);

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

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);

	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	const navigate = useNavigate()

	const navigateOrders = () => {
		navigate("/orders");
		setOpen(false)
	};

	return (
		<div className="d-flex flex-column align-items-center">
			<IconButton
				data-testid="user-icon"
				color="warning"
				ref={anchorRef}
				id="composition-button"
				aria-controls={open ? "composition-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				<PersonPinIcon 
					sx={{ color: "hotpink", fontSize: "36px" }}
				/>
			</IconButton>

			<Popper
				data-testid="user-dropdown"
				open={open}
				container={document.body}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="bottom-start"
				transition
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
                                <Typography>
								<MenuList
									className="d-flex flex-column align-items-center"
									autoFocusItem={open}
									id="composition-menu"
									aria-labelledby="composition-button"
									onKeyDown={handleListKeyDown}
								>
									<div>Hi {username} !</div>

									<hr className="mx-2 my-1 w-100" />

									<UserMenuStyled className="mt-2"
										onClick={navigateOrders}
									>
										My orders
									</UserMenuStyled>

									<Logout />
								</MenuList>
                                </Typography>
							</ClickAwayListener>
						</PaperStyled>
					</Grow>
				)}
			</Popper>
		</div>
	);
};

export default UserDropdown;
