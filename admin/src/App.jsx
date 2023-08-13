import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./contexts/authContext";
import { useAuth } from "./hooks/useAuth";
// import axios from "axios";
import Routes from "./routes";
import { LoadingContext } from "./contexts/loadingContext";
import React from "react";
import { Toaster } from "react-hot-toast";
import axios from './config/axios'


function App() {
  const [loading, setLoading] = React.useState(false);

  const { user, Login, Logout } = useAuth();
  return (
    <LoadingContext.Provider
      value={{
        loading: loading,
        setLoading: setLoading,
      }}
    >
      <AuthContext.Provider
        value={{
          isLoggedIn: !!user,
          user: user,
          Login: Login,
          Logout: Logout,
        }}
      >
        <Toaster />
        <Router>
          <Routes />
        </Router>
      </AuthContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
