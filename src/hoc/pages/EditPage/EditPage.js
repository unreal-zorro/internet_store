import React from "react";

import {
  currentPageChange,
  pagesChange,
  sortChange,
  visibleChange
} from "../../../redux/mainSlice";
import mainStore from "../../../redux/mainStore";

import Navigation from "../../../components/Navigation/Navigation";
import NavigationTitle from "../../../components/Navigation/NavigationTitle/NavigationTitle";
import NavigationLink from "../../../components/Navigation/NavigationLink/NavigationLink";
import NavigationDivider from "../../../components/Navigation/NavigationDiveder/NavigationDivider";
import Visual from "../../../components/Visual/Visual";
import Sort from "../../../components/Sort/Sort";
import Visible from "../../../components/Visible/Visible";
import EditEmpty from "../../../components/Edit/EditEmpty/EditEmpty";
import EditContent from "../../../components/Edit/EditContent/EditContent";
import EditCards from "../../../components/Edit/EditCards/EditCards";
import EditCard from "../../../components/Edit/EditCard/EditCard";
import EditCardAdd from "../../../components/Edit/EditCardAdd/EditCardAdd";
import Pagination from "../../../components/Pagination/Pagination";
import Edit from "../../../components/Edit/Edit";
import Bg from "../../../components/Bg/Bg";
import Navbar from "../../../components/Navbar/Navbar";
import Search from "../../../components/Search/Search";
import Container from "../../../components/Container/Container";
import EditMenu from "../../../components/Edit/EditMenu/EditMenu";
import Footer from "../../../components/Footer/Footer";
import EditSidebar from "../../../components/EditSidebar/EditSidebar";
import EditSidebarItem from "../../../components/EditSidebar/EditSidebarItem/EditSidebarItem";
import EditSidebarLink from "../../../components/EditSidebar/EditSidebarLink/EditSidebarLink";
import EditSidebarEdit from "../../../components/EditSidebar/EditSidebarEdit/EditSidebarEdit";
import EditSidebarLinkEdit from "../../../components/EditSidebar/EditSidebarLinkEdit/EditSidebarLinkEdit";
import Modal from "../../../components/Modal/Modal";
import ModalEditCategory from "../../../components/Modal/ModalEditCategory/ModalEditCategory";

class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarActive: true,
      categories: mainStore.getState().categories.categories,
      searchValue: '',
      searchActive: false,
      currentPage: mainStore.getState().main.currentPage,
      pages: mainStore.getState().main.pages
    }
    this.burgerClickHandler = this.burgerClickHandler.bind(this)
    this.searchClickHandler = this.searchClickHandler.bind(this)
    this.searchChangeHandler = this.searchChangeHandler.bind(this)
    this.searchOnKeyDownHandler = this.searchOnKeyDownHandler.bind(this)
    this.sortSelectChangeHandler = this.sortSelectChangeHandler.bind(this)
    this.visibleSelectChangeHandler = this.visibleSelectChangeHandler.bind(this)
    this.prevButtonClickHandler = this.prevButtonClickHandler.bind(this)
    this.nextButtonClickHandler = this.nextButtonClickHandler.bind(this)
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

  sortSelectChangeHandler(value) {
    sortChange(value.target.value)
  }

  visibleSelectChangeHandler(value) {
    currentPageChange(1)
    visibleChange(value.target.value)
  }

  prevButtonClickHandler() {
    pagesChange(this.state.pages)
    if (this.state.currentPage === 1) {
      return undefined
    } else {
      currentPageChange(this.state.currentPage - 1)
    }
  }

  nextButtonClickHandler() {
    pagesChange(this.state.pages)
    if (this.state.currentPage === this.state.pages) {
      return undefined
    } else {
      currentPageChange(this.state.currentPage + 1)
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
        <Container
          className="edited"
        >
          <EditSidebar
            className={this.state.sidebarActive ? 'active' : ''}
          >
            <EditSidebarItem>
              <EditSidebarLink
                link=""
                linkText="Все категории"
              />
            </EditSidebarItem>

            {this.state.categories.map((item, index, array) => {
              return (
                <EditSidebarItem
                  key={item.id}
                >
                  <EditSidebarLink
                    link={"catalog/" + item.title}
                    linkText={item.name}
                  />
                  <EditSidebarEdit>
                    <EditSidebarLinkEdit
                      link=""
                      linkText=""
                      url="/icons/edit.png"
                      alt="edit"
                    />
                    <EditSidebarLinkEdit
                      link=""
                      linkText=""
                      url="/icons/delete.png"
                      alt="delete"
                    />
                  </EditSidebarEdit>
                </EditSidebarItem>
              )
            })}

            <EditSidebarItem>
              <EditSidebarLink
                link=""
                linkText=""
                className="sidebar__link-add"
                url="/icons/add.png"
                alt="add"
              />
            </EditSidebarItem>
          </EditSidebar>

          <Edit>
            <Navigation>
              <NavigationTitle>
                <NavigationLink
                  link="/catalog"
                  linkName="Каталог"
                />
              </NavigationTitle>
              <NavigationDivider />
              <NavigationTitle>
                <NavigationLink
                  link={"/catalog/"}
                  linkName={''}
                />
              </NavigationTitle>
              <NavigationDivider />
            </Navigation>

            <Visual>
              <Sort
                value={this.sortValue}
                onChange={this.sortSelectChangeHandler}
              />
              <Visible
                value={this.visibleValue}
                onChange={this.visibleSelectChangeHandler}
              />
            </Visual>

            <EditEmpty />

            <EditContent>
              <EditCards>
                <EditCard
                  id="111522"
                  url="/img/Auto_1.jpg"
                  name="Автопроигрыватель Soundmax SM-CCR3057F"
                  rating="3.0"
                  descr="1 DIN, 160 Вт, AUX, USB"
                  category="Автотовары"
                  amount="1000"
                  price="1 099"
                />

                <EditCard
                  id="33334"
                  url="/img/Home_2.jpg"
                  name="Водонагреватель газовый Zanussi GWH 10 Fonte"
                  rating="3.1"
                  descr="проточный, эмалированная сталь, 18.5 кВт, 10 л/мин, до - 50 °C, управление - механическое, газ-контроль"
                  category="Техника для дома"
                  amount="500"
                  price="10 499"
                />

                <EditCard
                  id="545454"
                  url="/img/Computers_1.jpg"
                  name="ПК ZET Gaming NEO M017"
                  rating="4.7"
                  descr="Intel Core i5-11400F, 6x2.6 ГГц, 16 ГБ DDR4, GeForce RTX 3050, SSD 512 ГБ, без ОС"
                  category="Компьютеры"
                  amount="300"
                  price="77 299"
                />

                <EditCardAdd />
              </EditCards>
            </EditContent>

            <Pagination
              currentPage={this.state.currentPage}
              pages={this.state.pages}
              onClickPrevButton={this.prevButtonClickHandler}
              onClickNextButton={this.nextButtonClickHandler}
            />
          </Edit>
        </Container>
        <EditMenu />

        <Modal
          className='active'
        >
          <ModalEditCategory
            onSumbit=''
            onReset=''
            categoryName=''
            onChangeCategoryName=''
            categoryTitle=''
            onChangeCategoryTitle=''
            categoryId=''
            onChangeCategoryId=''
          />
        </Modal>

        <Footer />
      </div>
    )
  }
}

export default EditPage
