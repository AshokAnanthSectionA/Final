import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css'; // Create this CSS file
import { bookData } from '../data'; // Import bookData

function CategoryPage({ category }) {
    // Filter books directly from bookData based on the category prop
    const filteredBooks = bookData.filter(book => book.category === category);

    return (
        <div className="category-page">
            <h2>{category}</h2>
            {filteredBooks.length > 0 ? (
                <div className="book-grid">
                    {filteredBooks.map(book => (
                        <div className="book-item" key={book.id}>
                            <img src={book.image} alt={book.title} />
                            <h3>{book.title}</h3>
                            <p className="author">{book.author}</p>
                            <p className="price">{book.price}</p>
                            <Link to={`/product/${book.id}`}>View Details</Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No books found in this category yet.</p>
            )}
        </div>
    );
}

export default CategoryPage;