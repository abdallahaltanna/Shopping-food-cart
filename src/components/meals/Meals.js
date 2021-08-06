import React, { Fragment } from 'react';
import AvailableMeals from './AvailableMeals';
import Summery from './Summery';

function Meals() {
  return (
    <Fragment>
      <Summery />
      <AvailableMeals />
    </Fragment>
  );
}

export default Meals;
