import { FunctionComponent, useState } from "react";
import { Book } from "../service/bookEntity";

interface Props {
    bookItem: Book,
    callback: (product: Book, quantity: number) => void 
}

/**
 * ProductItem Component
 * 
 * A FunctionComponent that renders a product with a name, description, price, and a quantity selector.
 * It allows the user to add the selected quantity of the product to the cart.
 * 
 * @param {object} props - The props object containing the following properties:
 * @prop {Book} props.bookItem - The object containing product details.
 * @prop {function} props.callback - A callback function invoked when the "Add To Cart" button is clicked.
 * 
 * @returns {JSX.Element} A card displaying product details, a quantity selector, and an "Add To Cart" button.
 */

export const BookItem: FunctionComponent<Props> = (props) => {
    
    const [quantity, setQuantity] = useState<number>(1);

    return <div className="card m-1 p-1 bg-light">
        <h4>
            { props.bookItem.name }
            <span className="badge rounded-pill bg-primary float-end">
                €{ props.bookItem.price.toFixed(2) }
            </span>
        </h4>

        <div className="card-text bg-white p-1">
            { props.bookItem.description }
            <button className="btn btn-success btn-sm float-end" onClick={ () => props.callback(props.bookItem, quantity) } >
                Add To Cart
            </button>

            <select className="form-control-inline float-end m-1" onChange={ (ev) => setQuantity(Number(ev.target.value)) }>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
        </div>
    </div>
}

