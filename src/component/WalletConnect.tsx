import { FunctionComponent } from "react";

//interface Props {
    //provider: string;
//} receive the result provided by the OrderDetails callback function 

/**
 * WalletConnect Component
 * 
 * A FunctionComponent that renders a WalletConnect button.
 * 
 * @returns {JSX.Element} A WalletConnect button.
 */

export const WalletConnect: FunctionComponent = (props) => {
    return <button className="btn btn-primary m-1">
        Connect Wallet
    </button>
};