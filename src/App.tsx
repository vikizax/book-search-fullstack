import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import DetailsPage from "./pages/details";
import LayoutContainer from "./containers/layout";
import { useAuth0 } from "@auth0/auth0-react";
import { ProtectedRoute } from "./containers/privateRoute";
function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <>Loading...</>;

  return (
    <LayoutContainer>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/search"
          element={<ProtectedRoute component={HomePage} />}
        />
        <Route
          path="/details/:id"
          element={<ProtectedRoute component={DetailsPage} />}
        />
      </Routes>
    </LayoutContainer>
  );
}

export default App;
