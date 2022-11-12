import React, { useState } from "react";
import { DialogTitleStyled, LightYellowButton } from "../../styles/MuiStyles";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { DialogTitle } from "@mui/material";
import DetailsOrder from "./DetailsOrder";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const DialogDetailsOrder = ({ items }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const openDialog = () => {
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
	};

	const openOrderItems = () => {
		openDialog();
	};

	return (
		<React.Fragment>
			<LightYellowButton
				variant={"outlined"}
				className="mx-2"
				onClick={openOrderItems}
			>
				Details
			</LightYellowButton>

			<Dialog
				open={isDialogOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={closeDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				maxWidth="lg"
			>
				<DialogTitleStyled
					id="modal-modal-title"
					variant="h6"
					component="h2"
					className="pb-1 m-1"
				>
					Your order's details:
				</DialogTitleStyled>

				<hr className="mx-2 my-0" />

				<DialogContent>
					<DetailsOrder items={items} />
				</DialogContent>
			</Dialog>
		</React.Fragment>
	);
};

export default DialogDetailsOrder;
