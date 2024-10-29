//Import de la feuille de style
import "./App.css";

//Import des hooks
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { GlobalContextProvider } from "./context/GlobalContext";

//Import des pages
import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./pages/admin/dashboard";
import Catalog from "./pages/admin/catalog";

//Import des composants
import AdminRoute from "./components/isAdmin";

function App() {
  return (
    <>
      <GlobalContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/catalog"
              element={
                <AdminRoute>
                  <Catalog />
                </AdminRoute>
              }
            ></Route>
          </Routes>
        </Router>
      </GlobalContextProvider>
    </>
  );
}

export default App;
