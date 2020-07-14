import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";
import ErrorModal from "../UI/ErrorModal";

import useHttp from "../../hooks/http";

const Search = React.memo((props) => {
  // Using destructuring
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  /* use Effect when the enteredFilter state and props onLoadIngredients
    changed. This useEffect search for the correct elements of the search
    result only

    note that onLoadIngredients always active due to the functional component
    in Ingredients always got re-rendered. Has to use useCallBack() hook 
    to prevent infinite loop of request 
  */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        // Query understood by firebase
        const query =
          enteredFilter === ""
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest(
          "https://react-hooks-603d6.firebaseio.com/ingredients.json" + query,
          "GET"
        );
      }
    }, 500);
    return () => {
      // executes and clears the previous timer before the new effect is applied
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadIngredients = [];
      for (const key in data) {
        loadIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadIngredients(loadIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
