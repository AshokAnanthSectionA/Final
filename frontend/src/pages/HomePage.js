// frontend/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import './PopUpAd.css';

const allBooks= [
    {
        id: 1,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        price: '$12.00',
        image: '/images/pride and prejudice book.jpg',
        category: 'Literary Works',
        plot: 'A witty and insightful novel following the evolving relationship between Elizabeth Bennet and Mr. Darcy, exploring themes of love, class, and societal expectations in 19th-century England.',
    },
    {
        id: 2,
        title: 'Cosmos',
        author: 'Carl Sagan',
        price: '$15.50',
        image: '/images/cosmos carl sagan book.jpg',
        category: 'Informative Reads',
        plot: 'A captivating journey through the universe, exploring astronomy, cosmology, and the wonders of the cosmos in an accessible and engaging way, based on the iconic television series.',
    },
    {
        id: 3,
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        price: '$10.75',
        image: '/images/the hobbit book.jpg',
        category: 'Teen & Children',
        plot: 'An adventurous tale of Bilbo Baggins, a reluctant hobbit who is swept away on an unexpected quest with a company of dwarves to reclaim their treasure from the dragon Smaug.',
    },
    {
        id: 4,
        title: 'The Secret History',
        author: 'Donna Tartt',
        price: '$18.00',
        image: '/images/the secret history book.jpg',
        category: 'Literary Works',
        plot: 'A mesmerizing story about a group of eccentric classics students at a New England college who become entangled in a dark and tragic secret after experimenting with ancient Greek rituals.',
    },
    {
        id: 5,
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        price: '$22.00',
        image: '/images/thinking, fast and slow book.jpg',
        category: 'Informative Reads',
        plot: 'A groundbreaking exploration of the two systems that drive the way we think: System 1, which is fast, intuitive, and emotional; and System 2, which is slower, more deliberative, and more logical.',
    },
    {
        id: 6,
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        price: '$9.99',
        image: '/images/the hunger games book.jpg',
        category: 'Teen & Children',
        plot: 'In a dystopian future, Katniss Everdeen volunteers as tribute in the annual Hunger Games, a televised fight to the death, sparking a rebellion against the oppressive Capitol.',
    },
    {
        id: 7,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: '$14.50',
        image: '/images/to kill a mockingbird book.jpg',
        category: 'Literary Works',
        plot: 'Set in the American South, this classic novel explores themes of racial injustice and childhood innocence through the eyes of Scout Finch as her father, Atticus, defends a Black man accused of a crime.',
    },
    {
        id: 8,
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        price: '$18.25',
        image: '/images/a brief history of time book.jpg',
        category: 'Informative Reads',
        plot: 'A non-technical exploration of the history of the universe and concepts such as black holes, the Big Bang, and the nature of space and time, making complex ideas accessible to a broad audience.',
    },
    {
        id: 9,
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        price: '$11.00',
        image: '/images/harry potter and the sorcerer\'s stone book.jpg',
        category: 'Teen & Children',
        plot: 'Orphaned Harry Potter discovers on his eleventh birthday that he is a wizard and is invited to study at Hogwarts School of Witchcraft and Wizardry, where he uncovers the truth about his parents\' deaths and confronts a dark wizard.',
    },
    {
        id: 10,
        title: '1984',
        author: 'George Orwell',
        price: '$13.75',
        image: '/images/1984 book.jpg',
        category: 'Literary Works',
        plot: 'A dystopian novel set in Oceania, where the Party, led by Big Brother, maintains absolute control over every aspect of life, and Winston Smith rebels against the oppressive regime.',
    },
    {
        id: 11,
        title: 'Educated: A Memoir',
        author: 'Tara Westover',
        price: '$20.00',
        image: '/images/educated book.jpg',
        category: 'Informative Reads',
        plot: 'A powerful memoir about a young woman raised in a survivalist family in rural Idaho who overcomes her lack of formal education to pursue knowledge and ultimately earns a PhD from Cambridge University.',
    },
    {
        id: 12,
        title: 'The Lightning Thief (Percy Jackson & The Olympians Book 1)',
        author: 'Rick Riordan',
        price: '$8.50',
        image: '/images/the lightning thief (percy jackson & the olympians) book.jpg',
        category: 'Teen & Children',
        plot: 'Percy Jackson, a teenager who discovers he is the son of the Greek god Poseidon, embarks on a quest with his friends to prevent a war among the gods after Zeus\'s master lightning bolt is stolen.',
    },
];

const newArrivals = allBooks.slice(0, 6);
const bestsellers = allBooks.slice(6, 12);

function HomePage() {
    const [showAd, setShowAd] = useState(false);
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAd(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleCloseAd = () => {
        setShowAd(false);
    };


    const displayedNewArrivals = newArrivals;
    const displayedBestsellers = bestsellers;

    return (
        <div className="home-page">
            <section className="hero-banner">
                <div className="hero-content">
                    <h1>Discover Your Next Great Read</h1>
                    <p>Explore our diverse collection of books for every interest.</p>
                    <button className="shop-now-button">Browse Now</button>
                </div>
                {/* You might add a hero image here later */}
            </section>

            <div className="header"> {/* Add a header for the logo and search bar */}
                <Link to="/" className="logo">
                    <h1>The Book Nook</h1>
                </Link>
                
                <div className="account-info">
                    {/* Add your account information/links here */}
                </div>
            </div>

            <section className="featured-categories">
                <h2>Shop by Category</h2>
                <div className="category-grid">
                    <div className="category-item">
                        <img src="https://via.placeholder.com/150/abcdef/ffffff?Text=Literary+Works" alt="Literary Works" />
                        <h3>Literary Works</h3>
                        <Link to="/literary-works">Explore</Link>
                    </div>
                    <div className="category-item">
                        <img src="https://via.placeholder.com/150/fedcba/ffffff?Text=Informative+Reads" alt="Informative Reads" />
                        <h3>Informative Reads</h3>
                        <Link to="/informative-reads">Explore</Link>
                    </div>
                    <div className="category-item">
                        <img src="https://via.placeholder.com/150/aabbcc/ffffff?Text=Teen+%26+Children" alt="Teen & Children" />
                        <h3>Teen & Children</h3>
                        <Link to="/teen-and-children">Explore</Link>
                    </div>
                    <div className="category-item">
                        <img src="https://via.placeholder.com/150/ccaabb/ffffff?Text=Mystery" alt="Mystery" />
                        <h3>Mystery</h3>
                        <Link to="/mystery">Explore</Link>
                    </div>
                    <div className="category-item">
                        <img src="https://via.placeholder.com/150/aaccbb/ffffff?Text=Other+Items" alt="Other Items" />
                        <h3>Other Items</h3>
                        <Link to="/other-items">Explore</Link>
                    </div>
                </div>
            </section>

            <section className="new-arrivals">
                <h2>New Arrivals</h2>
                <div className="book-grid">
                    {displayedNewArrivals.map(book => (
                        <div className="book-item" key={book.id}>
                            <img src={book.image} alt={book.title} />
                            <h3>{book.title}</h3>
                            <p className="author">{book.author}</p>
                            <p className="price">{book.price}</p>
                            <Link to={`/product/${book.id}`}>View Details</Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bestsellers">
                <h2>Bestsellers</h2>
                <div className="book-grid">
                    {displayedBestsellers.map(book => (
                        <div className="book-item" key={book.id}>
                            <img src={book.image} alt={book.title} />
                            <h3>{book.title}</h3>
                            <p className="author">{book.author}</p>
                            <p className="price">{book.price}</p>
                            <Link to={`/product/${book.id}`}>View Details</Link>
                        </div>
                    ))}
                </div>
            </section>

            {showAd && (
                <div className="popup-ad">
                    <button className="close-button" onClick={handleCloseAd}>X</button>
                    <h3>Special Offer!</h3>
                    <img
                        src="/images/the-adventure-begins-book.jpg"
                        alt="Featured Book Ad"
                        className="featured-book-image" // You can add a class for styling
                    />
                    <p>Get 20% off on "The Hunger Games" for a limited time!</p>
                    <Link to="/product/6">Shop Now</Link>
                </div>
            )}
        </div>
    );
}

export {newArrivals, bestsellers};
export default HomePage;