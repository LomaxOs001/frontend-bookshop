import { FunctionComponent, useState, useEffect } from "react";
import {BookSelection, BookSelectionHelpers as Helpers } from "../service/bookEntity";
import { NavLink } from "react-router-dom";
import { WalletAPI } from "../api/walletApi";
import { useStoreOrderMutation } from '../api/storeApi';
import { useAppSelector, useAppDispatch, reducers } from "../service/dataStore";
import { useNavigate } from "react-router-dom";

interface Props {
    selections: BookSelection[],
}
/**
 * OrderDetails
 * 
 * A FunctionComponent that displays the order details based on the selected products
 * 
 * @param { object } props - The props object containing the following properties:
 * @prop { ProductSelection[] } props.selections - An array of product selections.
 * @prop { function } props.submitCallback - A callback function invoked when the "Submit Order" button is clicked.
 * 
 * @returns { JSXElement } - A block of JSX elements that display the order details.
 */


export const OrderDetails: FunctionComponent<Props> = (props) => {

    let defaultConnectButtonText = 'Connect Wallet';
    let defaultOrderButtonText = 'Submit Order';
    let defaultBackButtonText = 'Back';
    let defaultDisconnectButtonText = 'Disconnect Wallet';

    const [ primaryOrderButtonText, setPrimaryOrderButtonText ] = useState<string>(defaultConnectButtonText);
    const [ secondaryOrderButtonText, setSecondaryOrderButtonText ] = useState<string>(defaultBackButtonText);
    const [ address, setAccountAddress ] = useState<string>('-');
    const [ balance, setAccountBalance ] = useState<string>('-');

    const selections = useAppSelector(state => state.selections); 
    const dispatch = useAppDispatch();

    const [ storeOrder ] = useStoreOrderMutation();
    const navigate = useNavigate();


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

    useEffect(() => {
        fetchWalletAccount();
    });


    const onConnectWallet = async (action: string) => {

        if (action === 'Connect Wallet') {

            await WalletAPI.connectWalletAccount();
  
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
    
    const onDisconnectWallet = async (action: string) => {
        if (action === 'Back') {
          navigate('/');
  
        } else if (action === 'Disconnect Wallet') {
  
          await WalletAPI.disconnectWallet();
          localStorage.removeItem('selections');
          dispatch(reducers.resetSelections());
        }
    };


    const fetchWalletAccount = async () => {

        const res = await WalletAPI.getAccountInfo();

        if (res.length > 0) {

            setAccountAddress(res[0].account.substring(0, 6) + '...' + res[0].account.substring(res[0].account.length - 5));
            setAccountBalance(res[0].balance?.toString());

            setPrimaryOrderButtonText(defaultOrderButtonText);
            setSecondaryOrderButtonText(defaultDisconnectButtonText);
            
        } else {
            setPrimaryOrderButtonText(defaultConnectButtonText);
            setSecondaryOrderButtonText(defaultBackButtonText);
        }
    };
        

    return <div className="OrderDetails">
            <div>
                <div className="bg-primary row">
                    <div className="col text-start">
                        <h5 className="text-white mt-3">
                            Account:  
                            <span className="WalletAccountInfo bg-info text-dark rounded">{address}</span>
                            </h5>
                            <h5 className="text-white">
                            Balance:  
                            <span className="WalletAccountInfo bg-info text-dark rounded d-inline-block">${balance}</span>
                        </h5>
                        <style>{`
                            .WalletAccountInfo {
                                background: linear-gradient(90deg, #87CEEB, #00BFFF); 
                                width: auto; 
                                height: 30px;
                                padding-left: 5px;
                                padding-right: 5px; 
                                text-align: center;
                                border-radius: 0.25rem;
                                display: inline-block;
                            }
                        `}</style>
                    </div>
                    
                        <h3 className="text-center text-white p-2 border">
                            Order Details
                        </h3>
                    
                </div>

                <div className="p-3">
                    <table className="table table-sm table-striped">
                        <thead>
                            <tr>
                                <th>Quantity</th>
                                <th>Product</th>
                                <th className="text-right">Price</th>
                                <th className="text-right">Subtotal</th>
                            </tr>
                        </thead>
                    <tbody>
                        { 
                            props.selections.map(selection =>
                                <tr key={ selection.bookItem.id }>
                                    <td>{ selection.quantity }</td>
                                    <td>{ selection.bookItem.name }</td>
                                    <td className="text-right">
                                        ${ selection.bookItem.price.toFixed(2) }
                                    </td>
                                    <td className="text-right">
                                        ${ Helpers.total([selection]).toFixed(2) }
                                    </td>
                                </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="text-right" colSpan={3}>Total:</th>
                            <th className="text-right">
                                ${ Helpers.total(props.selections).toFixed(2) }
                            </th>
                        </tr>
                    </tfoot>
                    </table>
                </div>
                <div className="text-center">
                    
                    <button  className="btn btn-secondary" style={{minWidth: "80px"}} onClick={ () => onDisconnectWallet(secondaryOrderButtonText) }> 

                        <NavLink to="/books" style={{color:"white", textDecoration:"none"}}> 
                            { secondaryOrderButtonText } 
                        </NavLink>
                    </button>
                    
                    <button className="btn btn-primary m-1" onClick={ () => onConnectWallet(primaryOrderButtonText) }> 
                        { primaryOrderButtonText }
                    </button>
                </div>
                
            </div>
        
        </div>
}