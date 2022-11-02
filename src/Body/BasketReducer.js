import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listBasketItems: [],
	isLoadingListBasketItems: false,
	error: "",
}

// export const AddNewBasketItem = createAsyncThunk(
// 	"basket/AddNewBasketItem",
// 	async ({ itemName, image, price, unit, note, quantity }, thunkAPI) => {

// 		const basketItemData = {
// 			itemName, 
// 			image,
// 			price, 
// 			unit,
// 			note,
//             quantity
// 		};

// 		try {
// 			const result = await axios.post(
// 				"/basket/add",
// 				{ item: basketItemData },
// 				config()
				
// 			);
// 			console.log(result)

// 			thunkAPI.dispatch(GetListBasketItems());
// 		} catch (error) {
// 			console.log(error)
// 			return thunkAPI.rejectWithValue(error.response.data.message);
// 		}
// 	}
// );

// export const GetListBasketItems = createAsyncThunk(
// 	"basket/GetListBasketItems",
// 	async (_, thunkAPI) => {

// 		try {
// 			const result = await axios.get("/basket/basket-items", 
// 			config()
// 			);

// 			let listBasketItems = result?.data?.listBasketItems;

// 			return listBasketItems;

// 		} catch (error) {
// 			return thunkAPI.rejectWithValue(error.response.data.message);
// 		}
// 	}
// );

const BasketRedux = createSlice({
	name: "Basket",
	initialState,
    reducers: {
        AddNewBasketItem: (state, action) => {
            state.listBasketItems.push(action.payload);
            // state.isLoadingListBasketItems = false
        },
		// ResetUser: (state, action) => {
        //     state.userId = undefined;
		// 	state.username = undefined;
		// 	state.email = undefined;
		// }
    },
	// extraReducers: (builder) => {
	// 	builder.addCase(GetListItems.pending, (state) => {
	// 		state.isLoadingListItems = true;
	// 	});
	// 	builder.addCase(GetListItems.fulfilled, (state, action) => {
	// 		state.isLoadingListItems = false;
	// 		state.listItems = action.payload;
	// 		state.error = "";
	// 	});
	// 	builder.addCase(GetListItems.rejected, (state, action) => {
	// 		state.isLoadingListItems = false;
	// 		state.listItems = [];
	// 		state.error = action.payload;
	// 	});

	// 	builder.addCase(AddNewItem.rejected, (state, action) => {
	// 		state.isLoadingListItems = false;
	// 		state.listItems = [];
	// 		state.error = action.payload;
	// 	});

	// 	builder.addCase(DeleteItem.rejected, (state, action) => {
	// 		state.isLoadingListItems = false;
	// 		state.listItems = [];
	// 		state.error = action.payload;
	// 	});

	// 	builder.addCase(SaveEditedItem.rejected, (state, action) => {
	// 		state.isLoadingListItems = false;
	// 		state.listItems = [];
	// 		state.error = action.payload;
	// 	});
	// },
});

export default BasketRedux.reducer;
export const { AddNewBasketItem } = BasketRedux.actions
