import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Book, BookSelection } from '../service/bookEntity';

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
    reducerPath: "orders",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        storeOrder: builder.mutation<number, BookSelection[]>({
            query(selections) {
                let orderData = selections.map(bo => ({
                        orderId: bo.bookItem.id,
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
            transformResponse: ((response: {id : number}) => response.id),//Extract the order id prior to hit the cache.
        }), 
    }),
})

export const {  useGetBooksQuery } = booksApi;
export const { useStoreOrderMutation } = ordersApi;