import React, {useContext, useEffect, useState} from "react";
import {Outlet, Navigate} from "react-router-dom";

import Bg from "../../components/Bg/Bg";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import Container from "../../components/Container/Container";
import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarItem from "../../components/Sidebar/SidebarItem/SidebarItem";
import SidebarLink from "../../components/Sidebar/SidebarLink/SidebarLink";
import Footer from "../../components/Footer/Footer";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {AuthContext} from "../../context/auth.context";
import {CartContext} from "../../context/cart.context";
import {useHttp} from "../../hooks/http.hook";
import {useSelector} from "react-redux";
import {useMessage} from "../../hooks/message.hook";

function MainLayout() {
  const [isSidebarActive, setIsSidebarActive] = useState(window.innerWidth > 767);
  const [searchValue, setSearchValue] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const categories = useSelector(state => state.categories.categories)
  // const [loading, setLoading] = useState(false);
  const loading = false

  const burgerClickHandler = () => {
    setIsSidebarActive(!isSidebarActive)
  }

  const searchChangeHandler = value => {
    setSearchValue(value)
  }

  const searchClickHandler = () => {
    if (!searchValue) {
      return
    }

    setSearchActive(true)
  }

  useEffect(() => {
    setSearchValue('')
    setSearchActive(false)
  }, [searchActive]);

  const searchOnKeyDownHandler = key => {
    if (key === 'Enter') {
      searchClickHandler()
    }
  }

  const auth = useContext(AuthContext);
  const isAuth = !!auth.token
  const isAdmin = auth.isAdmin
  const logout = auth.logout
  const userId = auth.userId

  const message = useMessage()

  const {request, error, clearError} = useHttp()

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError]);

  const { cart, cartClear } = useContext(CartContext)
  const count = cart.reduce((sum, item) => sum + item.count, 0)

  const logoutClickHandler = async () => {
    try {
      const data = await request('/api/auth/logout', 'POST', {userId, cart})

      cartClear()
      logout()
      message(data.message)
    } catch (e) {}
  }

  return (
    <div>
      <Bg />
      <Navbar
        className={isSidebarActive ? 'active' : ''}
        isAdmin={isAdmin}
        isAuth={isAuth}
        count={count}
        onBurgerClick={burgerClickHandler}
        onLogoutClick={logoutClickHandler}
      />
      <Search
        value={searchValue}
        onChange={event => searchChangeHandler(event.target.value)}
        onClick={() => searchClickHandler()}
        onKeyDown={event => searchOnKeyDownHandler(event.key)}
      />
      <Container>
        <Sidebar
          className={isSidebarActive ? 'active' : ''}
        >
          {categories.map(item => {
            return (
              <SidebarItem
                key={item.id}
              >
                <SidebarLink
                  link={"/catalog/" + item.title}
                  linkText={item.name}
                />
              </SidebarItem>
            )
          })}
        </Sidebar>

        {
          loading
            ? <Loader />
            : searchActive
              ? <Navigate
                to={"catalog/search?value=" + searchValue}
                replace={true}
              />
              : <Outlet/>
        }

      </Container>
      <Footer />
      <Message />
    </div>
  )
}

export default MainLayout
