// frontend/src/pages/ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bookData } from '../data'; // Assuming you have your book data here
import { AppContext } from '../App';
import './ProductDetailPage.css'; // Create this CSS file

function ProductDetailPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const { basketItems, setBasketItems } = React.useContext(AppContext);
    const { wishlistItems, setWishlistItems } = React.useContext(AppContext);
    const [isInBasket, setIsInBasket] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const foundBook = bookData.find(b => b.id === parseInt(id));
        setBook(foundBook);
    }, [id]);

    useEffect(() => {
        if (book) {
            setIsInBasket(basketItems.some(item => item.id === book.id));
            setIsInWishlist(wishlistItems.some(item => item.id === book.id));
        }
    }, [book, basketItems, wishlistItems]);

    const handleAddToBasket = () => {
        if (book && !isInBasket) {
            setBasketItems(prevItems => [...prevItems, book]);
            setIsInBasket(true);
            alert(`${book.title} added to basket!`);
        } else if (isInBasket) {
            alert(`${book.title} is already in your basket!`);
        }
    };

    const handleSaveToWishlist = () => {
        if (book && !isInWishlist) {
            setWishlistItems(prevItems => [...prevItems, book]);
            setIsInWishlist(true);
            alert(`${book.title} saved to wishlist!`);
        } else if (isInWishlist) {
            alert(`${book.title} is already in your wishlist!`);
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-image">
                <img src={book.image} alt={book.title} />
            </div>
            <div className="product-info">
                <h2>{book.title}</h2>
                <p className="author">By {book.author}</p>
                <p className="price">Price: ${book.price}</p>
                <p className="description">{book.plot}</p>
                <div className="product-details">
                </div>
                <div className="product-actions">
                    <button onClick={handleAddToBasket} disabled={isInBasket}>
                        {isInBasket ? 'In Basket' : 'Add to Basket'}
                    </button>
                    <button onClick={handleSaveToWishlist} disabled={isInWishlist}>
                        {isInWishlist ? 'In Wishlist' : 'Save to Wishlist'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;