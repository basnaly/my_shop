import React, { useState } from "react";

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import Slide from "@mui/material/Slide";

import { useDispatch } from "react-redux";
import { ItemNameStyled, PinkButton, YellowButton } from "../../styles/MuiStyles";
import { DeleteItem, GetListItems } from "../ItemRedux";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const DeleteItemDialog = ({ item }) => {
	
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const openDeleteDialog = () => setIsDialogOpen(true);
	const closeDeleteDialog = () => setIsDialogOpen(false);

	const dispatch = useDispatch();

	const deleteItem = () => {
		dispatch(DeleteItem(item.id));
		dispatch(GetListItems())
	};

	return (
		<React.Fragment>
			<PinkButton
				data-testid="delete-button-element"
				variant={"outlined"}
				className=" mx-3 mb-3"
				onClick={openDeleteDialog}
			>
				Delete
			</PinkButton>

			<Dialog
				data-testid="delete-dialog-element"
				open={isDialogOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={closeDeleteDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle
					id="modal-modal-title"
					variant="h6"
					component="h2"
					className="pb-1 m-1"
				>
					Delete item
					<ItemNameStyled className="ps-2 d-inline-block">
						{item.itemName} ?
					</ItemNameStyled>
				</DialogTitle>

				<hr className="mx-2 my-0" />

				<DialogContent className="pb-3">
					<DialogContentText
						id="alert-dialog-slide-description"
						className="mt-0 mb-0"
					>
						Are you sure you want to delete the item?
					</DialogContentText>
				</DialogContent>

				<DialogActions className="d-flex align-items-center mt-0 mb-3">
					<YellowButton
						data-testid="cancel-button-element"
						variant={"outlined"}
						className=" mx-3"
						onClick={closeDeleteDialog}
					>
						Cancel
					</YellowButton>

					<PinkButton
						variant={"outlined"}
						className=" mx-3"
						onClick={deleteItem}
					>
						Delete
					</PinkButton>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default DeleteItemDialog;
