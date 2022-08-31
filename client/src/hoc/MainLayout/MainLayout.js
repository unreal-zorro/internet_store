import React, {useContext, useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";

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
import {useDispatch, useSelector} from "react-redux";
import {useMessage} from "../../hooks/message.hook";
import {addCategory} from "../../redux/categoriesSlice";
import {addMessage} from "../../redux/mainSlice";

function MainLayout() {
  const [searchValue, setSearchValue] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const categories = useSelector(state => state.categories.categories)
  const [isSidebarActive, setIsSidebarActive] = useState(
    categories.length === 0
      ? false
      : window.innerWidth > 767
  );

  useEffect(() => {
    if (window.innerWidth > 767 && categories.length !== 0) {
      setIsSidebarActive(true)
    }
  }, [categories.length]);

  // const [loading, setLoading] = useState(false);
  const loading = false

  const dispatch = useDispatch()

  const burgerClickHandler = () => {
    categories.length === 0
      ? setIsSidebarActive(false)
      : setIsSidebarActive(!isSidebarActive)
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
    async function fetchData() {
      try {
        const data = await request('/api/categories/all')

        for (let category of data.categories) {
          if (!categories.find(item => item.id === category.id)) {
            const completeCategory = {
              categoryId: category.id,
              categoryTitle: category.title,
              categoryName: category.name
            }
            await dispatch(addCategory(completeCategory))
          }
        }
        await dispatch(addMessage(data.message))
      } catch (e) {}
    }

    if (categories.length === 0) {
      fetchData().then()
    }
  }, [])

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
              : <Outlet />
        }

      </Container>
      <Footer />
      <Message />
    </div>
  )
}

export default MainLayout
