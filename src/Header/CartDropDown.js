import React, { useEffect, useState, useRef } from 'react'

import ShoppingBasketTwoToneIcon from '@mui/icons-material/ShoppingBasketTwoTone';
import { ClickAwayListener, Grow, IconButton, MenuList, Popper } from '@mui/material';
import { PaperStyled } from '../styles/MuiStyles';
import { useSelector } from 'react-redux';
import Logout from '../Body/User/Logout';

const CartDropDown = () => {

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

  return (
    <div>
      <IconButton
				color="warning"
				ref={anchorRef}
				id="composition-button"
				aria-controls={open ? "composition-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				//onClick={handleToggle}
			>
				<ShoppingBasketTwoToneIcon 
					sx={{ color: "yellow", 
						fontSize: "36px",
						}}
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
								<MenuList
									className="d-flex flex-column align-items-center"
									autoFocusItem={open}
									id="composition-menu"
									aria-labelledby="composition-button"
									onKeyDown={handleListKeyDown}
								>

									<div>Hi, {username} !</div>

									<hr className="mx-2 my-1 w-100" />

									{/* <Logout /> */}

								</MenuList>
							</ClickAwayListener>
						</PaperStyled>
					</Grow>
				)}
			</Popper>
							
      
    </div>
  )
}

export default CartDropDown
