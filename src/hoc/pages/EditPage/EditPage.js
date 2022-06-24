import React from "react";

import {
  currentPageChange,
  pagesChange,
  sortChange,
  visibleChange
} from "../../../redux/mainSlice";
import {addCategory, deleteCategory, editCategory} from "../../../redux/categoriesSlice";
import mainStore from "../../../redux/mainStore";

import Navigation from "../../../components/Navigation/Navigation";
import NavigationTitle from "../../../components/Navigation/NavigationTitle/NavigationTitle";
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
import Catalog from "../../../components/Catalog/Catalog";
import EditCatalogItem from "../../../components/Catalog/EditCatalogItem/EditCatalogItem";
import Promo from "../../../components/Promo/Promo";
import EditNavigationLink from "../../../components/Navigation/EditNavigationLink/EditNavigationLink";

class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarActive: true,
      categories: mainStore.getState().categories.categories,
      currentCategory: '',
      editAction: '',
      currentEditedCategoryId: '',
      editedCategoryName: '',
      errorEditedCategoryName: '',
      editedCategoryTitle: '',
      errorEditedCategoryTitle: '',
      editedCategoryId: '',
      errorEditedCategoryId: '',
      searchValue: '',
      searchActive: false,
      sortValue: 'price-incr',
      visibleValue: "1",
      currentPage: mainStore.getState().main.currentPage,
      pages: mainStore.getState().main.pages
    }
    this.burgerClickHandler = this.burgerClickHandler.bind(this)
    this.catalogClickHandler = this.catalogClickHandler.bind(this)
    this.allCategoriesClickHandler = this.allCategoriesClickHandler.bind(this)
    this.categoryClickHandler = this.categoryClickHandler.bind(this)
    this.editCategoryClickHandler = this.editCategoryClickHandler.bind(this)
    this.deleteCategoryClickHandler = this.deleteCategoryClickHandler.bind(this)
    this.addCategoryClickHandler = this.addCategoryClickHandler.bind(this)
    this.categoryNameChangeHandler = this.categoryNameChangeHandler.bind(this)
    this.categoryTitleChangeHandler = this.categoryTitleChangeHandler.bind(this)
    this.categoryIdChangeHandler = this.categoryIdChangeHandler.bind(this)
    this.okClickEditCategoryHandler = this.okClickEditCategoryHandler.bind(this)
    this.cancelClickEditCategoryHandler = this.cancelClickEditCategoryHandler.bind(this)
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
      isSidebarActive: !prevState.isSidebarActive
    }))
  }

  async catalogClickHandler() {
    await this.setState(prevState => ({
      ...prevState,
      currentCategory: ""
    }))
  }

  async allCategoriesClickHandler() {
    await this.setState(prevState => ({
      ...prevState,
      currentCategory: "all"
    }))
  }

  async categoryClickHandler(name) {
    await this.setState(prevState => ({
      ...prevState,
      currentCategory: name
    }))
  }

  async editCategoryClickHandler(id) {
    const category = this.state.categories.find(item => item.id === +id)
    await this.setState(prevState => ({
      ...prevState,
      editAction: "edit",
      currentEditedCategoryId: category.id,
      editedCategoryId: category.id,
      editedCategoryName: category.name,
      editedCategoryTitle: category.title,
    }))
  }

  async deleteCategoryClickHandler(id) {
    const categoryIndex = this.state.categories.findIndex(item => item.id === id)
    await mainStore.dispatch(deleteCategory({categoryIndex}))
    await this.setState(prevState => ({
      ...prevState,
      categories: mainStore.getState().categories.categories
    }))
  }

  async addCategoryClickHandler() {
    await this.setState(prevState => ({
      ...prevState,
      editAction: 'add',
      currentEditedCategoryId: '',
      editedCategoryName: '',
      errorEditedCategoryName: '',
      editedCategoryTitle: '',
      errorEditedCategoryTitle: '',
      editedCategoryId: '',
      errorEditedCategoryId: ''
    }))
  }

  async categoryNameChangeHandler(value) {
    const name = value
    let error = ''
    if (!name) {
      error = 'Имя категории не должно быть пустым.'
    }
    await this.setState(prevState => ({
      ...prevState,
      editedCategoryName: name,
      errorEditedCategoryName: error
    }))
  }

  async categoryTitleChangeHandler(value) {
    const title = value
    let error = ''
    if (!title) {
      error = 'Заголовок категории не должен быть пустым.'
    }
    await this.setState(prevState => ({
      ...prevState,
      editedCategoryTitle: title,
      errorEditedCategoryTitle: error
    }))
  }

  async categoryIdChangeHandler(value) {
    const id = value
    let error = ''
    if (!id) {
      error = 'Идентификатор категории не должен быть пустым.'
    }
    await this.setState(prevState => ({
      ...prevState,
      editedCategoryId: id,
      errorEditedCategoryId: error
    }))
  }

  async okClickEditCategoryHandler(event) {
    event.preventDefault()

    const action = this.state.editAction
    const currentCategoryId = +this.state.currentEditedCategoryId
    const categoryName = this.state.editedCategoryName
    const categoryTitle = this.state.editedCategoryTitle
    const categoryId = this.state.editedCategoryId
    const categories = mainStore.getState().categories.categories

    let errorName = ''
    let errorTitle = ''
    let errorId = ''

    if (categoryName === '') {
      errorName = 'Имя категории не должно быть пустым.'
    }

    if (categoryTitle === '') {
      errorTitle = 'Заголовок категории не должен быть пустым.'
    }

    if (categoryId === '') {
      errorId = 'Идентификатор категории не должен быть пустым.'
    }

    if (action === 'add') {
      if (categories.find(item => item.name === categoryName)) {
        errorName = 'Категория с таким именем уже существует.'
      }

      if (categories.find(item => item.title === categoryTitle)) {
        errorTitle = 'Категория с таким заголовком уже существует.'
      }

      if (categories.find(item => item.id === +categoryId)) {
        errorId = 'Категория с таким идентификатором уже существует.'
      }
    } else if (action === 'edit') {
      const currentCategory = categories.find(item => item.id === currentCategoryId)

      if (categories.find(item =>
        currentCategory.name !== categoryName
          ? item.name === categoryName
          : undefined
      )) {
        errorName = 'Категория с таким именем уже существует.'
      }

      if (categories.find(item =>
        currentCategory.title !== categoryTitle
          ? item.title === categoryTitle
          : undefined
      )) {
        errorTitle = 'Категория с таким заголовком уже существует.'
      }

      if (categories.find(item =>
        currentCategory.id !== +categoryId
          ? item.id === +categoryId
          : undefined
      )) {
        errorId = 'Категория с таким идентификатором уже существует.'
      }
    }

    if (errorName || errorTitle || errorId) {
      await this.setState(prevState => ({
        ...prevState,
        errorEditedCategoryName: errorName,
        errorEditedCategoryTitle: errorTitle,
        errorEditedCategoryId: errorId
      }))
      return undefined
    } else {
      const completeCategory = {
        categoryId,
        categoryTitle,
        categoryName
      }

      if (action === 'add') {
        await mainStore.dispatch(addCategory(completeCategory))
      } else if (action === 'edit') {
        const index = categories.findIndex(item => item.id === currentCategoryId)
        await mainStore.dispatch(editCategory({index, completeCategory}))
      }

      await this.setState(prevState => ({
        ...prevState,
        categories: mainStore.getState().categories.categories,
        editAction: '',
        currentEditedCategoryId: '',
        editedCategoryName: '',
        errorEditedCategoryName: '',
        editedCategoryTitle: '',
        errorEditedCategoryTitle: '',
        editedCategoryId: '',
        errorEditedCategoryId: ''
      }))
    }
  }

  async cancelClickEditCategoryHandler(event) {
    event.preventDefault()
    await this.setState(prevState => ({
      ...prevState,
      categories: mainStore.getState().categories.categories,
      editAction: '',
      currentEditedCategoryId: '',
      editedCategoryName: '',
      errorEditedCategoryName: '',
      editedCategoryTitle: '',
      errorEditedCategoryTitle: '',
      editedCategoryId: '',
      errorEditedCategoryId: ''
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
    return (
      <div>
        <Bg />
        <Navbar
          className={this.state.isSidebarActive ? 'active' : ''}
          onClick={this.burgerClickHandler}
        />
        <Search
          value={this.state.searchValue}
          onChange={event => this.searchChangeHandler(event.target.value)}
          onClick={() => this.searchClickHandler()}
          onKeyDown={event => this.searchOnKeyDownHandler(event.key)}
        />
        <Container
          className="edited"
        >
          <EditSidebar
            className={this.state.isSidebarActive ? 'active' : ''}
          >
            <EditSidebarItem>
              <EditSidebarLink
                className={this.state.currentCategory === "all" ? "active" : ""}
                text="Все категории"
                onClick={this.allCategoriesClickHandler}
              />
            </EditSidebarItem>

            {this.state.categories.map(item => {
              return (
                <EditSidebarItem
                  key={item.id}
                >
                  <EditSidebarLink
                    className={this.state.currentCategory === item.name ? "active" : ""}
                    text={item.name}
                    onClick={() => this.categoryClickHandler(item.name)}
                  />
                  <EditSidebarEdit>
                    <EditSidebarLinkEdit
                      url="/icons/edit.png"
                      alt="edit"
                      onClick={() => this.editCategoryClickHandler(item.id)}
                    />
                    <EditSidebarLinkEdit
                      url="/icons/delete.png"
                      alt="delete"
                      onClick={() => this.deleteCategoryClickHandler(item.id)}
                    />
                  </EditSidebarEdit>
                </EditSidebarItem>
              )
            })}

            <EditSidebarItem>
              <EditSidebarLink
                className="sidebar__link-add"
                url="/icons/add.png"
                alt="add"
                onClick={this.addCategoryClickHandler}
              />
            </EditSidebarItem>
          </EditSidebar>

          <Edit>
            <Promo
              className="edit"
            >
              <Navigation>
                <NavigationTitle>
                  <EditNavigationLink
                    linkName="Каталог"
                    onClick={this.catalogClickHandler}
                  />
                </NavigationTitle>
                <NavigationDivider />
                {
                  this.state.currentCategory
                    ? this.state.currentCategory === "all"
                      ? <React.Fragment>
                        <NavigationTitle>
                          <EditNavigationLink
                            linkName="Все категории"
                            onClick={this.allCategoriesClickHandler}
                          />
                        </NavigationTitle>
                        <NavigationDivider />
                      </React.Fragment>
                      : <React.Fragment>
                        <NavigationTitle>
                          <EditNavigationLink
                            linkName={this.state.currentCategory}
                            onClick={() => this.categoryClickHandler(this.state.currentCategory)}
                          />
                        </NavigationTitle>
                        <NavigationDivider />
                      </React.Fragment>
                      : undefined
                }
              </Navigation>

              {
                !this.state.currentCategory
                  ? <Catalog>
                    <EditCatalogItem
                      linkText="Все категории"
                      onClick={this.allCategoriesClickHandler}
                    />
                    {
                      this.state.categories.map(item => {
                        return (
                          <EditCatalogItem
                            key={item.id}
                            linkText={item.name}
                            onClick={() => this.categoryClickHandler(item.name)}
                          />
                        )
                      })
                    }
                  </Catalog>
                  : undefined
              }
            </Promo>

            {
              this.state.currentCategory
                ? <React.Fragment>
                  <Visual>
                    <Sort
                      value={this.state.sortValue}
                      onChange={this.sortSelectChangeHandler}
                    />
                    <Visible
                      value={this.state.visibleValue}
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

                      <EditCardAdd />
                    </EditCards>
                  </EditContent>

                  <Pagination
                    currentPage={this.state.currentPage}
                    pages={this.state.pages}
                    onClickPrevButton={this.prevButtonClickHandler}
                    onClickNextButton={this.nextButtonClickHandler}
                  />
                </React.Fragment>
                : undefined
            }
          </Edit>
        </Container>

        <EditMenu />

        <Modal
          className={
          (this.state.editAction === "edit" ||
          this.state.editAction === "add")
            ? "active"
            : ""
        }
        >
          <ModalEditCategory
            onOkClick={event => this.okClickEditCategoryHandler(event)}
            onCancelClick={event => this.cancelClickEditCategoryHandler(event)}
            categoryName={this.state.editedCategoryName}
            errorCategoryName={this.state.errorEditedCategoryName}
            onChangeCategoryName={event => this.categoryNameChangeHandler(event.target.value)}
            categoryTitle={this.state.editedCategoryTitle}
            errorCategoryTitle={this.state.errorEditedCategoryTitle}
            onChangeCategoryTitle={event => this.categoryTitleChangeHandler(event.target.value)}
            categoryId={this.state.editedCategoryId}
            errorCategoryId={this.state.errorEditedCategoryId}
            onChangeCategoryId={event => this.categoryIdChangeHandler(event.target.value)}
          />
        </Modal>

        <Footer />
      </div>
    )
  }
}

export default EditPage
