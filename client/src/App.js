import './App.scss';

import {Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import {useRoutes} from "./router";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/auth.context";
import {useCart} from "./hooks/cart.hook";
import {CartContext} from "./context/cart.context";
import Loader from "./components/Loader/Loader";

function App() {
  const isOrdering = useSelector(state => state.main.isOrdering)

  const {token, login, logout, userId, isAdmin, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isOrdering, isAuthenticated, isAdmin)

  const {cart, cartInit, cartAddNewGood, cartAddNewCount, cartDeleteGood, cartClear} = useCart()

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, isAdmin
    }}>
      <CartContext.Provider value={{
        cart, cartInit, cartAddNewGood, cartAddNewCount, cartDeleteGood, cartClear
      }}>
        <Routes>
          { routes }
        </Routes>
      </CartContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;
