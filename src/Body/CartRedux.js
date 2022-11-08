import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

const initialState = {
	listCartItems: [],
	isLoadingListCartItems: false,
	error: "",
};

export const AddCartItem = createAsyncThunk(
	"cart/AddCartItem",
	async (
		{ itemName, image, price, unit, note, quantity, total },
		thunkAPI
	) => {
		const cartData = {
			itemName,
			image,
			price,
			unit,
			note,
			quantity,
			total,
		};

		const cartList = JSON.parse(
			JSON.stringify(thunkAPI.getState().cart.listCartItems)
		); // full copy listCartItems
		// [...thunkAPI.getState().cart.listCartItems] copy array only, without internal object

		let existItem = cartList.find((el) => el.itemName === itemName);
		if (existItem) {
			existItem.quantity += 1;
			existItem.total = +(existItem.price * existItem.quantity).toFixed(2);
		} else {
			cartList.push(cartData);
		}

		try {
			const result = await axios.post(
				"cart/update",
				{ listCartItems: cartList },
				config()
			);

			thunkAPI.dispatch(GetCartList());
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const GetCartList = createAsyncThunk(
	"cart/GetCartList",
	async (_, thunkAPI) => {
		console.log('object')
		try {
			const result = await axios.get("/cart/cart-list", config());

			let listCartItems = result?.data?.listCartItems;

			return listCartItems;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const AddQuantityItem = createAsyncThunk(
	"cart/AddQuantityItem",
	async (index, thunkAPI) => {

		const cartList = JSON.parse(
			JSON.stringify(thunkAPI.getState().cart.listCartItems)
		);

		let existItem = cartList[index];
		existItem.quantity += 1;
		existItem.total = +(existItem.price * existItem.quantity).toFixed(2);

		try {
			const result = await axios.post(
				"cart/update",
				{ listCartItems: cartList },
				config()
			);

			thunkAPI.dispatch(GetCartList());
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const RemoveQuantityItem = createAsyncThunk(
	"cart/RemoveQuantityItem",
	async (index, thunkAPI) => {

		const cartList = JSON.parse(
			JSON.stringify(thunkAPI.getState().cart.listCartItems)
		);

		let existItem = cartList[index];
		if (existItem.quantity > 1) {
			existItem.quantity -= 1;
			existItem.total = +(existItem.price * existItem.quantity).toFixed(
				2
			);
		} else {
			cartList.splice(index, 1);
		}

		try {
			const result = await axios.post(
				"cart/update",
				{ listCartItems: cartList },
				config()
			);

			thunkAPI.dispatch(GetCartList());
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const ClearCart = createAsyncThunk(
	"cart/ClearCart",
	async (_, thunkAPI) => {
		
		try {
			const result = await axios.post(
				"cart/update",
				{ listCartItems: [] },
				config()
			);

			thunkAPI.dispatch(GetCartList());
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

const CartRedux = createSlice({
	name: "Cart",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(AddCartItem.pending, (state) => {
			state.isLoadingListCartItems = true;
		});
		builder.addCase(AddCartItem.rejected, (state, action) => {
			state.isLoadingListCartItems = false;
			state.listCartItems = [];
			state.error = action.payload;
		});

		builder.addCase(GetCartList.pending, (state) => {
			state.isLoadingListCartItems = true;
		});
		builder.addCase(GetCartList.fulfilled, (state, action) => {
			state.isLoadingListCartItems = false;
			state.listCartItems = action.payload;
			state.error = "";
		});
		builder.addCase(GetCartList.rejected, (state, action) => {
			state.isLoadingListCartItems = false;
			state.listCartItems = [];
			state.error = action.payload;
		});

		builder.addCase(ClearCart.pending, (state) => {
			state.isLoadingListCartItems = true;
		});
		builder.addCase(ClearCart.rejected, (state, action) => {
			state.isLoadingListCartItems = false;
			state.listCartItems = [];
			state.error = action.payload;
		});
	},
});

export default CartRedux.reducer;

// save basket items in reducer only

// const CartRedux = createSlice({
// 	name: "Cart",
// 	initialState,
//     reducers: {
//         AddNewCartItem: (state, action) => {
// 			let existItem = state.listCartItems.find(el => el.itemName === action.payload.itemName)
// 			if (existItem) {
// 				existItem.quantity += 1
// 				existItem.total = +(existItem.price * existItem.quantity).toFixed(2)
// 			}
// 			else {
// 				state.listCartItems.push(action.payload);
// 			}
//         },
// 		AddQuantityItem: (state, action) => {
// 			let existItem = state.listCartItems[action.payload]
// 			existItem.quantity += 1
// 			existItem.total = +(existItem.price * existItem.quantity).toFixed(2)
// 		},
// 		RemoveQuantityItem: (state, action) => {
// 			let existItem = state.listCartItems[action.payload]
// 			if (existItem.quantity > 1) {
// 			existItem.quantity -= 1
// 			existItem.total = +(existItem.price * existItem.quantity).toFixed(2)
// 			}
// 			else {
// 				state.listCartItems.splice(action.payload, 1)
// 			}
// 		},
// 	},
// })

// export default CartRedux.reducer;
// export const { AddNewCartItem, AddQuantityItem, RemoveQuantityItem } = CartRedux.actions
