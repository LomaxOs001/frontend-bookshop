import { configureStore } from "@reduxjs/toolkit";
import { selectionReducer, addToOrder, setSelections, resetSelections } from './selectionSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { productsApi, ordersApi, useGetProductsQuery, useStoreOrderMutation } from "../apis/storeApi";

/**
 * Data Store Configuration that consumes the features created by the slice and store api, exported to
 * allow components to trigger changes in the state by dispatching actions
 */

export const dataStore = configureStore({
    reducer: {
        selections: selectionReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(ordersApi.middleware) 
});
export type AppDispatch = typeof dataStore.dispatch;
export type RootState = ReturnType<typeof dataStore.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const reducers = { addToOrder, setSelections, resetSelections};
export const queries = { useGetProductsQuery };
export const mutation = { useStoreOrderMutation};