import { useState } from 'react';
import Cart from './components/cart/Cart';
import Header from './components/layout/Header';
import Meals from './components/meals/Meals';
import './index.css';

function App() {
  const [showCart, setShowCart] = useState(false);

  const bodyClass = showCart
    ? document.body.classList.add('modal-open')
    : document.body.classList.remove('modal-open');

  return (
    <div className={bodyClass}>
      {showCart && (
        <Cart onClose={() => setShowCart(false)} showCart={showCart} />
      )}
      <Header onShow={() => setShowCart(true)} />
      <main>
        <Meals />
      </main>
    </div>
  );
}

export default App;
