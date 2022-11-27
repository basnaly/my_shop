import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";
import { CheckError } from "./UserRedux";

const initialState = {
	listItems: [],
	isLoadingListItems: false,
	error: "",
};

export const AddNewItem = createAsyncThunk(
	"item/AddNewItem",
	async (
		{ category, outOfStock, itemName, image, price, unit, note },
		thunkAPI
	) => {
		const itemData = {
			category,
			outOfStock,
			itemName,
			image,
			price,
			unit,
			note,
		};

		try {
			const result = await axios.post(
				"/item/create",
				{ item: itemData },
				config()
			);
			console.log(result);

			thunkAPI.dispatch(GetListItems());
		} catch (error) {
			thunkAPI.dispatch(CheckError(error?.response?.status));
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const GetListItems = createAsyncThunk(
	"item/GetListItems",
	async (_, thunkAPI) => {
		try {
			const result = await axios.get("/item/list-items", config());

			let listItems = result?.data?.listItems;

			return listItems;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const DeleteItem = createAsyncThunk(
	"item/DeleteItem",
	async (itemId, thunkAPI) => {
		try {
			const result = await axios.delete(
				`/item/delete-item?itemId=${itemId}`,
				config()
			);

			thunkAPI.dispatch(GetListItems());
		} catch (error) {
			thunkAPI.dispatch(CheckError(error?.response?.status));
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const SaveEditedItem = createAsyncThunk(
	"item/SaveEditedItem",
	async (
		{
			itemId,
			category,
			outOfStock,
			itemName,
			image,
			price,
			unit,
			note,
			discount: { 
				discountAmount, 
				discountPrice 
			},
		},
		thunkAPI
	) => {
		const editedItemData = {
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
		};

		try {
			const result = await axios.post(
				`/item/edit?itemId=${itemId}`,
				{ item: editedItemData },
				config()
			);

			thunkAPI.dispatch(GetListItems());
		} catch (error) {
			thunkAPI.dispatch(CheckError(error?.response?.status));
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

const ItemRedux = createSlice({
	name: "Item",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(GetListItems.pending, (state) => {
			state.isLoadingListItems = true;
		});
		builder.addCase(GetListItems.fulfilled, (state, action) => {
			state.isLoadingListItems = false;
			state.listItems = action.payload;
			state.error = "";
		});
		builder.addCase(GetListItems.rejected, (state, action) => {
			state.isLoadingListItems = false;
			state.listItems = [];
			state.error = action.payload;
		});

		builder.addCase(AddNewItem.rejected, (state, action) => {
			state.isLoadingListItems = false;
			state.listItems = [];
			state.error = action.payload;
		});

		builder.addCase(DeleteItem.rejected, (state, action) => {
			state.isLoadingListItems = false;
			state.listItems = [];
			state.error = action.payload;
		});

		builder.addCase(SaveEditedItem.rejected, (state, action) => {
			state.isLoadingListItems = false;
			state.listItems = [];
			state.error = action.payload;
		});
	},
});

export default ItemRedux.reducer;
