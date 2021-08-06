import { Fragment } from 'react';
import React from 'react';
import HeaderButton from './HeaderButton';
import mealsImage from '../../assets/meals.jpg';
import './Header.css';

function Header({ onShow }) {
  return (
    <Fragment>
      <header className='header'>
        <h2>ReactMeals</h2>
        <HeaderButton onShow={onShow} />
      </header>
      <div className='meals-image'>
        <img src={mealsImage} alt='This is meals images' />
      </div>
    </Fragment>
  );
}

export default Header;
