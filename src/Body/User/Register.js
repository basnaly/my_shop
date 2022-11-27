import React, { useEffect, useState } from "react";

import { Dialog, DialogActions, DialogContent, TextField } from "@mui/material";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterWithBackend, SetAuthError } from "../Redux/UserRedux";
import { AuthButton, DialogTitleStyled, ErrorStyled, PinkButton, YellowButton } from "../../styles/MuiStyles";
import PasswordInputEye from "./PasswordInputEye";
import { useSelector } from "react-redux";
import { validatePassword } from "../../constants";

const Register = () => {

	const userId = useSelector((state) => state?.user?.userId);
	const authError = useSelector((state) => state?.user?.authError);
	const isAuthLoading = useSelector((state) => state?.user?.isAuthLoading);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [formOpen, setFormOpen] = useState(false);

	const openForm = () => setFormOpen(true);
	const closeForm = () => setFormOpen(false);

	const dispatch = useDispatch();

	// const navigate = useNavigate();

	const Submit = () => {
		if (!username || !email || !password) {
			dispatch(
				SetAuthError("Username, email and password cannot be empty")
			);
			return;
		}

		const isPasswordValid = validatePassword(password);

		if (!isPasswordValid) {
			dispatch(SetAuthError("Password is not valid"));
			return;
		}

		dispatch(RegisterWithBackend({username, email, password}));
		setPassword("");
	};

	const setPasswordWithValidation = (typedPassword) => {
		const passValidation = validatePassword(typedPassword);
		const validationError =
			"The password must contain lower and upper case letters, numbers and symbols, 8-12 letters";

		if (!passValidation) {
			dispatch(SetAuthError(validationError));
		} else {
			if (authError !== "") {
				// remove prev error
				dispatch(SetAuthError(""));
			}
		}
		setPassword(typedPassword);
	};

	const setEmailWithErrorClean = (email) => {
		if (authError !== "") {
			dispatch(SetAuthError("")); // remove prev error
		}
		setEmail(email); // typing into email field
	};

	const Cancel = () => {
        setUsername("");
		setEmail("");
		setPassword("");
		dispatch(SetAuthError(""));
		closeForm();
		// navigate("/");
	};

	// useEffect(() => {
	// 	if (userId) {
	// 		navigate("/home");
	// 	}
	// }, [userId]);

	return (
		<React.Fragment>
			<AuthButton
				variant={"outlined"}
				//className=" mx-3"
				onClick={openForm}
			>
				Register
			</AuthButton>

			<Dialog
				// boxShadow={20}
				// p={4}
				className="d-flex flex-column align-items-center"
				open={formOpen}
                maxWidth="md"
				onClose={closeForm}
			>
				<DialogTitleStyled className="form d-flex flex-column align-items-center">
					The register form
				</DialogTitleStyled>

				<ErrorStyled className="d-flex ">{authError}</ErrorStyled>

				<div className="d-flex align-items-center">
					<DialogContent
						className="d-flex align-items-center justify-content-center" // children
						//sx={{ width: "100%" }}
					>
						<TextField
							//className="regist mx-3"
							id="username"
							label="Username"
							type="username"
							color="success"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</DialogContent>
					<DialogContent
						className="d-flex align-items-center justify-content-center" // children
						//sx={{ width: "100%" }}
					>
						<TextField
							//className="regist mx-3"
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
						setPassword={setPasswordWithValidation}
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

export default Register;
