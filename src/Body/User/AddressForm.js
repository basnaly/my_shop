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

import {
	PinkButton,
	UserMenuStyled,
	YellowButton,
} from "../../styles/MuiStyles";
import { useDispatch, useSelector } from "react-redux";
import { SaveUserAddress } from "../Redux/UserRedux";
import { DISTRICT } from "../../constants";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const AddressForm = () => {

	const userAddress = useSelector((state) => state?.user?.address);

	const [district, setDistrict] = useState(userAddress.district);
	const [city, setCity] = useState(userAddress.city);
	const [street, setStreet] = useState(userAddress.street);
	const [buildNumber, setBuildNumber] = useState(userAddress.buildNumber);
	const [appartment, setAppartment] = useState(userAddress.appartment);
	const [phone, setPhone] = useState(userAddress.phone);

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const openDialog = () => setIsDialogOpen(true);
	const closeDialog = () => setIsDialogOpen(false);

	const dispatch = useDispatch();

	const saveAddress = () => {
		dispatch(
			SaveUserAddress({
				district,
				city,
				street,
				buildNumber,
				appartment,
				phone,
			})
		);
		setIsDialogOpen(false);
	};

	const closeForm = () => {
		setIsDialogOpen(false);
	};

	return (
		<React.Fragment>
			<UserMenuStyled className="mt-2" onClick={openDialog}>
				My address
			</UserMenuStyled>

			<Dialog
				open={isDialogOpen}
				TransitionComponent={Transition}
				onClose={closeDialog}
			>
				<DialogTitle variant="h6" component="h2" className="pb-1 m-1">
					My address form
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
						<div className="d-flex align-items-center">
							<TextField
								autoFocus
								margin="dense"
								id="city"
								label="City name"
								type="text"
								variant="outlined"
								sx={{ width: "200px" }}
								value={city}
								onChange={(e) => {
									setCity(e.target.value);
								}}
							/>

							<TextField
								margin="dense"
								className="ms-3"
								id="district"
								select
								variant="outlined"
								size="small"
								label="District"
								sx={{ width: "86px", padding: '0 2px'}}
								value={district}
								onChange={(e) => setDistrict(e.target.value)}
							>
								{DISTRICT.map((el) => (
									<MenuItem key={el} value={el}>
										{el}
									</MenuItem>
								))}
							</TextField>
						</div>

						<TextField
							// autoFocus
							margin="dense"
							id="street"
							label="Street name"
							type="text"
							variant="outlined"
							sx={{ width: "300px" }}
							value={street}
							onChange={(e) => setStreet(e.target.value)}
						/>

						<div className="d-flex align-items-center">
							<TextField
								// autoFocus
								margin="dense"
								id="buildNumber"
								label="Building number"
								type="text"
								variant="outlined"
								sx={{ width: "155px" }}
								value={buildNumber}
								onChange={(e) => setBuildNumber(e.target.value)}
							/>

							<TextField
								className="ms-3"
								margin="dense"
								id="appartment"
								label="Appartment number"
								type="text"
								variant="outlined"
								sx={{ width: "130px" }}
								value={appartment}
								onChange={(e) => setAppartment(e.target.value)}
							/>
						</div>

						<TextField
							margin="dense"
							id="phone"
							label="Phone"
							type="tel"
							variant="outlined"
							sx={{ width: "300px" }}
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
				</DialogContent>

				<DialogActions className="d-flex align-items-center mt-0 mb-3">
					<YellowButton
						variant={"outlined"}
						className=" mx-3"
						onClick={saveAddress}
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

export default AddressForm;
