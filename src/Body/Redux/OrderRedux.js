import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";
import { CheckError } from "./UserRedux";

const initialState = {
	listOrders: [],
	isLoadingListOrders: false,
	error: "",
};

export const CreateOrder = createAsyncThunk(
	"order/CreateOrder",
	async (totalSum, thunkAPI) => {

		const orderData = {
			date: new Date(),
			totalQuantity: thunkAPI.getState().cart.listCartItems.length,
			totalSum, 
			items: thunkAPI.getState().cart.listCartItems,
		};

		try {
			const result = await axios.post(
				"/order/create-order",
				{ order: orderData },
				config()
				
			);

			thunkAPI.dispatch(GetListOrders());

		} catch (error) {
			thunkAPI.dispatch(CheckError(error?.response?.status))
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const GetListOrders = createAsyncThunk(
	"order/GetListOrders",
	async (_, thunkAPI) => {

		try {
			const result = await axios.get("/order/list-orders", 
			config()
			);

			let listOrders = result?.data?.listOrders;

			return listOrders;

		} catch (error) {
			thunkAPI.dispatch(CheckError(error?.response?.status))
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

const OrderRedux = createSlice({
	name: "Order",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(GetListOrders.pending, (state) => {
			state.isLoadingListOrders = true;
		});
		builder.addCase(GetListOrders.fulfilled, (state, action) => {
			state.isLoadingListOrders = false;
			state.listOrders = action.payload;
			state.error = "";
		});
		builder.addCase(GetListOrders.rejected, (state, action) => {
			state.isLoadingListOrders = false;
			state.listOrders = [];
			state.error = action.payload;
		});

		builder.addCase(CreateOrder.rejected, (state, action) => {
			state.isLoadingListOrders = false;
			state.listOrders = [];
			state.error = action.payload;
		});
	},
});

export default OrderRedux.reducer;
