import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";

import IngredientList from "./IngredientList";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  /*
    This hook is used to manage side effect like http requests, etc...
    This function run after the root function got rendered or re-rendered

    Without the 2nd argument, the useEffect() re-run and make an infinite 
    loop of requests. Also if you run this code outside of useEffect, The
    same behavior should be expected

    with [] as a second argument, useEffect() acts like componentDidMount: 
    which means it runs only once after the 1st render

    [userIngredients] means the fetch will run only when userIngredients changed
  */
  // Fetch data at the beginning of the app
  useEffect(() => {
    fetch("https://react-hooks-603d6.firebaseio.com/ingredients.json")
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const loadIngredients = [];
        for (const key in responseData) {
          loadIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setUserIngredients(loadIngredients);
      });
  }, []);

  // effect when the state: userIngredients got changed
  useEffect(() => {
    console.log("RENDERING INGREDIENTS");
  }, [userIngredients]);

  // Function passed to onChange in Search.js that update userIngredients state
  /*
    When we trigger useCallback() hook, the function is not re-created for a 2nd 
    time when the component got re-rendered
  */
  const filteredIngredientHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

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
    fetch(`https://react-hooks-603d6.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE",
    }).then((response) => {
      const arrayCopy = userIngredients;
      const filteredArray = arrayCopy.filter((item) => {
        if (item.id === id) {
          return false;
        } else {
          return true;
        }
      });
      setUserIngredients(filteredArray);
    });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={(id) => removeIngredientHandler(id)}
        />
      </section>
    </div>
  );
};

export default Ingredients;
