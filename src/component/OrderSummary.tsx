import { FunctionComponent } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, reducers } from "../service/dataStore";

/**
 * 
 * @returns {JSX.Element} - A block of JSX elements that display the order summary.
 */

export const OrderSummary : FunctionComponent = () => {
    const { id } = useParams(); //extract id from URL params
    const dispatch = useAppDispatch();

    const cleanUp = () => {
        dispatch(reducers.resetSelections()); 
        localStorage.removeItem('selections');
    } 
    
    return <div className="m-2 text-center">
        <h2>Thanks!</h2>
        <p>Thanks for placing your order.</p>
        <p>Your order id is: { id }</p>
        <p>We'll ship your goods as soon as possible.</p>
        <button className="btn btn-secondary" onClick={ cleanUp }>
            <NavLink to="/books" style={{color:"white", textDecoration:"none"}}>OK</NavLink>
        </button>
    </div>
}