import { FunctionComponent, useMemo, useEffect } from 'react';
import { Product } from './services/productEntity';
import { ProductList } from './components/ProductList';
import { useAppDispatch, useAppSelector, reducers, queries, mutation } from "./services/dataStore";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { OrderDetails } from './components/OrderDetails';
import { OrderSummary } from "./components/OrderSummary";
import { WalletAPI } from './apis/walletApi';

/**
 * App
 * 
 * A Functional Component that renders the main application.
 * 
 * @returns {JSX.Element} - A block of JSX elements that make up the application UI.
 */

export const App: FunctionComponent = () => {

   
    const selections = useAppSelector(state => state.selections); //Read selections data from the data store.
     
    const dispatch = useAppDispatch();
    const { data, } = queries.useGetProductsQuery();
    const addToOrder = (p: Product, q: number) => dispatch(reducers.addToOrder([p, q]));//Invoke addToOrder action to dispatch to store.
    const categories = useMemo<string[]>(() => { return [...new Set(data?.map(p => p.category))]}, [data]);

    useEffect(() => {
        if (selections.length > 0) {
          localStorage.setItem('selections', JSON.stringify(selections));
        }
      }, [selections]);
    
      //rehydrate selections from localStorage
    useEffect(() => {
      const storedSelections = localStorage.getItem('selections');
      if (storedSelections) {
        dispatch(reducers.setSelections(JSON.parse(storedSelections))); //Invoke setSelections action to dispatch to store.
      }
    }, [dispatch]);

    const [ storeOrder ] = mutation.useStoreOrderMutation();
    const navigate = useNavigate();

    const orderDetailsSubmitCallback = async (action: string) => {

      if (action === 'Connect Wallet') {
        await WalletAPI.connectWallet();

      } else if (action === 'Submit Order') {
        storeOrder(selections)
            .unwrap()
            .then((id) => { 
            navigate(`/summary/${id}`); 
            });
      }  
    };

    const orderDetailsRevokeCallback = async (action: string) => {
      if (action === 'Back') {
        navigate('/products');

      } else if (action === 'Disconnect Wallet') {

        await WalletAPI.disconnectWallet();
        localStorage.removeItem('selections');
        dispatch(reducers.resetSelections());
      }
    };

    return <div className="App">
            <Routes>
                <Route path="/" element={
                    <Navigate replace to="/products" />
                } />
                <Route path="/products" element={
                    <ProductList products={ data ?? [] } 
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
