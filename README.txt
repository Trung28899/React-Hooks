1. Tools used: 

2. Core Knowledge: 

a. Types of component before react hooks: 
- Class based component:
    +, Takes Props in, return JSX out
    +, Great for presentation
    +, Focused on limited purpose, mostly 
    rendering component only

- Functional component: 
    +, Uses props and state
    +, Business logic goes in here
    +, Orchestrates components

In general, Functional component can't have states and lifecyle 
methods yet while Class-based can 

b. What is React-Hooks: 

- React Hooks is an approach that allows us to work with
Functional component ONLY while still able to maintain 
state and lifecyle hooks. 

- React Hooks: 
    +, is introduced with React 16.8
    +, Allow dev to use Functional components only
    +, Has Hooks for managing states and side effects
    (HTTP requests, etc...)
    +, Allow dev to build custom hooks to share stateful
    or stateless logic across multiple components

- Naming React rules: 
    +, named: useXYZ(). XYZ is the function's name

c. useState() function return: 
- useState() always return an array with 2 elements: 
    +, 1st element is your current state snapshot
    +, 2nd element is a function that allows you to update
    your state

3. Guide on how to use this module:

VER 1: useState() to set, get and update
state properly in React
-------------------------------------------------------------------
Code in 2nd commit

Step 1: Go to components/Ingredients/IngredientsForm.js
Step 2: See how to DECLARE STATE with the declaration of 
'inputState'
Step 3: Look into the two <input> tags, see 'value' attributes
to see how to GET STATE 
Step 4: Look into the two <input> tags, see the 'onChange' attributes
to see the 2 ways of updating state
    +, <input> of 'Name': updating state, howevers, might
    have unpredicted event of updating the other box 
    +, <input> of 'Amount': updating state properly, follow
    exactly this approach all the time for perfect state 
    updating

VER 2: managing multiple states
-------------------------------------------------------------------
Code in 3rd commit

The original approach would lengthen the code when it comes to 
update states. We can call multiple useState() with the use of 
array destructuring to manage multiple states easier. 

Step 1: Go to components/Ingredients/IngredientsForm.js
Step 2: See how useState() is used and declared
Step 3: See onChange to see how to update state with multiple
state