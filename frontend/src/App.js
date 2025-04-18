// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import WishlistContainer from './pages/WishlistContainer';
import BasketPage from './pages/BasketPage';
import CheckoutPage from './pages/CheckoutPage';
import './App.css';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart, faSearch, faBookOpen } from '@fortawesome/free-solid-svg-icons';

const AppContext = React.createContext();

function Layout() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { basketItems, wishlistItems } = React.useContext(AppContext); // Only destructure what Layout uses

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${searchTerm}`);
            setSearchTerm('');
        }
    };
    return (
        <div className="app-container">
            <header className="app-header">
                <div className="logo">
                    <FontAwesomeIcon icon={faBookOpen} className="logo-icon" />
                    <Link to="/" className="bookstore-name">The Book Nook</Link>
                </div>
                <form className="search-bar" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search our collection..."
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                    />
                    <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                </form>
                <nav className="user-navigation">
                    <Link to="/login"><FontAwesomeIcon icon={faUser} /> Account</Link>
                    <Link to="/wishlist"><FontAwesomeIcon icon={faHeart} /> Saved ({wishlistItems.length})</Link>
                    <Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /> Basket ({basketItems.length})</Link>
                </nav>
            </header>
            <main className="main-content">
                <Outlet />
            </main>
            {/* ... your footer ... */}
        </div>
    );
}

function App() {
    const [basketItems, setBasketItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);


    return (
        <AppContext.Provider value={{ basketItems, setBasketItems, wishlistItems, setWishlistItems }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/literary-works" element={<CategoryPage category="Literary Works" />} />
                        <Route path="/informative-reads" element={<CategoryPage category="Informative Reads" />} />
                        <Route path="/teen-and-children" element={<CategoryPage category="Teen & Children" />} />
                        <Route path="/mystery" element={<CategoryPage category="Mystery" />} />
                        <Route path="/other-items" element={<CategoryPage category="Other Items" />} />
                        <Route path="/wishlist" element={<WishlistContainer />} />
                        <Route path="/cart" element={<BasketPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} /> {/* Ensure CheckoutPage route is here */}
                    </Route>
                </Routes>
            </Router>
        </AppContext.Provider>
    );
}
export { AppContext };

export default App;