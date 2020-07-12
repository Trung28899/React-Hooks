import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  // Using destructuring
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();

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
        fetch(
          "https://react-hooks-603d6.firebaseio.com/ingredients.json" + query
        )
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
            console.log(loadIngredients);
            onLoadIngredients(loadIngredients);
          });
      }
    }, 500);
    return () => {
      // executes and clears the previous timer before the new effect is applied
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
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
