import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";

const initialState = {
    userId: '',
    username: '',
    email: '',
    authError: '',
    isAuthLoading: false,
}

export const RegisterWithBackend = createAsyncThunk(
	"user/RegisterWithBackend",
	async ({username, email, password}, thunkAPI) => {

		try {
			const result = await axios.post("/user/register", {
				username,
				email,
				password,
			});

			let token = result?.data?.accessToken;
			sessionStorage.setItem("authToken", token);

			let userId = result?.data?.id;
			let userUsername = result?.data?.username;
			let userEmail = result?.data?.email;

			return {userId, userUsername, userEmail}; 

		} catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const LoginWithBackend = createAsyncThunk(
	"user/LoginWithBackend",
	async ({email, password}, thunkAPI) => {

		try {
			const result = await axios.post("/user/login", {
				email,
				password,
			});

			let token = result?.data?.accessToken;
			sessionStorage.setItem("authToken", token);

			let userId = result?.data?.id;
			let userUsername = result?.data?.username;
			let userEmail = result?.data?.email;

			return {userId, userUsername, userEmail};  

		} catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const CheckUserWithBackend = createAsyncThunk(
	"user/CheckUserWithBackend",
	async (_, thunkAPI) => {

		try {
			const result = await axios.get("/user/check-user", 
				config())

			let userId = result?.data?.id;
			let userUsername = result?.data?.username;
			let userEmail = result?.data?.email;

			return {userId, userUsername, userEmail};  

		} catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

const UserRedux = createSlice({
	name: "User",
	initialState,
    reducers: {
        SetAuthError: (state, action) => {
            state.authError = action.payload;
            state.isAuthLoading = false
        },
		ResetUser: (state, action) => {
            state.userId = undefined;
			state.username = undefined;
			state.email = undefined;
		},
		CheckError: (state, action) => {
			if (action?.payload === 401 || action?.payload === 403) {
				state.userId = undefined;
				state.username = undefined;
				state.email = undefined;
			}
		}
    },
	extraReducers: (builder) => {
		builder.addCase(RegisterWithBackend.pending, (state) => {
			state.isAuthLoading = true;
		});
		builder.addCase(RegisterWithBackend.fulfilled, (state, action) => {
			state.isAuthLoading = false;
			state.userId = action.payload.userId;
            state.username = action.payload.userUsername;
            state.email = action.payload.userEmail;
			state.authError = "";
		});
		builder.addCase(RegisterWithBackend.rejected, (state, action) => {
			state.isAuthLoading = false;
			state.userId = "";
            state.username = "";
            state.email = "";
			state.authError = action.payload;
		});

        builder.addCase(LoginWithBackend.pending, (state) => {
			state.isAuthLoading = true;
		});
		builder.addCase(LoginWithBackend.fulfilled, (state, action) => {
			state.isAuthLoading = false;
			state.userId = action.payload.userId;
            state.username = action.payload.userUsername;
            state.email = action.payload.userEmail;
			state.authError = "";
		});
		builder.addCase(LoginWithBackend.rejected, (state, action) => {
			state.isAuthLoading = false;
			state.userId = "";
            state.username = "";
            state.email = "";
			state.authError = action.payload;
		});

        builder.addCase(CheckUserWithBackend.pending, (state) => {
			state.isAuthLoading = true;
		});
		builder.addCase(CheckUserWithBackend.fulfilled, (state, action) => {
			state.isAuthLoading = false;
			state.userId = action.payload.userId;
            state.username = action.payload.userUsername;
            state.email = action.payload.userEmail;
			state.authError = "";
		});
		builder.addCase(CheckUserWithBackend.rejected, (state, action) => {
			state.isAuthLoading = false;
			state.userId = "";
            state.username = "";
            state.email = "";
			state.authError = action.payload;
		});
	},
});

export default UserRedux.reducer;
export const { SetAuthError, ResetUser, CheckError } = UserRedux.actions