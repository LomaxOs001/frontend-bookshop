import { FunctionComponent, useState, useEffect } from "react";
import {BookSelection, BookSelectionHelpers as Helpers } from "../service/bookEntity";
import { NavLink } from "react-router-dom";
import { WalletAPI } from "../api/walletApi";

interface Props {
    selections: BookSelection[],
    submitCallback: (action: string) => void,
    revokeCallback: (action: string) => void
}
/**
 * 
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

    let connectButtonText = 'Connect Wallet';
    let orderButtonText = 'Submit Order';
    let backButtonText = 'Back';
    let disconnectButtonText = 'Disconnect Wallet';

    const [ primaryOrderButtonText, setPrimaryButtonText ] = useState<string>(connectButtonText);
    const [ secondaryOrderButtonText, setSecondaryButtonText ] = useState<string>(backButtonText);
    const [ account, setAccount ] = useState<string>('');
    const [ balance, setAccountBalance ] = useState<string>('');

    useEffect(() => {

        const fetchWalletAccount = async () => {

            await WalletAPI.fetchAccountInfo();

            const walletAccountInfo = WalletAPI.getCurrentInfo();

            if (walletAccountInfo.length > 0) {
                const accountInfo = walletAccountInfo[0];
                setAccountBalance(accountInfo.balance?.toString());

                if (accountInfo.account !== '') {
                    setAccount(accountInfo.account.substring(0, 6) + '...' + accountInfo.account.substring(accountInfo.account.length - 5));
                    setPrimaryButtonText(orderButtonText);
                    setSecondaryButtonText(disconnectButtonText);
                }
            } else {
                setPrimaryButtonText(connectButtonText);
                setSecondaryButtonText(backButtonText);
            }
        };
        fetchWalletAccount();
        
    });

    return <div>
            <div>
                <div className="bg-primary row">
                    <div className="col text-start">
                        <h5 className="text-white" >Account: <span>{ account }</span></h5>
                        <h5 className="text-white" >Balance: <span>{ balance }</span></h5>
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
                    
                    <button  className="btn btn-secondary" style={{minWidth: "80px"}} onClick={ () => props.revokeCallback(secondaryOrderButtonText) }> 

                        <NavLink to="/books" style={{color:"white", textDecoration:"none"}}> 
                            { secondaryOrderButtonText } 
                        </NavLink>
                    </button>
                    
                    <button className="btn btn-primary m-1" onClick={ () => props.submitCallback(primaryOrderButtonText) }> 
                        { primaryOrderButtonText }
                    </button>
                </div>
                
            </div>
        
        </div>
}