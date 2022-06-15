import React from "react";
import {Outlet, Navigate} from "react-router-dom";

import categoriesStore from "../../redux/categoriesStore";

import Bg from "../../components/Bg/Bg";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import Container from "../../components/Container/Container";
import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarItem from "../../components/Sidebar/SidebarItem/SidebarItem";
import SidebarLink from "../../components/Sidebar/SidebarLink/SidebarLink";
import Footer from "../../components/Footer/Footer";
import Message from "../../components/Message/Message";

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarActive: true,
      searchValue: '',
      searchActive: false
    }
    this.burgerClickHandler = this.burgerClickHandler.bind(this)
    this.searchClickHandler = this.searchClickHandler.bind(this)
    this.searchChangeHandler = this.searchChangeHandler.bind(this)
  }

  async burgerClickHandler() {
    await this.setState(prevState => ({
      ...prevState,
      sidebarActive: !prevState.sidebarActive
    }))
  }

  async searchChangeHandler(value) {
    await this.setState(prevState => ({
      ...prevState,
      searchValue: value
    }))
  }

  async searchClickHandler() {
    const value = this.state.searchValue

    if (!value) {
      return
    }

    await this.setState(prevState => ({
      ...prevState,
      searchActive: true,
    }))
    await this.setState(prevState => ({
      ...prevState,
      searchValue: '',
      searchActive: false
    }))
  }

  async searchOnKeyDownHandler(key) {
    if (key === 'Enter') {
      await this.searchClickHandler()
    }
  }

  render() {
    const catState = categoriesStore.getState()
    const categories = catState.categories

    const searchValue = this.state.searchValue
    const searchActive = this.state.searchActive

    return (
      <div>
        <Bg />
        <Navbar
          className={this.state.sidebarActive ? 'active' : ''}
          onClick={this.burgerClickHandler}
        />
        <Search
          value={searchValue}
          onChange={(event) => this.searchChangeHandler(event.target.value)}
          onClick={() => this.searchClickHandler()}
          onKeyDown={(event) => this.searchOnKeyDownHandler(event.key)}
        />
        <Container
          className=""
        >
          <Sidebar
            className={this.state.sidebarActive ? 'active' : ''}
          >
            {categories.map((item, index, array) => {
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
            searchActive
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
}

export default MainLayout
