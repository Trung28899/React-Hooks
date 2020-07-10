import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";

import IngredientList from "./IngredientList";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = (ingredients) => {
    setUserIngredients((prevIngredients) => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredients },
    ]);
  };

  const removeIngredientHandler = (id) => {
    const arrayCopy = userIngredients;
    const filteredArray = arrayCopy.filter((item) => {
      if (item.id === id) {
        return false;
      } else {
        return true;
      }
    });
    setUserIngredients(filteredArray);
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={(id) => removeIngredientHandler(id)}
        />
      </section>
    </div>
  );
};

export default Ingredients;
