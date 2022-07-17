import './Navbar.scss'

import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {addMessage, logout} from "../../redux/mainSlice";

import Burger from "./Burger/Burger";
import {addAdminCart, addUserCart} from "../../redux/usersSlice";

function Navbar(props) {
  const cart = useSelector(state => state.main.cart)

  const count = cart.reduce((sum, item) => {
    return sum + item.count
  }, 0)

  const isAuth = useSelector(state => state.main.isAuth)
  const isAdmin = useSelector(state => state.main.isAdmin)
  const userLogin = useSelector(state => state.main.login)

  const users = useSelector(state => state.users.users)

  const dispatch = useDispatch()

  function onLogoutClickHandler() {
    if (isAdmin) {
      dispatch(addAdminCart({cart}))
      dispatch(logout())
      dispatch(addMessage("Вы вышли из системы, администратор."))
    } else if (isAuth) {
      const userIndex = users.findIndex(item => item.login === userLogin)

      dispatch(addUserCart({userIndex, cart}))
      dispatch(logout())
      dispatch(addMessage("Вы вышли из системы."))
    }
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
          <NavLink
            to="/cart"
            className="navbar__cart"
          >
            <img src="/icons/cart.png" alt="cart" />
            <div className={"navbar__count " + (count !== 0 ? 'active' : '')}>
              {count}
            </div>
          </NavLink>
          <Link
            to={isAuth || isAdmin ? "" : "/auth"}
            className="navbar__auth"
            onClick={isAuth || isAdmin ? onLogoutClickHandler : undefined}
          >
            {
              isAuth || isAdmin
                ? <img src="/icons/out.png" alt="out" />
                : <img src="/icons/auth.png" alt="auth" />
            }
            <div className="navbar__auth-text_md">
              {isAuth || isAdmin ? "Выйти" : "Вход/Регистрация"}
            </div>
            <div className="navbar__auth-text_sm">
              {isAuth || isAdmin ? "Выйти" : "Вход/Рег."}
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Navbar
