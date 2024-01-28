import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/product";
import Pricing from "./pages/pricing";
import HomePage from "./pages/homePage";
import PageNotFound from "./pages/pageNotFound";
import AppLayout from "./pages/appLayout";
import Login from "./pages/Login";
import CityList from "./components/cityList";
import City from "./components/City";
import CountryList from "./components/countryList";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/citiesContext";
import { AuthProvider } from "./contexts/fakeAuthContext";
import ProtectedRoute from "./pages/protectedRoute";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to={"cities"} />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
