import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductSelection, ProductSelectionMutations } from "./productEntity";


/**
 * productSelectionSlice
 * 
 * A Redux slice for managing product selections in an order.
 * It contains the state and reducer logic for adding products to the order.
 * 
 * @prop {string} name - The name of the slice.
 * @prop {ProductSelection[]} initialState - The initial state of the slice, an array of product selections.
 * @prop {object} reducers - An object containing the reducer functions for handling actions.
 */
const productSelectionSlice = createSlice({
    name: "selections", 
    initialState: Array<ProductSelection>(),
    reducers: {

        /**
         * addToOrder
         * 
         * A reducer function that adds a product and its quantity to the product selections.
         * 
         * @param {ProductSelection[]} currSelections - Current state of product selections.
         * @param {PayloadAction<[Product, number]>} action - Action containing the product to add and the quantity.
         * 
         * The reducer calls this function to modify the selections array by adding the product with the specified quantity.
         */
        addToOrder(currSelections: ProductSelection[], action: PayloadAction<[Product, number]>) {
            ProductSelectionMutations.addProduct(currSelections, action.payload[0], action.payload[1]);
        },
        /**
         * setSelections
         * 
         * A reducer function that sets the product selections to a new array of selections.
         * 
         * @param {ProductSelection[]} curr - Current state of product selections.
         * @param {PayloadAction<ProductSelection[]>} action - Action containing the new selections array.
         * 
         * The reducer calls this function to modify the selections array by setting it to the new array of selections.
         */
        setSelections (currSelections: ProductSelection[], action: PayloadAction<ProductSelection[]>) {
            return action.payload;
          },
        /**
         * resetSelections
         * 
         * A reducer function that resets the product selections to an empty array.
         * 
         * @param {ProductSelection[]} selections - Current state of product selections. 
         */
        resetSelections(selections: ProductSelection[]) {
            selections.length = 0;
        }
    }
});


export const selectionReducer = productSelectionSlice.reducer;
export const { addToOrder, setSelections, resetSelections } = productSelectionSlice.actions;

