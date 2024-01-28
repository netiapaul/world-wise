/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const initialState = {
    user: null,
    isAuthenticated: false,
  };

  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function reducer(state, action) {
    switch (action.type) {
      case "login":
        return { ...state, user: action.payload, isAuthenticated: true };
      case "logout":
        return { ...state, user: null, isAuthenticated: false };

      default:
        throw new Error("Unknown action: " + action.type);
    }
  }

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logOut() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function UseAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}

export { AuthProvider, UseAuth };
