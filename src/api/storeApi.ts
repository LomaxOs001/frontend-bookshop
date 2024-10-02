import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Book, BookSelection } from '../service/bookEntity';

const protocol = "http";
const hostname = "localhost";
const port = 4600;
//const baseUrl = '/api';
const baseUrl = `${protocol}://${hostname}:${port}`;

/**
 * @constant booksApi - An API slice for fetching products from the server.
 */

export const booksApi = createApi({

    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getBooks: builder.query<Book[], void>({
            query: () => "products",
            }),
    }),
})

/**
 * @constant ordersApi - An API slice for storing orders on the server.
 */
export const ordersApi = createApi({
    reducerPath: "orders",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        storeOrder: builder.mutation<number, BookSelection[]>({
            query(selections) {
                let orderData = {
                    lines: selections.map(ol => ({
                        bookId: ol.bookItem.id,
                        bookName: ol.bookItem.name, 
                        quantity: ol.quantity
                    }))
                } 
                return {
                    url: "orders",
                    method: "POST",
                    body: {orderData}
                }
        },
            transformResponse: ((response: {id : number}) => response.id),//Extract the order id prior to hit the cache.
        }), 
    }),
})

export const {  useGetBooksQuery } = booksApi;
export const { useStoreOrderMutation } = ordersApi;