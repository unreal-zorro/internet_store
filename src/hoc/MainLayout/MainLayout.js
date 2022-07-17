import React from "react";
import {Outlet, Navigate} from "react-router-dom";

import mainStore from "../../redux/mainStore";

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

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarActive: (window.innerWidth > 767),
      searchValue: '',
      searchActive: false,
      categories: mainStore.getState().categories.categories,
      loading: false
    }
    this.burgerClickHandler = this.burgerClickHandler.bind(this)
    this.searchClickHandler = this.searchClickHandler.bind(this)
    this.searchChangeHandler = this.searchChangeHandler.bind(this)
    this.searchOnKeyDownHandler = this.searchOnKeyDownHandler.bind(this)
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
        <Container>
          <Sidebar
            className={this.state.sidebarActive ? 'active' : ''}
          >
            {this.state.categories.map(item => {
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
            this.state.loading
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
}

export default MainLayout
