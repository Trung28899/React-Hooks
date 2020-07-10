import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  // Using destructuring
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");

  useEffect(() => {
    // Query understood by firebase
    const query =
      enteredFilter === 0 ? "" : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch("https://react-hooks-603d6.firebaseio.com/ingredients.json" + query)
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
        // onLoadIngredients(loadIngredients);
      });
  }, [enteredFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
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
