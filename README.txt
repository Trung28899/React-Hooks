1. Tools used: List of Hooks used

- useState(): managing state
- useEffect(): Running side effects, requests, etc...
- useCallback(): avoid infinite loop of requests
- Refs & useRef(): get the realtime value of changing input box

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


d. Rules of Hooks: 
- Must use the hooks inside functional components or custom
hooks
- Must use hooks on the root level in your root component
(This means that you can't use hooks like useState() in nested function)

e. useEffect() Hooks: 
- This hook is used to manage side effect like http requests, etc...
This function run after the root function got rendered or re-rendered

- Without the 2nd argument, the useEffect() re-run and make an infinite 
    loop of requests. Also if you run this code outside of useEffect, The
    same behavior should be expected

- with [] as a second argument, useEffect() acts like componentDidMount: 
    which means it runs only once after the 1st render

- useEffect() if return, will always return a function (See code in 9th commmit)


f. useCallback() Hooks: 
When we trigger useCallback() hook, the function is not re-created for a 2nd 
    time when the component got re-rendered

g. Refs and useRef(): 
used to get the realtime value of changing input box

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

VER 3: Passing State Data Across Components
-------------------------------------------------------------------
Code in 4th commit

Step 1: Open IngredientsForm.js, Ingredients.js and IngredientList.js
Step 2: In Ingredients.js, see how state is declared, manipulated 
in addIngredientHandler() and how is it passed between different Components
Step 3: See other opened script to see how props is used

VER 4: CHALLENGE: how to remove the item under Loaded Ingredients
by clicks
-------------------------------------------------------------------
Code in 5th commit

See removeIngredientHandler() in Ingredients.js


VER 5: Sending Http requests
-------------------------------------------------------------------
Code in 6th commit

Step 1: Go to trung28899@gmail.com account, look for react-hook > realtimeDB
to see the db
Step 2: In Ingredients.js, look for addIngredientHandler()
Step 3: See how data is posted in firebase and locally

VER 6: Using useEffect() to handle Http requests
(Replacement for componentDidMount() in Class-based)
-------------------------------------------------------------------
Code in 7th commit

Step 1: Go to Ingredients.js, read code in useEffect hook
The code in the 1st hook is to load the info in server to the
state 
Step 2: Read the note

NOTE: useEffect() in Search.js is optional to see. Howevers, it is 
not fully implemented in this version

SPECIAL TRICK: search query with firebase
See useEffect() in Search.js. See video 436. 
Note the use of query and the rules setup
in firebase > trung28899 > react-hooks

VER 7: Using useCallback() Hooks 
to avoid infinite loop of requests
-------------------------------------------------------------------
Code in 8th commit

Step 1: In Search.js see the comment right above the useEffect() Hook
Step 2: In Ingredients.js, look for useCallback(), see the comment and
how does it work

VER 8: Refs and useRef()
cleaning up with useEffect()
-------------------------------------------------------------------
Code in 9th commit

Step 1: Goes into Search.js
Step 2: See variable 'inputRef' and ref attribute in the 
<input>

*, EXPLANATION FOR THE USE OF REF: 
We don't want to send multiple requests to the server after 
every keystroke 
> so we need to set a time out to wait if user
stop for 0.5s then we send the requests 
> has an issue: state is async too so make it hard to manage 
behavior
> need a realtime input reference
> need Refs and useRef()

Step 3: see how useEffect() return a clearTimeOut for the timer

VER 9: Deleting Ingredients in firebase
-------------------------------------------------------------------
Code in 10th commit

See removeIngredientHandler() in Ingredients.js