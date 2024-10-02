import { configureStore } from "@reduxjs/toolkit";
import { selectionReducer, addToOrder, setSelections, resetSelections } from './selectionSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { booksApi, ordersApi, useGetBooksQuery, useStoreOrderMutation } from "../api/storeApi";

/**
 * Data Store Configuration that consumes the features created by the slice and store api, exported to
 * allow components to trigger changes in the state by dispatching actions
 */

export const dataStore = configureStore({
    reducer: {
        selections: selectionReducer,
        [booksApi.reducerPath]: booksApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(booksApi.middleware)
            .concat(ordersApi.middleware) 
});
export type AppDispatch = typeof dataStore.dispatch;
export type RootState = ReturnType<typeof dataStore.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const reducers = { addToOrder, setSelections, resetSelections};
export const queries = { useGetBooksQuery };
export const mutation = { useStoreOrderMutation};