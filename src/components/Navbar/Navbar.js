import './Navbar.scss'

import {useSelector} from "react-redux";

import {Link, NavLink, Route} from "react-router-dom";

import Burger from "./Burger/Burger";
import EditPage from "../../hoc/pages/EditPage/EditPage";

function Navbar(props) {
  const cart = useSelector(state => state.main.cart)

  let count = 0

  count = cart.reduce((sum, item) => {
    return sum + item.count
  }, 0)

  const isAuth = useSelector(state => state.main.isAuth)
  const isAdmin = useSelector(state => state.main.isAdmin)

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
            isAuth && isAdmin
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
          <Link to="/auth" className="navbar__auth">Вход/Регистрация</Link>
        </div>
      </div>
    </section>
  )
}

export default Navbar
