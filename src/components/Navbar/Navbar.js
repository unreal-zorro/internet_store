import './Navbar.scss'

import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {addMessage, logout} from "../../redux/mainSlice";

import Burger from "./Burger/Burger";

function Navbar(props) {
  const cart = useSelector(state => state.main.cart)

  const count = cart.reduce((sum, item) => {
    return sum + item.count
  }, 0)

  const isAuth = useSelector(state => state.main.isAuth)
  const isAdmin = useSelector(state => state.main.isAdmin)

  const dispatch = useDispatch()

  function onLogoutClickHandler() {
    dispatch(logout())
    dispatch(addMessage("Вы вышли из системы."))
  }

  return (
    <section className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar__greeting">
          <Burger
            onClick={props.onClick}
            className={props.className}
          />

          <Link to="/" className="navbar__logo">
            <img src="/icons/logo.png" alt="logo" />
          </Link>

          <Link to="/" className="navbar__header">
            Интернет-магазин
          </Link>
        </div>

        <ul className="navbar__menu">
          <li className="navbar__menu-item">
            <NavLink to="/" className="navbar__menu-link">
              Главная
            </NavLink>
          </li>
          <li className="navbar__menu-item">
            <NavLink to="/catalog" className="navbar__menu-link">
              Каталог
            </NavLink>
          </li>
          <li className="navbar__menu-item">
            <NavLink to="/delivery-payment" className="navbar__menu-link">
              Доставка и оплата
            </NavLink>
          </li>
          <li className="navbar__menu-item">
            <NavLink to="/contacts" className="navbar__menu-link">
              Контакты
            </NavLink>
          </li>

          {
            isAdmin
              ? <li className="navbar__menu-item navbar__user">
                <NavLink to="/edit" className="navbar__edit">
                  <img src="/icons/edit.png" alt="edit" />
                </NavLink>
              </li>
              : undefined
          }
        </ul>

        <div className="navbar__user">
          <NavLink to="/cart" className="navbar__cart">
            <img src="/icons/cart.png" alt="cart" />
            <div className={"navbar__count " + (count !== 0 ? 'active' : '')}>
              {count}
            </div>
          </NavLink>
          <div
            onClick={isAuth || isAdmin ? onLogoutClickHandler : undefined}
          >
            <Link
              to={isAuth || isAdmin ? "" : "/auth"}
              className="navbar__auth"
            >
              {isAuth || isAdmin ? "Выйти" : "Вход/Регистрация"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Navbar
