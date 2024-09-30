import { FunctionComponent } from "react";


interface Props {
    selected: string,
    categories: string[],
    selectCategory: (category: string) => void;
}
/**
 * CategoryList Component
 * 
 * A FunctionComponent that renders a list of product categories as buttons, allowing the user to select one.
 * The "All" category is always included at the beginning of the list.
 * 
 * @param {object} props - The props object containing the following properties:
 * @prop {string} props.selected - The currently selected category.
 * @prop {string[]} props.categories - An array of category names to display (excluding the "All" option, which is added automatically).
 * @prop {function} props.selectCategory - A callback function invoked when a category is selected. It takes the selected category name as its argument.
 * 
 * @returns {JSX.Element} A list of category buttons, with the currently selected category highlighted.
 */
export const CategoryList: FunctionComponent<Props> = (props) => {

    return <div className="d-grid gap-2">
            { 
                ["All", ...props.categories].map(categ => {
                let btnClass = props.selected === categ ? "btn-primary": "btn-secondary";

                return <button key={ categ } className={ `btn btn-block ${btnClass}` } onClick={ () => props.selectCategory(categ) }>
                    { categ }
                    </button>
                }) 
            }
        </div>
}