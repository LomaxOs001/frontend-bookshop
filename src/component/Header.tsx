import { FunctionComponent } from "react";
import { BookSelection, BookSelectionHelpers } from "../service/bookEntity";
import { NavLink } from "react-router-dom";

interface Props {
    selections: BookSelection[]
}
/**
 * Header Component
 * 
 * A FunctionComponent that displays the total number and price of selected products.
 * 
 * @param {object} props - The props object containing the following properties:
 * @prop {BookSelection[]} props.selections - An array of product selections, containing selected products and quantity.
 * 
 * @returns {JSX.Element} A summary of the number of selected products and the total price, along with a "Submit Order" button.
 */

export const Header: FunctionComponent<Props> = (props) => {
    const count = BookSelectionHelpers.bookCount(props.selections);
    const total = BookSelectionHelpers.total(props.selections);

    return (
        <div className="p-1 bg-secondary text-white text-end">
            { count === 0 ? "(No Selection)" : `${ count } product(s), $${ total.toFixed(2) }` }

            { count > 0 ? 
                <NavLink to="/order" className="btn btn-sm btn-primary m-1">
                    Submit Order
                </NavLink> : 

                <button disabled className="btn btn-sm btn-primary m-1">
                    Submit Order
                </button>
            }
        </div>
    );
}