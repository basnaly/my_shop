import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";

const initialState = {
    userId: '',
    username: '',
    email: '',
    authError: '',
    isAuthLoading: false,
	address: {
		district: '',
		city: '',
		street: '',
		buildNumber: '',
		appartment: '',
		phone: '',
	},
	isSavingAddress: false,
	addressError: '',
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
			let address = result?.data?.address;

			return {userId, userUsername, userEmail, address};  

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
			let address = result?.data?.address;

			return {userId, userUsername, userEmail, address};  

		} catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const SaveUserAddress = createAsyncThunk(
	"user/SaveUserAddress",

	async ({district, city, street, buildNumber, appartment, phone}, thunkAPI) => {

		try {
			const result = await axios.post("/user/save-address", {
				district, city, street, buildNumber, appartment, phone
			}, config());
			
			return {district, city, street, buildNumber, appartment, phone};  // action.payload for fullfiled
			
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
			state.address = action.payload.address;
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
			state.address = action.payload.address;
			state.authError = "";
		});
		builder.addCase(CheckUserWithBackend.rejected, (state, action) => {
			state.isAuthLoading = false;
			state.userId = "";
            state.username = "";
            state.email = "";
			state.authError = action.payload;
		});

		builder.addCase(SaveUserAddress.pending, (state) => {
			state.isSavingAddress = true;
		});

		builder.addCase(SaveUserAddress.fulfilled, (state, action) => {
			console.log(action.payload)
			state.isSavingAddress = false;
			state.address.district = action.payload.district;
			state.address.city = action.payload.city;
            state.address.street = action.payload.street;
            state.address.buildNumber = action.payload.buildNumber;
			state.address.appartment = action.payload.appartment;
			state.address.phone = action.payload.phone;
			state.addressError = "";
		});
		builder.addCase(SaveUserAddress.rejected, (state, action) => {
			state.isSavingAddress = false;
			state.address.district = "";
			state.address.city = "";
            state.address.street = "";
            state.address.buildNumber = "";
			state.address.appartment = "";
			state.address.phone = "";
			state.addressError = action.payload;
		});
	},
});

export default UserRedux.reducer;
export const { SetAuthError, ResetUser, CheckError } = UserRedux.actions