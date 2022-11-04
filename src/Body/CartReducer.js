import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    listCartItems: [],
	isLoadingListCartItems: false,
	error: "",
}

// save basket items in reducer only
const CartRedux = createSlice({
	name: "Cart",
	initialState,
    reducers: {
        AddNewCartItem: (state, action) => {
			let existItem = state.listCartItems.find(el => el.itemName === action.payload.itemName)
			if (existItem) {
				existItem.quantity += 1 
				existItem.total = +(existItem.price * existItem.quantity).toFixed(2)
				// console.log(current(existItem))
			}
			else {
				state.listCartItems.push(action.payload);
			}
        },
		AddQuantityItem: (state, action) => {
			let existItem = state.listCartItems[action.payload]
			existItem.quantity += 1 	
			existItem.total = +(existItem.price * existItem.quantity).toFixed(2)
		},
		RemoveQuantityItem: (state, action) => {
			let existItem = state.listCartItems[action.payload]
			if (existItem.quantity > 1) {
			existItem.quantity -= 1 	
			existItem.total = +(existItem.price * existItem.quantity).toFixed(2)
			} 
			else {
				state.listCartItems.splice(action.payload, 1)
			}
		},
	}
});

export default CartRedux.reducer;
export const { AddNewCartItem, AddQuantityItem, RemoveQuantityItem } = CartRedux.actions

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


		// ResetUser: (state, action) => {
        //     state.userId = undefined;
		// 	state.username = undefined;
		// 	state.email = undefined;
		// }

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


// export default CartRedux.reducer;
// export const { AddNewCartItem, AddQuantityItem, RemoveQuantityItem } = CartRedux.actions
