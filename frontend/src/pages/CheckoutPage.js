// frontend/src/pages/CheckoutPage.js
import React, { useState, useContext }  from 'react';
import { AppContext } from '../App';
import './CheckoutPage.css';
import { Link } from 'react-router-dom'; // Import Link

function CheckoutPage() {
    const { basketItems } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
        state: '',
        postalCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const total = basketItems.reduce((sum, item) => {
        const price = parseFloat(item.price);
        return sum + (isNaN(price) ? 0 : price);
    }, 0).toFixed(2);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Order submitted:', formData);
        alert('Thanks for shopping! Come back and visit.');
        // In a real application, you would send formData and basketItems to your backend
    };
    
    if (basketItems.length === 0) {
        return (
            <div className="checkout-page">
                <h2>Checkout</h2>
                <p>Your basket is empty. <Link to="/cart">Go back to basket</Link>.</p>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <div className="checkout-items">
                <h3>Order Summary:</h3>
                {basketItems.map(item => (
                    <div className="checkout-item" key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <div className="checkout-item-details">
                            <h4>{item.title}</h4>
                            <p>Price: ${item.price}</p>
                            {/* You could display quantity here if you implement it */}
                        </div>
                    </div>
                ))}
                <div className="checkout-total">
                    <strong>Total: ${total}</strong>
                </div>
            </div>

            <div className="checkout-form">
                <h3>Shipping Information:</h3>
                <form onSubmit={handleSubmit}>
                
                  <div className="form-group">
                        <label htmlFor="name">Full Name:</label>
                        <input type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Shipping Address:</label>
                        <textarea id="address" name="address" rows="3" required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State/Province:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code:</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="payment-details">
                    <h4>Payment Details</h4>
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date (MM/YY):</label>
                        <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cvv">CVV:</label>
                        <input
                            type="number"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                    <button type="submit" className="place-order-button">Place Order</button>
                    </form>
            </div>
        </div>
    );
}

export default CheckoutPage;