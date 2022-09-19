import React, {useContext, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {addCategory} from "../../redux/categoriesSlice";
import {addMessage} from "../../redux/mainSlice";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/auth.context";
import {CartContext} from "../../context/cart.context";
import Bg from "../../components/Bg/Bg";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import Footer from "../../components/Footer/Footer";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import Container from "../../components/Container/Container";

function MainLayout() {
  const categories = useSelector(state => state.categories.categories)

  const [searchValue, setSearchValue] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(window.innerWidth > 819);

  const auth = useContext(AuthContext);
  const isAuth = !!auth.token
  const isAdmin = auth.isAdmin
  const logout = auth.logout
  const userId = auth.userId

  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const dispatch = useDispatch()

  const { cart, cartClear } = useContext(CartContext)
  const count = cart.reduce((sum, item) => sum + item.count, 0)

  const sidebar = document.querySelector("#sidebar")

  useEffect(() => {
    if (isSidebarActive && window.innerWidth < 820) {
      sidebar.addEventListener("click", () => {
        setIsSidebarActive(false)
      })
    }
  }, [isSidebarActive, setIsSidebarActive, sidebar]);

  useEffect(() => {
    setSearchValue('')
    setSearchActive(false)
  }, [searchActive]);

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
  }, [categories, dispatch, request])

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError]);

  const logoutClickHandler = async () => {
    try {
      const data = await request('/api/auth/logout', 'POST', {userId, cart})

      cartClear()
      logout()
      message(data.message)
    } catch (e) {}
  }

  const burgerClickHandler = () => {
    setIsSidebarActive(!isSidebarActive)
  }

  const searchChangeHandler = value => {
    setSearchValue(value)
  }

  const searchClickHandler = () => {
    if (searchValue) {
      setSearchActive(true)
    }
  }

  const searchOnKeyDownHandler = key => {
    if (key === 'Enter') {
      searchClickHandler()
    }
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

      {
        loading
          ? <Container><Loader /></Container>
          : <Outlet
            context={{ isSidebarActive, setIsSidebarActive, searchActive, setSearchActive, searchValue, setSearchValue }}
          />
      }

      <Footer />
      <Message />
    </div>
  )
}

export default MainLayout
