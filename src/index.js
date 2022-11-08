import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";

import reportWebVitals from "./reportWebVitals";
import AppMyShop from "./AppMyShop";
import ItemReducer from "./Body/ItemRedux";
import UserReducer from "./Body/UserRedux";
import CartReducer from "./Body/CartRedux";
import OrderReducer from "./Body/OrderRedux";

const logger = createLogger();

const store = configureStore({
	reducer: {
		item: ItemReducer,
		user: UserReducer,
		cart: CartReducer,
		order: OrderReducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<AppMyShop />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
