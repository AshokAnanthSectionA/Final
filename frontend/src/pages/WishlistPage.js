import React from 'react';
import './WishlistPage.css';

function WishlistPage({ wishlistItems, onRemoveFromWishlist }) {
    if (!wishlistItems || wishlistItems.length === 0) {
        return (
            <div className="wishlist-page">
                <h2>My Wishlist</h2>
                <p>Your saved items will appear here.</p>
                <p>{!wishlistItems ? 'Loading wishlist...' : 'Your wishlist is empty.'}</p>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <h2>My Wishlist</h2>
            <p>Your saved items will appear here.</p>
            <div className="wishlist-items">
                {wishlistItems.map(item => (
                    <div key={item.id} className="wishlist-item">
                        <img src={item.image} alt={item.title} className="wishlist-item-image" />
                        <div className="wishlist-item-details">
                            <h3>{item.title}</h3>
                            <p>By {item.author}</p>
                            <p className="price">{item.price}</p>
                            <button onClick={() => onRemoveFromWishlist(item)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WishlistPage;