import React from 'react';
import WishlistPage from './WishlistPage';
import { AppContext } from '../App'; 

function WishlistContainer() {
  const { wishlistItems, setWishlistItems } = React.useContext(AppContext);

  const handleRemoveFromWishlist = (bookToRemove) => {
    setWishlistItems(prevItems => prevItems.filter(book => book.id !== bookToRemove.id));
  };

  return (
    <WishlistPage
      wishlistItems={wishlistItems}
      onRemoveFromWishlist={handleRemoveFromWishlist}
    />
  );
}

export default WishlistContainer;