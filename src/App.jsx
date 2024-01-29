import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/citiesContext";
import { AuthProvider } from "./contexts/fakeAuthContext";
import ProtectedRoute from "./pages/protectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/product";
// import Pricing from "./pages/pricing";
// import HomePage from "./pages/homePage";
// import PageNotFound from "./pages/pageNotFound";
// import AppLayout from "./pages/appLayout";
// import Login from "./pages/Login";

import CityList from "./components/cityList";
import City from "./components/City";
import CountryList from "./components/countryList";
import Form from "./components/Form";

const HomePage = lazy(() => import("./pages/homePage"));
const Product = lazy(() => import("./pages/product"));
const Pricing = lazy(() => import("./pages/pricing"));
const PageNotFound = lazy(() => import("./pages/pageNotFound"));
const AppLayout = lazy(() => import("./pages/appLayout"));
const Login = lazy(() => import("./pages/Login"));

// dist/index.html                   0.46 kB │ gzip:   0.31 kB
// dist/assets/index-790367f5.css   31.80 kB │ gzip:   5.25 kB
// dist/assets/index-165f48f8.js   532.84 kB │ gzip: 150.55 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
