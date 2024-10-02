/**
 * This file contains the data model for the product entity
 * @type Book - A type representing a product entity.
 * @type BookSelection - A type representing a product entity with a quantity.
 * @type BookSelectionHelpers - A class with helper functions for product selections.
 * @type BookSelectionMutations - A class with mutation functions for product selections.
 * 
 */

export type Book = {
    id: number, 
    author: string,
    name: string,
    description: string,
    category: string, 
    price: number 
};

export type BookSelection = {
    bookItem: Book, 
    quantity: number;
}
export class BookSelectionHelpers {

    public static total(selections : BookSelection[]) {
        return selections.reduce((total, line) => total + (line.bookItem.price * line.quantity), 0);
    }

    public static bookCount(selections: BookSelection[]) {
        return selections.reduce((total, line) => total + line.quantity, 0);
    }
}

export class BookSelectionMutations {

    
    public static addBook(selections : BookSelection[], bookItem: Book, quantity: number) {
        const index = selections.findIndex(line => line.bookItem.id === bookItem.id);

        if (index > -1) {
            selections[index].quantity += quantity;//update quantity already in the list
        } else {
            selections.push({ bookItem: bookItem, quantity})
        }
    }

    public static remove(selections: BookSelection[], id: number) {
        selections.forEach((line, index) => {
            if (line.bookItem.id === id) {
                selections = selections.splice(index, 1);
            }
        });
    }
}

