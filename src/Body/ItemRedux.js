import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";

const initialState = {
	listItems: [],
	isLoadingListItems: false,
	error: "",
};

export const AddNewItem = createAsyncThunk(
	"item/AddNewItem",
	async ({ itemName, image, price, unit, note }, thunkAPI) => {

		const itemData = {
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
			console.log(result)

			thunkAPI.dispatch(GetListItems());
		} catch (error) {
			console.log(error)
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const GetListItems = createAsyncThunk(
	"note/GetListItems",
	async (_, thunkAPI) => {

		try {
			const result = await axios.get("/item/list-items", 
			config()
			);

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
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const SaveEditedItem = createAsyncThunk(
	"item/SaveEditedItem",
	async ({ itemId, itemName, image, price, unit, note }, thunkAPI) => {

		const editedItemData = {
			itemName, 
			image,
			price, 
			unit,
			note,
		}

		try {
			const result = await axios.post(
				`/item/edit?itemId=${itemId}`,
				{ item: editedItemData },
				config()
			);

			thunkAPI.dispatch(GetListItems());

		} catch (error) {
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
