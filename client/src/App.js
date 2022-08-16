import './App.scss';

import {Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import {useRoutes} from "./router";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/auth.context";

function App() {
  const isOrdering = useSelector(state => state.main.isOrdering)

  const {token, login, logout, userId} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isOrdering, isAuthenticated)

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Routes>
        { routes }
      </Routes>
    </AuthContext.Provider>
  )
}

export default App;
