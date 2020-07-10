import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";

import IngredientList from "./IngredientList";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  /*

    2nd argument of the fetch() is the setting of the fetch: 

    method: set the method of fetching, in this case we want to 
    post the data to the link/ingredients
    body: JSON.stringify: convert Json to normal javascript
    header: setting up the header
  */
  const addIngredientHandler = (ingredients) => {
    fetch("https://react-hooks-603d6.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredients),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredients },
        ]);
      });
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
