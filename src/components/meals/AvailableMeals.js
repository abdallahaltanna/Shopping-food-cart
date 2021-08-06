import React, { useState, useEffect } from 'react';
import './AvailableMeals.css';
import Card from '../UI/Card';
import MealItem from './mealItem/MealItem';

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMeals() {
    setIsLoading(true);
    const response = await fetch(
      'https://react-https-a2f9f-default-rtdb.firebaseio.com/meals.json'
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    let loadedMeals = [];
    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setMeals(loadedMeals);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className='loading'>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className='hasError'>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className='meals'>
      <Card>
        <ul>
          {meals.map((meal) => {
            return <MealItem key={meal.id} {...meal} />;
          })}
        </ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
