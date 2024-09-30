import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product, ProductSelection } from '../services/productEntity';

const protocol = "http";
const hostname = "localhost";
const port = 4600;
//const baseUrl = '/api';
const baseUrl = `${protocol}://${hostname}:${port}`;

/**
 * @constant productsApi - An API slice for fetching products from the server.
 */

export const productsApi = createApi({

    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
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
        storeOrder: builder.mutation<number, ProductSelection[]>({
            query(selections) {
                let orderData = {
                    lines: selections.map(ol => ({
                        productId: ol.product.id,
                        productName: ol.product.name, 
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

export const { useGetProductsQuery } = productsApi;
export const { useStoreOrderMutation } = ordersApi;