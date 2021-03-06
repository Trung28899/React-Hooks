import React, { useEffect, useCallback, useReducer, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";

import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

import useHttp from "../../hooks/http";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

const Ingredients = () => {
  console.log("RENDERING INGREDIENT LIST");
  /*
    note that React will re-render the component whenever your reducer returns new state

    useReducer() will return a state object and a dispatch function
  */
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  // These 4 properties are returned in our custom hook
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifier,
    clear,
  } = useHttp();

  // effect when the state: userIngredients got changed
  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === "REMOVE_INGREDIENT") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === "ADD_INGREDIENT") {
      dispatch({
        type: "ADD",
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  // Function passed to onChange in Search.js that update userIngredients state
  /*
    When we trigger useCallback() hook, the function is not re-created for a 2nd 
    time when the component got re-rendered
  */
  const filteredIngredientHandler = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  /*

    2nd argument of the fetch() is the setting of the fetch: 

    method: set the method of fetching, in this case we want to 
    post the data to the link/ingredients
    body: JSON.stringify: convert Json to normal javascript
    header: setting up the header
  */
  const addIngredientHandler = useCallback(
    (ingredients) => {
      sendRequest(
        "https://react-hooks-603d6.firebaseio.com/ingredients.json",
        "POST",
        JSON.stringify(ingredients),
        ingredients,
        "ADD_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      sendRequest(
        `https://react-hooks-603d6.firebaseio.com/ingredients/${ingredientId}.json`,
        "DELETE",
        null,
        ingredientId,
        "REMOVE_INGREDIENT"
      );
    },
    [sendRequest]
  );

  // const clearError = useCallback(() => {
  //   // not used anymore, replaced by clear in onClose for <ErrorModal>
  // }, []);

  const ingredienList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={(id) => removeIngredientHandler(id)}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        {ingredienList}
      </section>
    </div>
  );
};

export default Ingredients;
