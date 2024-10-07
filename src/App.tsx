import { FunctionComponent, useMemo } from 'react';
import { Book } from './service/bookEntity';
import { BookList } from './component/BookList';
import { useAppDispatch, useAppSelector, reducers } from "./service/dataStore";
import { useGetBooksQuery } from './api/storeApi';
import { Routes, Route, Navigate } from "react-router-dom";
import { OrderDetails } from './component/OrderDetails';
import { OrderSummary } from "./component/OrderSummary";

/**
 * App
 * 
 * A Functional Component that renders the main application.
 * 
 * @returns {JSX.Element} - A block of JSX elements that make up the application UI.
 */

export const App: FunctionComponent = () => {

    const { data: queriedBooks } = useGetBooksQuery();
    const categories = useMemo<string[]>(() => { return [...new Set(queriedBooks?.map(b => b.category))]}, [queriedBooks]);

    const selections = useAppSelector(state => state.selections); //Read selections data from the data store.
    const dispatch = useAppDispatch();
    const addToOrder = (b: Book, q: number) => dispatch(reducers.addToOrder([b, q]));


    return <div className="App">
            <Routes>
                <Route path="/" element={
                    <Navigate replace to="/books" />
                } />
                <Route path="/books" element={
                    <BookList books={ queriedBooks ?? [] } 
                        categories={categories } 
                        selections={ selections }
                        addToOrder= { addToOrder } />
                } /> 
                <Route path="/order" element={
                    <OrderDetails selections={ selections } />
                } />
                <Route path="/summary/:id" element={<OrderSummary/>} />
            </Routes>
        </div>
}
export default App;
