import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookSelection, BookSelectionMutations } from "./bookEntity";


/**
 * productSelectionSlice
 * 
 * A Redux slice for managing product selections in an order.
 * It contains the state and reducer logic for adding products to the order.
 * 
 * @prop {string} name - The name of the slice.
 * @prop {BookSelection[]} initialState - The initial state of the slice, an array of product selections.
 * @prop {object} reducers - An object containing the reducer functions for handling actions.
 */
const bookSelectionSlice = createSlice({
    name: "selections", 
    initialState: Array<BookSelection>(),
    reducers: {

        /**
         * addToOrder
         * 
         * A reducer function that adds a product and its quantity to the product selections.
         * 
         * @param {BookSelection[]} currSelections - Current state of product selections.
         * @param {PayloadAction<[Book, number]>} action - Action containing the product to add and the quantity.
         * 
         * The reducer calls this function to modify the selections array by adding the product with the specified quantity.
         */
        addToOrder(currSelections: BookSelection[], action: PayloadAction<[Book, number]>) {
            BookSelectionMutations.addBook(currSelections, action.payload[0], action.payload[1]);
        },
        /**
         * setSelections
         * 
         * A reducer function that sets the product selections to a new array of selections.
         * 
         * @param {BookSelection[]} curr - Current state of product selections.
         * @param {PayloadAction<BookSelection[]>} action - Action containing the new selections array.
         * 
         * The reducer calls this function to modify the selections array by setting it to the new array of selections.
         */
        setSelections (currSelections: BookSelection[], action: PayloadAction<BookSelection[]>) {
            return action.payload;
          },
        /**
         * resetSelections
         * 
         * A reducer function that resets the product selections to an empty array.
         * 
         * @param {BookSelection[]} selections - Current state of product selections. 
         */
        resetSelections(selections: BookSelection[]) {
            selections.length = 0;
        }
    }
});


export const selectionReducer = bookSelectionSlice.reducer;
export const { addToOrder, setSelections, resetSelections } = bookSelectionSlice.actions;

