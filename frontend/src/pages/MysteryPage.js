// frontend/src/pages/MysteryPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

const mysteryBooks = [
    {
        id: 101,
        title: 'The Girl on the Train',
        author: 'Paula Hawkins',
        price: '$13.50',
        image: '/images/the girl on the train book.jpg',
        plot: 'A psychological thriller narrated by an unreliable woman who believes she witnessed a crime while commuting on her daily train ride, leading her to become entangled in the lives of others.',
    },
    {
        id: 102,
        title: 'Gone Girl',
        author: 'Gillian Flynn',
        price: '$14.25',
        image: '/images/gone girl book.jpg',
        plot: 'A gripping mystery that unfolds after Nick Dunne\'s wife, Amy, disappears on their fifth wedding anniversary, with suspicion falling on Nick as the police investigation and media frenzy intensify.',
    },
    {
        id: 103,
        title: 'The Da Vinci Code',
        author: 'Dan Brown',
        price: '$11.99',
        image: '/images/the da vinici code book.jpg',
        plot: 'A thrilling mystery where Harvard symbologist Robert Langdon is drawn into a complex conspiracy involving secret societies, religious history, and a murder at the Louvre Museum.',
    },
    {
        id: 104,
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        price: '$14.99',
        image: '/images/the silent patient book.jpg',
        plot: 'A psychological thriller about a psychotherapist determined to unravel the mystery of why his famous artist patient suddenly stopped speaking after allegedly murdering her husband.',
    },
    {
        id: 105,
        title: 'And Then There Were None',
        author: 'Agatha Christie',
        price: '$10.50',
        image: '/images/and then there were none book.jpg',
        plot: 'Ten strangers are lured to a secluded island and accused of past crimes. One by one, they begin to die in a manner that mirrors a sinister nursery rhyme, leaving the survivors to uncover the killer among them.',
    },
];

function MysteryPage() {
    return (
        <div className="category-page">
            <h2>Mystery Books</h2>
            <div className="book-grid">
                {mysteryBooks.map(book => (
                    <div className="book-item" key={book.id}>
                        <img src={book.image} alt={book.title} />
                        <h3>{book.title}</h3>
                        <p className="author">{book.author}</p>
                        <p className="price">{book.price}</p>
                        <Link to={`/product/${book.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MysteryPage;
export { mysteryBooks };