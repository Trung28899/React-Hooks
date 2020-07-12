import React, { useState } from "react";

// State for the application
export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
});

// Component that exported as default contain JSX and function to modify app state
const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ login: loginHandler, isAuth: isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
