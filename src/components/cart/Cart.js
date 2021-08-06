import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/context';
import Checkout from './Checkout';

function Cart({ onClose, showCart }) {
  const { items, totalAmount, addItem, removeItem, clearCart } =
    useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const theTotalAmount = `$${totalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      `https://react-https-a2f9f-default-rtdb.firebaseio.com/orders.json`,
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orders: items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    clearCart();
  };

  const cartItems = (
    <ul className={classes.cartUl}>
      {items.map((item) => {
        const { id, name, price, amount } = item;
        return (
          <CartItem
            key={id}
            name={name}
            price={price}
            amount={amount}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, id)}
          />
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['btn__alt']} onClick={onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.btn} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{theTotalAmount}</span>
      </div>

      {isCheckout && (
        <Checkout onCancel={onClose} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal showCart={showCart} onClose={onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}

export default Cart;
