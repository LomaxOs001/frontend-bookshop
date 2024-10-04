import { FunctionComponent, useMemo, useEffect } from 'react';
import { Book } from './service/bookEntity';
import { BookList } from './component/BookList';
import { useAppDispatch, useAppSelector, reducers } from "./service/dataStore";
import { useGetBooksQuery, useStoreOrderMutation } from './api/storeApi';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { OrderDetails } from './component/OrderDetails';
import { OrderSummary } from "./component/OrderSummary";
import { WalletAPI } from './api/walletApi';

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

    

    useEffect(() => {
        if (selections.length > 0) {
          localStorage.setItem('selections', JSON.stringify(selections));
        }
      }, [selections]);
    
      //rehydrate selections from localStorage
    useEffect(() => {
      const storedSelections = localStorage.getItem('selections');

      if (storedSelections !== null) {
        dispatch(reducers.setSelections(JSON.parse(storedSelections))); //Invoke setSelections action to dispatch to store.
      }
    }, [dispatch]);

    const [ storeOrder ] = useStoreOrderMutation();
    const navigate = useNavigate();

    const orderDetailsSubmitCallback = async (action: string) => {

      if (action === 'Connect Wallet') {
        await WalletAPI.connectWallet();

      } else if (action === 'Submit Order') {
        storeOrder(selections)
            .unwrap()
            .then((orderId) => { 
            navigate(`/summary/${orderId.length}`); 
            })
            .catch((error) => {
              console.error("Order submission failed:", error);  
            });
      }  
    };

    const orderDetailsRevokeCallback = async (action: string) => {
      if (action === 'Back') {
        navigate('/');

      } else if (action === 'Disconnect Wallet') {

        await WalletAPI.disconnectWallet();
        localStorage.removeItem('selections');
        dispatch(reducers.resetSelections());
      }
    };

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
                    <OrderDetails selections={ selections } submitCallback={ orderDetailsSubmitCallback } revokeCallback={ orderDetailsRevokeCallback } />
                } />
                <Route path="/summary/:id" element={<OrderSummary/>} />
            </Routes>
        </div>
}

export default App;
