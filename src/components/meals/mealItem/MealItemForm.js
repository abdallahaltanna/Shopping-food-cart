import React, { useRef, useState } from 'react';
import './MealItemForm.css';

function MealItemForm({ id, onAddToCart }) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    onAddToCart(enteredAmountNumber);
  };

  return (
    <form className='form' onSubmit={submitFormHandler}>
      <div className='form-input'>
        <label htmlFor='Amount'>Amount</label>
        <input
          type='number'
          id={`amount_${id}`}
          min='1'
          max='5'
          step='1'
          defaultValue='1'
          ref={amountInputRef}
        />
      </div>
      <button className='add-btn'>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
}

export default MealItemForm;
