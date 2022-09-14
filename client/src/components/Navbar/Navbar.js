import './Navbar.scss'

import {Link, NavLink} from "react-router-dom";

import Burger from "./Burger/Burger";

function Navbar(props) {
  return (
    <section className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar__greeting">
          <Burger
            onClick={props.onBurgerClick}
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
          <li className="navbar__menu-item navbar__menu-item_main">
            <NavLink to="/" className="navbar__menu-link">
              Главная
            </NavLink>
          </li>
          <li className="navbar__menu-item">
            <NavLink to="/catalog" className="navbar__menu-link">
              Каталог
            </NavLink>
            <NavLink to="/catalog" className="navbar__menu-img">
              <img src="/icons/catalog.png" alt="catalog"/>
            </NavLink>
          </li>
          <li className="navbar__menu-item">
            <NavLink to="/delivery-payment" className="navbar__menu-link">
              Доставка и оплата
            </NavLink>
            <NavLink to="/delivery-payment" className="navbar__menu-img">
              <img src="/icons/delivery.png" alt="delivery"/>
            </NavLink>
          </li>
          <li className="navbar__menu-item">
            <NavLink to="/contacts" className="navbar__menu-link">
              Контакты
            </NavLink>
            <NavLink to="/contacts" className="navbar__menu-img">
              <img src="/icons/contacts.png" alt="contacts"/>
            </NavLink>
          </li>

          {
            props.isAdmin
              ? <li className="navbar__menu-item navbar__user">
                <NavLink to="/edit" className="navbar__menu-img">
                  <img src="/icons/edit.png" alt="edit" />
                </NavLink>
              </li>
              : null
          }
        </ul>

        <div className="navbar__user">
          <NavLink
            to="/cart"
            className="navbar__cart"
          >
            <img src="/icons/cart.png" alt="cart" />
            <div className={"navbar__count " + (props.count !== 0 ? 'active' : '')}>
              {props.count}
            </div>
          </NavLink>
          <Link
            to={(props.isAuth || props.isAdmin) ? "" : "/auth"}
            className="navbar__auth"
            onClick={props.isAuth || props.isAdmin ? props.onLogoutClick : undefined}
          >
            {
              (props.isAuth || props.isAdmin)
                ? <img src="/icons/out.png" alt="out" />
                : <img src="/icons/auth.png" alt="auth" />
            }
            <div className="navbar__auth-text_md">
              {(props.isAuth || props.isAdmin) ? "Выйти" : "Вход/Регистрация"}
            </div>
            <div className="navbar__auth-text_sm">
              {(props.isAuth || props.isAdmin) ? "Выйти" : "Вход/Рег."}
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Navbar
