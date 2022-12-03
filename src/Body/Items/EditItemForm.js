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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slide from "@mui/material/Slide";

import { PinkButton, YellowButton } from "../../styles/MuiStyles";
import { SaveEditedItem } from "../Redux/ItemRedux";
import { useDispatch } from "react-redux";
import { CATEGORY, UNITS } from "../../constants";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const EditItemForm = ({ item }) => {
	
	const [category, setCategory] = useState(item.category);
	const [outOfStock, setOutOfStock] = useState(item.outOfStock);
	const [itemName, setItemName] = useState(item.itemName);
	const [image, setImage] = useState(item.image);
	const [price, setPrice] = useState(item.price);
	const [unit, setUnit] = useState(item.unit);
	const [note, setNote] = useState(item.note);

	const [discountAmount, setDiscountAmount] = useState(
		item.discount.discountAmount
	);
	const [discountPrice, setDiscountPrice] = useState(
		item.discount.discountPrice
	);

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const openDialog = () => setIsDialogOpen(true);
	const closeDialog = () => setIsDialogOpen(false);

	const dispatch = useDispatch();

	const saveCorrectedItem = () => {
		dispatch(
			SaveEditedItem({
				itemId: item.id,
				category,
				outOfStock,
				itemName,
				image,
				price,
				unit,
				note,
				discount: {
					discountAmount,
					discountPrice,
				},
			})
		);
		setIsDialogOpen(false);
	};

	const closeForm = () => {
		setIsDialogOpen(false);
	};

	const changeOutOfStock = e => {
		setOutOfStock(e.target.checked)

		if (e.target.checked) {
			setDiscountAmount('')
			setDiscountPrice('')
		}
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
			>
				<DialogTitle
					// id="modal-modal-title"
					variant="h6"
					component="h2"
					className="pb-1 m-1"
				>
					Edit item and add discount form
				</DialogTitle>

				<hr className="mx-2 my-0" />

				<DialogContent className="pb-3">
					<DialogContentText
						id="alert-dialog-slide-description"
						className="text-center mt-0 mb-3"
					>
						Edit form, please fill all the fields
					</DialogContentText>

					<div className="d-flex flex-column align-items-center">
						<div className="d-flex align-items-center">
							<TextField
								className="mb-3"
								margin="dense"
								id="outlined-select-currency"
								select
								size="small"
								label="Select categoty"
								sx={{ width: "200px" }}
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
								{CATEGORY.map((el) => (
									<MenuItem key={el} value={el}>
										{el}
									</MenuItem>
								))}
							</TextField>

							<FormControlLabel
								checked={outOfStock}
								onChange={ changeOutOfStock }
								control={
									<Checkbox
										sx={{
											"& .MuiSvgIcon-root": {
												fontSize: 22,
											},
										}}
									/>
								}
								label="Out of stock"
								labelPlacement="top"
							/>
						</div>

						<TextField
							autoFocus
							className="mb-3"
							margin="dense"
							id="itemName"
							label="Item's name"
							type="text"
							size="small"
							variant="outlined"
							sx={{ width: "320px" }}
							value={itemName}
							onChange={(e) => setItemName(e.target.value)}
						/>

						<TextField
							autoFocus
							className="mb-3"
							margin="dense"
							id="itemImage"
							label="Item's image"
							type="url"
							size="small"
							variant="outlined"
							sx={{ width: "320px" }}
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
								size="small"
								variant="outlined"
								sx={{ width: "150px" }}
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>

							<div className="mx-3">per</div>

							<TextField
								margin="dense"
								id="outlined-select-currency"
								select
								size="small"
								label="Select unit"
								sx={{ width: "110px" }}
								value={unit}
								onChange={(e) => setUnit(e.target.value)}
							>
								{UNITS.map((el) => (
									<MenuItem key={el} value={el}>
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
							size="small"
							multiline
							maxRows={4}
							sx={{ width: "320px" }}
							value={note}
							onChange={(e) => setNote(e.target.value)}
							variant="outlined"
						/>
					</div>

					<hr className="mx-2 my-3" />

					<DialogContentText
						id="alert-dialog-slide-description"
						className="text-center mt-0 mb-3"
					>
						Add discount form
					</DialogContentText>

					<div className="d-flex align-items-center justify-content-center">
						<TextField
							margin="dense"
							id="discount-price"
							label="Discount price"
							type="number"
							size="small"
							variant="outlined"
							sx={{ width: "120px" }}
							disabled={outOfStock}
							value={discountPrice}
							onChange={(e) => setDiscountPrice(e.target.value)}
						/>

						<div className="mx-2">€</div>

						<div className="mx-2">for</div>

						<TextField
							className="me-2"
							margin="dense"
							id="discount-amount"
							label="Amount"
							type="number"
							size="small"
							variant="outlined"
							sx={{ width: "100px" }}
							disabled={outOfStock}
							value={discountAmount}
							onChange={(e) => setDiscountAmount(e.target.value)}
						/>

						<div>{unit}</div>
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
