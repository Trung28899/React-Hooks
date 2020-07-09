import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";

// Review React.memo in component dive deep
// Anytime the state changes, the whole function
// will get rebuilted
const IngredientForm = React.memo((props) => {
  // state declaration in functional
  /*
    useState() always return an array with 2 elements: 
    +, 1st element is your current state snapshot
    +, 2nd element is a function that allows you to update
    your state
  */
  const inputState = useState({ title: "", amount: "" });

  const submitHandler = (event) => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={inputState[0].title}
              onChange={(event) =>
                inputState[1]({
                  title: event.target.value,
                  amount: inputState[0].amount,
                })
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={inputState[0].amount}
              onChange={(event) => {
                const newAmount = event.target.value;
                inputState[1]((prevInputState) => ({
                  amount: newAmount,
                  title: prevInputState.title,
                }));
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
