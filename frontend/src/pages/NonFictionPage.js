// frontend/src/pages/NonFictionPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

const nonFictionBooks = [
    {
        id: 201,
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        price: '$19.75',
        image: 'https://m.media-amazon.com/images/I/713jIoITIhL._AC_UF1000,1000_QL80_.jpg',
        plot: 'Examines the history of humankind from the first humans to the twenty-first century, exploring the impact of biology, anthropology, and economics on human societies and the planet.',
    },
    {
        id: 202,
        title: 'Educated: A Memoir',
        author: 'Tara Westover',
        price: '$20.25',
        image: 'https://m.media-amazon.com/images/I/81f23ek-iJL._AC_UF1000,1000_QL80_.jpg',
        plot: 'A memoir detailing the author\'s journey from a childhood in rural Idaho, with limited formal education, to earning a PhD from Cambridge University, highlighting themes of family, education, and self-discovery.',
    },
    {
        id: 203,
        title: 'Becoming',
        author: 'Michelle Obama',
        price: '$21.00',
        image: 'https://m.media-amazon.com/images/I/8166VRzn9YL._AC_UF1000,1000_QL80_.jpg',
        plot: 'The memoir of former First Lady Michelle Obama, chronicling her life from her childhood in Chicago to her experiences in the White House, sharing personal reflections and insights.',
    },
    {
        id: 204,
        title: 'The Immortal Life of Henrietta Lacks',
        author: 'Rebecca Skloot',
        price: '$16.99',
        image: 'https://m.media-amazon.com/images/I/81E55xKjJRL._AC_UF1000,1000_QL80_.jpg',
        plot: 'A non-fiction narrative exploring the story of Henrietta Lacks, an African American woman whose cancer cells—taken without her knowledge in 1951—became one of the most important tools in medicine, raising ethical questions about consent and ownership.',
    },
    {
        id: 205,
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        price: '$22.50',
        image: 'https://m.media-amazon.com/images/I/619m5FSVG3L._AC_UF1000,1000_QL80_.jpg',
        plot: 'Presents a comprehensive overview of the dual-process theory of the mind, distinguishing between two systems of thought and exploring their implications for judgment, decision-making, and biases.',
    },
];

function NonFictionPage() {
    return (
        <div className="category-page">
            <h2>Non-Fiction Books</h2>
            <div className="book-grid">
                {nonFictionBooks.map(book => (
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

export default NonFictionPage;
export { nonFictionBooks }; 