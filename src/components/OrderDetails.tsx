import { FunctionComponent, useState, useEffect } from "react";
import {ProductSelection, ProductSelectionHelpers as Helpers } from "../services/productEntity";
import { NavLink } from "react-router-dom";
import { WalletAPI } from "../apis/walletApi";

interface Props {
    selections: ProductSelection[],
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

    const [primaryOrderButtonText, setPrimaryButtonText] = useState<string>(connectButtonText);
    const [secondaryOrderButtonText, setSecondaryButtonText] = useState<string>(backButtonText);
    const [ account, setAccount ] = useState<string>('');

    useEffect(() => {

        const fetchWalletAccount = async () => {
            const walletAddresses = await WalletAPI.getAddresses();

            if (walletAddresses.length > 0) {
                setAccount(walletAddresses[0].substring(0, 6) + '...' + walletAddresses[0].substring(walletAddresses[0].length - 5));
                setPrimaryButtonText(orderButtonText);
                setSecondaryButtonText(disconnectButtonText);
            }
            else{
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
                        <h5 className="text-white" >Balance: <span></span></h5>
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
                                <tr key={ selection.product.id }>
                                    <td>{ selection.quantity }</td>
                                    <td>{ selection.product.name }</td>
                                    <td className="text-right">
                                        ${ selection.product.price.toFixed(2) }
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

                        <NavLink to="/products" style={{color:"white", textDecoration:"none"}}> 
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