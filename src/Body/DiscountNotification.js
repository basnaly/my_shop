import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DiscountButton, FooterStyled } from "../styles/MuiStyles";

const DiscountNotification = () => {

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (
		event,
		reason
	) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const action = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<FooterStyled className="d-flex justify-content-center align-items-center">
			<DiscountButton onClick={handleClick}>
                Our discounts today!
            </DiscountButton>
			<Snackbar
				open={open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				// autoHideDuration={6000}
				message={
                    <div>
                        <div>On order more than 15 €, discount 5%</div>
                        <div>On order more than 25 €, discount 7%</div>
                        <div>On order more than 50 €, discount 10%</div>
                    </div>

                }
                onClose={handleClose} 
				action={action}
			>     
            </Snackbar>
		</FooterStyled>
	);
};

export default DiscountNotification;
