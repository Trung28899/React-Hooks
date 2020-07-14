1. Tools used: List of Hooks used

- useState(): managing state
- useEffect(): Running side effects, requests, etc...
- useCallback(): save a function that doesn't change 
so when the component re-render, the function is not re-created
- Refs & useRef(): get the realtime value of changing input box
- useReducer(): a better alternative of useState()
- useContext(): managing state in App level
- useMemo(): save a value that doesn't change 
so when the component re-render, the value is not re-created
it is an alternative to React.memo() in IngredientsForm.js

NOTE THAT: with hooks that deal with app component (like useEffect(), useCallback(), etc...), 
the 2nd argument can be an array: 
- with [] as a second argument, hooks runs only once after the 1st render
- with other object in array as 2nd argument, hooks render only there is a
change in the other object even thought the component got re-rendered multiple times

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

h. useReducer() Hooks: 
- useReducer() a hook to manage app state. useReducer() provide more centralize
and neater code to manage your data rather than useState() > should be more
preferable
- useReducer() will return a state object and a dispatch function
- React will re-render the component whenever your reducer returns new state

i. Custom Hooks: 
- Remember the following rules
    +, your hook must always start with use
    +, In your custom hooks, you can use any other hooks
    +, Hooks must be used in the root functional component

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
Code in 8th commit

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
Code in 8th commit

See removeIngredientHandler() in Ingredients.js

VER 10: Handling Error
and Understanding State Batching & State update
(The working in the background of state in React Hooks)
-------------------------------------------------------------------
Code in 9th commit

Step 1: Open Ingredients.js
Step 2: In removeIngredientHandler, mess up the url to have some Error
so that we can see how to handle it
Step 3: Try to click to delete the item to see how it works
Step 4: See error and isLoading state and how to use it 
Step 5: Understanding State Batching & State Updates
See this link: 
https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/15701624#content
(video 442)

VER 11: useReducer() for managing state
basic version
-------------------------------------------------------------------
Code in 10th commit

Step 1: Go into Ingredients.js
Step 2: See how to set up reducer in 'ingredientReducer'
Step 3: See useReducer() declaration
Step 4: See how dispatch() function is used in 
filteredIngredientHandler, addIngredientHandler, removeIngredientHandler

VER 12: useReducer() for Http state
-------------------------------------------------------------------
Code in 11st commit

Step 1: Go into Ingredients.js
Step 2: See how to set up reducer in 'httpReducer'
Step 3: See useReducer() declaration for httpReducer
Step 4: See how dispatch() function is used in 

NOTE THAT: forgot to commmit few commits so 8th commit is crammed with more
contents. Commit track before 10th commit is not correct


VER 13: useContext() for application level state
-------------------------------------------------------------------
Code in 12nd Commit

Step 1: create context/auth-context.js. See code auth-context.js 
Step 2: go to index.js to see how to set up context for the application
(AuthContextProvider)
Step 3: go to App.js to see how to trigger useContext() and render 
components conditionally with useContext()


VER 14: useMemo() for improve app performance
-------------------------------------------------------------------
Code in 13rd Commit

Step 1: Go to Ingredients.js, see how ingredienList used useMemo()
Step 2: investigate how it works

VER 15: Getting Started with Custom Hooks
-------------------------------------------------------------------
Code in 14th Commit

Step 1: Go to src/hooks/http.js. There was a hook useHttp() created
Step 2: observe how useHttp() make an use of useReducer() to manage 
state and how useHttp() return objects
Step 3: Go to Ingredients.js, see how useHttp() is declared with object
destructuring, see how removeIngredientHandler() use the object got
return from useHttp()

In This commit, only removing ingredients works, adding wouldn't work

VER 16: Sharing Data between custom hooks & component
-------------------------------------------------------------------
Code in 15th Commit

Data object is stored in http.js, custom hook return data to Ingredients.js,
Ingredients.js dispatch action to change data or send requests

Step 1: Go to http.js to see
- httpReducer: central data handler that took dispatches
- useHttp: custom hooks that contain a bunch of logics and return an
object with multiple properties

Step 2: Go to Ingredients.js to see: 
- how sendRequest() is used to dispatch info to http.js
- useHttp() to get info from custom hook in http.js
- useEffect() to render the info from custom hook in http.js

In this commit, add and remove ingredients work, handling error is not working

VER 16.5: Using the Custom Hook
-------------------------------------------------------------------
Code in 16th Commit
This version managing the error handling part

Using Custom Hook in Ingredients.js and Search.js

Step 1: see Ingredients.js to see how clear function (a partial return of useHttp)
got used
Step 2: see Search.js to see how useHttp() is used