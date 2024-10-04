import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Book, BookSelection } from '../service/bookEntity';
import { v4 as uuidv4 } from 'uuid';

const protocol = "http";
const hostname = "localhost";
const port = 4600;
const baseUrl = `${protocol}://${hostname}:${port}/api`;

/**
 * @constant booksApi - An API slice for fetching books from the server.
 */

export const booksApi = createApi({

    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getBooks: builder.query<Book[], void>({
            query: () => "/books",
            
            }),
    }),
})
/**
 * @constant ordersApi - An API slice for storing orders on the server.
 */
export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        storeOrder: builder.mutation<string[], BookSelection[]>({
            query(selections) {
                let orderData = selections.map(bo => ({
                        orderId: uuidv4()+'-'+bo.bookItem.id,
                        orders:[{
                            bookAuthor: bo.bookItem.author,
                            bookName: bo.bookItem.name, 
                            quantity: bo.quantity
                        }]
                        
                    }));
                
                return {
                    url: "/orders",
                    method: "POST",
                    body: {orderData}
                }
        },
            transformResponse: ((response: {orderId : string[]}) => response.orderId),//Extract the order id prior to hit the cache.
        }), 
    }),
})

export const {  useGetBooksQuery } = booksApi;
export const { useStoreOrderMutation } = ordersApi;