import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { LoginWithBackend, SetAuthError } from "../UserRedux";
import { AuthButton, DialogTitleStyled, ErrorStyled, GreenFormButton, PinkButton, RedFormButton, YellowButton } from "../../styles/MuiStyles";
import PasswordInputEye from "./PasswordInputEye";

const Login = () => {

	// const userId = useSelector((state) => state?.user?.userId);
	const authError = useSelector((state) => state?.user?.authError);
	const isAuthLoading = useSelector((state) => state?.user?.isAuthLoading);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [formOpen, setFormOpen] = useState(false);

	const openForm = () => setFormOpen(true);
	const closeForm = () => setFormOpen(false);

	const dispatch = useDispatch();

	// const navigate = useNavigate();

	const Submit = () => {
		if (!email || !password) {
			dispatch(
				SetAuthError("Email and password cannot be empty")
			);
			return;
		}

		dispatch(LoginWithBackend({email, password}));
		setPassword("");
	};

	const setEmailWithErrorClean = typedEmail => {
		if (authError !== "") {
			dispatch(SetAuthError("")); // remove prev error
		}
		setEmail(typedEmail); // typing into email field
	};

	const Cancel = () => {
		setEmail("");
		setPassword("");
		dispatch(SetAuthError(""));
		closeForm();
	};

	return (
		<React.Fragment>
			<AuthButton
				variant={"outlined"}
                className="ms-4"
				onClick={openForm}
			>
				Log in
			</AuthButton>

			<Dialog
				className="d-flex flex-column align-items-center"
				open={formOpen}
                maxWidth="md"
				onClose={closeForm}
			>
				<DialogTitleStyled className="form d-flex flex-column align-items-center">
					The log in form
				</DialogTitleStyled>

				<ErrorStyled className="d-flex ">{authError}</ErrorStyled>

				<div className="d-flex align-items-center">
					<DialogContent
						className="d-flex align-items-center justify-content-center" // children
					>
						<TextField
							id="email"
							label="Email"
							type="email"
							color="success"
							value={email}
							onChange={(e) =>
								setEmailWithErrorClean(e.target.value)
							}
						/>
					</DialogContent>

					<PasswordInputEye
						password={password}
						setPassword={setPassword}
					/>
				</div>

				<DialogActions className="d-flex align-items-center justify-content-center">
					<YellowButton
						data-testid="submit-button"
						variant={"outlined"}
						className="mt-1 mx-3 mb-3"
						disabled={authError || isAuthLoading}
						onClick={Submit}
					>
						{isAuthLoading ? "Loading" : "Submit"}
					</YellowButton>

					<PinkButton
						data-testid="cancel-button"
						variant={"outlined"}
						className="mt-1 mx-3 mb-3"
						onClick={Cancel}
					>
						Cancel
					</PinkButton>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default Login;
