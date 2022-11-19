import React, { useId, useState } from "react";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordInputEye = ({ password, setPassword, mt = 2 }) => {

	const [showPassword, setShowPassword] = useState(false);

	const id = useId(); // auto generate id for login and register components
	
	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<FormControl
			//sx={{ width: "100%" }}
			variant="outlined"
			className="d-flex align-items-center justify-content-center"
			data-testid="password-container"
		>
			<InputLabel
				htmlFor={id} // different id for different instances
				className="mx-3"
			>
				Password
			</InputLabel>

			<OutlinedInput
				id={id}
				type={showPassword ? "text" : "password"}
				className="mx-3"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				endAdornment={
					<InputAdornment position="end" >
						<IconButton
							data-testid="password-text"
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff sx={{width: '30px', color: '#FF1493'}}/> 
							: <Visibility sx={{width: '30px', color: '#FF1493'}}/>}
						</IconButton>
					</InputAdornment>
				}
				label="Password"
			/>
		</FormControl>
	);
};

export default PasswordInputEye;
