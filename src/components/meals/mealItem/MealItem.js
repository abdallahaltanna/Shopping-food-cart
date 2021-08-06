import React, { useContext } from 'react';
import './MealItem.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/context';

function MealItem(props) {
  const { addItem } = useContext(CartContext);

  const addToCartHandler = (amount) => {
    addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  const thePrice = `$${props.price.toFixed(2)}`;
  return (
    <li className='single-meal'>
      <div>
        <h3>{props.name}</h3>
        <p className='meal-description'>{props.description}</p>
        <p className='meal-price'>{thePrice}</p>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
