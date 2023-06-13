import { useDispatch, useSelector } from "react-redux";
import { deleteItem, fetchItems } from "../../redux/actions/itemActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TablePage = () => {

    const dispatch = useDispatch();
    const items = useSelector(state => state.items);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    console.log(items.items)

    const handleDelete = (itemId) => {
        dispatch(deleteItem(itemId));
    };

    const handleEdit = (itemId) => {
        navigate(`/form/${itemId}`);
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Freshness</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Product ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.items.map((product) => (
                        <tr key={product.productId}>
                            <td>{product.productName}</td>
                            <td>{product.productCathegory}</td>
                            <td>
                                <img src={product.productImage} alt="Product" width="100" height="100" />
                            </td>
                            <td>{product.productFreshness}</td>
                            <td>{product.productDesc}</td>
                            <td>{product.productPrice}</td>
                            <td>{product.productId}</td>
                            <td>
                                <button onClick={() => handleDelete(product.productId)}>Delete</button>
                                <button onClick={() => handleEdit(product.productId)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    )
}
export default TablePage