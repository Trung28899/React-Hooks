import React, { useEffect, useCallback, useReducer } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";

import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

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

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...currentHttpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...currentHttpState, error: null };
    default:
      throw new Error("Should not be reached");
  }
};

const Ingredients = () => {
  /*
    note that React will re-render the component whenever your reducer returns new state

    useReducer() will return a state object and a dispatch function
  */
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

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
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  /*

    2nd argument of the fetch() is the setting of the fetch: 

    method: set the method of fetching, in this case we want to 
    post the data to the link/ingredients
    body: JSON.stringify: convert Json to normal javascript
    header: setting up the header
  */
  const addIngredientHandler = (ingredients) => {
    dispatchHttp({ type: "SEND" });
    fetch("https://react-hooks-603d6.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredients),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        return response.json();
      })
      .then((responseData) => {
        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredients },
        });
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    dispatchHttp({ type: "SEND" });
    fetch(
      `https://react-hooks-603d6.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        dispatch({ type: "DELETE", id: ingredientId });
      })
      .catch((error) => {
        // setError(error.message);
        dispatchHttp({
          type: "ERROR",
          errorMessage: "Something Went Wrong Dawg !",
        });
      });
  };

  const clearError = () => {
    dispatchHttp({ type: "CLEAR" });
  };

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

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
