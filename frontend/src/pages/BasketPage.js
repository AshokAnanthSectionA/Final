// frontend/src/pages/BasketPage.js
import React from 'react';
import { AppContext } from '../App';
import './BasketPage.css';
import { Link } from 'react-router-dom'; // Import Link for potential checkout navigation

function BasketPage() {
    const { basketItems, setBasketItems } = React.useContext(AppContext);

    const handleRemoveFromBasket = (bookToRemove) => {
        setBasketItems(prevItems => prevItems.filter(item => item.id !== bookToRemove.id));
    };

    const calculateTotal = () => {
        return basketItems.reduce((total, item) => {
            const price = parseFloat(item.price);
            return total + (isNaN(price) ? 0 : price); 
        }, 0).toFixed(2);
    };


    if (basketItems.length === 0) {
        return <div className="basket-page"><h2>Shopping Basket</h2><p className="basket-empty">Your basket is empty.</p></div>;
    }

    return (
        <div className="basket-page">
            <h2>Shopping Basket</h2>
            <div className="basket-items">
                {basketItems.map(book => (
                    <div className="basket-item" key={book.id}>
                        <img src={book.image} alt={book.title} />
                        <div className="basket-item-details">
                            <h3>{book.title}</h3>
                            <p className="author">By {book.author}</p>
                            <p className="price">${book.price}</p>
                        </div>
                        <button onClick={() => handleRemoveFromBasket(book)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className="basket-total">
                <strong>Total: ${calculateTotal()}</strong>
                {/* Replace '#' with your actual checkout page URL */}
                <Link to="/checkout" className="basket-checkout-button">Checkout</Link>
            </div>
        </div>
    );
}

export default BasketPage;