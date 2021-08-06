import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../cart/CartIcon';
import './HeaderButton.css';
import CartContext from '../../store/context';

function HeaderButton({ onShow }) {
  const cartCtx = useContext(CartContext);
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setButtonIsHighlighted(true);

    const timer = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [cartCtx.items]);

  const btnClasses = `button ${buttonIsHighlighted ? 'bump' : null}`;

  return (
    <button className={btnClasses} onClick={onShow}>
      <span className='icon'>
        <CartIcon />
      </span>
      <span className='your-cart'>Your Cart</span>
      <span className='badge'>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderButton;
