import {React} from "react";
import { useCart } from "react-use-cart";
import Header from "../../components/ClientHeader";
import ProductPage from "../Product/index"


const Cart = () => {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();
    console.log("totalItemCart", totalItems);
    
    if (isEmpty) return (
        <div>           
            <h1 className="text-center">Your Cart is Empty!</h1>        
        </div>    
    )

    const handleClearCart = () => {
        emptyCart();
    }

    return (
        <section className="py-4 container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h5>Cart ({totalUniqueItems}) total Items: ({totalItems})</h5>
                    <table className="table table-light table-hover m-0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <button className="btn btn-info ms-2" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}> - </button>
                                        <button className="btn btn-info ms-2" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}> + </button>
                                        <button className="btn btn-danger ms-2" onClick={() => removeItem(item.id)}>X</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-12 ms-auto">
                    <h2>Total Price: ${cartTotal}</h2>
                </div>
                <div className="col-auto">
                    <button className="btn btn-danger m-2" onClick={() => handleClearCart()}>Clear Cart</button>
                </div>
                <div hidden>
                    <Header totalItems={totalItems}/>
                    <ProductPage totalItems={totalItems}/>
                </div>
                
            </div>
        </section>
    );
}

export default Cart;