import { FunctionComponent, useState } from "react";
import { Header } from "./Header";
import { ProductItem } from "./ProductItem";
import { CategoryList} from "./CategoryList";
import { Product, ProductSelection } from "../services/productEntity";

interface Props {
    products: Product[],
    categories: string[],
    selections: ProductSelection[],
    addToOrder: (product: Product, quantity: number) => void
}

/**
 * ProductList Component
 * 
 * A FunctionComponent that lists all products in the selected category
 * with "All" being the default selected category.
 * 
 * @param { object } props - The props object containing the following properties:
 * @prop { Product[] } props.product - An array containing list of products to display.
 * @prop { string[] } props.categories - An array containing list of each product category.
 * @prop { ProductSelection[] } props.selections - An array of the selected products.
 * @prop { function } props.addToOrder - A callback function invoked when the "Add To Cart" button is clicked.
 * 
 * @returns { JSX.Element } - A block of JSX elements that display the UI header, category list, and product items.
 */

export const ProductList: FunctionComponent<Props> = (props) => {

    const [selectedCategory, setSelectedCategory] = useState("All");
    
    const products = props.products.filter(prod => selectedCategory === "All" || prod.category === selectedCategory);

    return <div>
            <Header selections={ props.selections } />

            <div className="container-fluid">
                <div className="row">

                    <div className="col-3 p-2">
                    {
                        <CategoryList 
                            selected={ selectedCategory }
                            categories={ props.categories }
                            selectCategory={ setSelectedCategory } 
                        />
                    }
                    </div>
                    <div className="col-9 p-2">
                    {
                        products.map(prod => <ProductItem 
                            key={ prod.id } 
                            product={ prod } 
                            callback={ props.addToOrder }
                            />)
                    }
                    </div>
                </div>
            </div>
        </div> 
}