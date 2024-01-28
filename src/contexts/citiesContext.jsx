/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
  };

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    redcucer,
    initialState
  );

  function redcucer(state, action) {
    switch (action.type) {
      case "loading":
        return {
          ...state,
          isLoading: true,
        };
      case "cities/loaded":
        return {
          ...state,
          isLoading: false,
          cities: action.payload,
        };
      case "city/created":
        return {
          ...state,
          isLoading: false,
          cities: [...state.cities, action.payload],
          currentCity: action.payload,
        };
      case "city/loaded":
        return {
          ...state,
          isLoading: false,
          currentCity: action.payload,
        };
      case "city/deleted":
        return {
          ...state,
          isLoading: false,
          cities: state.cities.filter((city) => city.id !== action.payload),
          currentCity: {},
        };
      case "rejected":
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };

      default:
        throw new Error("Unknown action: " + action.type);
      // break;
    }
  }

  useEffect(() => {
    async function FetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
        // setCities(data);
      } catch (error) {
        console.log(error);
        dispatch({ type: "rejected", payload: error });
      }
    }

    FetchCities();
  }, []);

  async function getCity(id) {
    try {
      if (Number(id) === currentCity.id) return;
      // setIsLoading(true);
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "cities/loaded", payload: data });
      // setCurrentCity(data);
    } catch (error) {
      dispatch({ type: "rejected", payload: error });
      console.log(error);
    }
  }
  async function CreateCity(newCity) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
      // setCities((cities) => [...cities, data]);
      console.log(data);
    } catch (error) {
      dispatch({ type: "rejected", payload: error });
    }
  }
  async function DeleteCity(id) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      dispatch({ type: "city/deleted", payload: id });
      // setCities((cities) => cities.filter((city) => city.id !== id));
      console.log(data);
    } catch (error) {
      dispatch({ type: "rejected", payload: error });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        CreateCity,
        DeleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the citiesProviders");
  return context;
}

export { CitiesProvider, useCities };
