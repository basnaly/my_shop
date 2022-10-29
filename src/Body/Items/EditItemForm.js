import React, { useState } from "react";

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	MenuItem,
	TextField,
} from "@mui/material";
import Slide from "@mui/material/Slide";

import { AddNewButton, PinkButton, YellowButton } from "../../styles/MuiStyles";
import { SaveEditedItem } from "../ItemRedux";
import { useDispatch } from "react-redux";
import { UNITS } from "../../constants";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const EditItemForm = ({item}) => {

    const [itemName, setItemName] = useState(item.itemName);
	const [image, setImage] = useState(item.image);
	const [price, setPrice] = useState(item.price);
	const [unit, setUnit] = useState(item.unit);
	const [note, setNote] = useState(item.note);

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const openDialog = () => setIsDialogOpen(true);
	const closeDialog = () => setIsDialogOpen(false);

	const dispatch = useDispatch();

    const saveCorrectedItem = () => {
        dispatch(SaveEditedItem({ itemId: item.id, itemName, image, price, unit, note }))
        setIsDialogOpen(false)
    }

    const closeForm = () => {
        setIsDialogOpen(false)
    }

	return (
		<React.Fragment>
			<YellowButton
				data-testid="delete-button-element"
				variant={"outlined"}
				className="mx-3 mb-3"
				onClick={openDialog}
			>
				Edit
			</YellowButton>

			<Dialog
				open={isDialogOpen}
				TransitionComponent={Transition}
				onClose={closeDialog}
				// aria-labelledby="alert-dialog-title"
				// aria-describedby="alert-dialog-description"
			>
				<DialogTitle
					// id="modal-modal-title"
					variant="h6"
					component="h2"
					className="pb-1 m-1"
				>
					Edit item form
				</DialogTitle>

				<hr className="mx-2 my-0" />

				<DialogContent className="pb-3">
					<DialogContentText
						id="alert-dialog-slide-description"
						className="text-center mt-0 mb-3"
					>
						Please fill all the fields
					</DialogContentText>

					<div className="d-flex flex-column align-items-center m-1">
						<TextField
							autoFocus
							margin="dense"
							id="itemName"
							label="Item's name"
							type="text"
							variant="outlined"
							sx={{ width: "300px" }}
							value={itemName}
							onChange={(e) => setItemName(e.target.value)}
						/>

						<TextField
							autoFocus
							margin="dense"
							id="itemImage"
							label="Item's image"
							type="url"
							variant="outlined"
							sx={{ width: "300px" }}
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>

						<div className="d-flex align-items-center">
							<TextField
								// autoFocus
								margin="dense"
								id="price"
								label="Item's price"
								type="number"
								variant="outlined"
								sx={{ width: "150px" }}
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>

							<div className="mx-2">per</div>

							<TextField
                                margin="dense"
								id="outlined-select-currency"
								select
								label="Select unit"
                                sx={{ width: "110px" }}
								value={unit}
								onChange={e => setUnit(e.target.value)}
							>
								{UNITS.map((el) => (
									<MenuItem
										key={el}
										value={el}
									>
										{el}
									</MenuItem>
								))}
							</TextField>
						</div>

						<TextField
							margin="dense"
							id="note"
							label="Notes"
							type="text"
							multiline
							maxRows={4}
							sx={{ width: "300px" }}
							value={note}
							onChange={(e) => setNote(e.target.value)}
							variant="outlined"
						/>
					</div>
				</DialogContent>

				<DialogActions className="d-flex align-items-center mt-0 mb-3">
					<YellowButton
						variant={"outlined"}
						className=" mx-3"
						onClick={saveCorrectedItem}
					>
						Save
					</YellowButton>

					<PinkButton
						data-testid="cancel-button-element"
						variant={"outlined"}
						className=" mx-3"
						onClick={closeForm}
					>
						Cancel
					</PinkButton>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default EditItemForm;
