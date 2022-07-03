import React from "react";

import {addCategory, deleteCategory, deleteGood, editCategory} from "../../../redux/categoriesSlice";
import mainStore from "../../../redux/mainStore";
import {sortMap} from "../../../utils/sortMap";

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
import Text from "../../../components/Text/Text";

class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarActive: true,
      categories: mainStore.getState().categories.categories,
      currentCategory: '',
      category: {id: 0, title: '', name: '', goods: []},
      goods: [],
      categoryTitle: '',
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
      visibleValue: '5',
      currentPage: 1,
      pages: 10,
      editGoodAction: '',
      currentEditedGoodId: '',
      editedGoodId: '',
      errorEditedGoodId: '',
      editedGoodRating: '',
      editedGoodCategory: '',
      editedGoodUrl: '',
      editedGoodName: '',
      errorEditedGoodName: '',
      editedGoodDescr: '',
      editedGoodAmount: '',
      editedGoodPrice: ''
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
    this.editGoodClickHandler = this.editGoodClickHandler.bind(this)
    this.deleteGoodClickHandler = this.deleteGoodClickHandler.bind(this)
    this.addGoodClickHandler = this.addGoodClickHandler.bind(this)
    this.goodIdChangeHandler = this.goodIdChangeHandler.bind(this)
    this.goodRatingChangeHandler = this.goodRatingChangeHandler.bind(this)
    this.goodCategoryChangeHandler = this.goodCategoryChangeHandler.bind(this)
    this.goodUrlChangeHandler = this.goodUrlChangeHandler.bind(this)
    this.goodNameChangeHandler = this.goodNameChangeHandler.bind(this)
    this.goodDescrChangeHandler = this.goodDescrChangeHandler.bind(this)
    this.goodAmountChangeHandler = this.goodAmountChangeHandler.bind(this)
    this.goodPriceChangeHandler = this.goodPriceChangeHandler.bind(this)
    this.okGoodClickHandler = this.okGoodClickHandler.bind(this)
    this.cancelGoodClickHandler = this.cancelGoodClickHandler.bind(this)
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
      currentCategory: 'search'
    }))
  }

  async searchOnKeyDownHandler(key) {
    if (key === 'Enter') {
      await this.searchClickHandler()
    }
  }

  async sortSelectChangeHandler(value) {
    await this.setState(prevState => ({
      ...prevState,
      sortValue: value.target.value
    }))
  }

  async visibleSelectChangeHandler(value) {
    await this.setState(prevState => ({
      ...prevState,
      currentPage: 1,
      visibleValue: value.target.value
    }))

    if (this.state.visibleValue === "all") {
      await this.setState(prevState => ({
        ...prevState,
        pages: 1
      }))
    } else {
      let pagesValue = Math.ceil(this.state.goods.length / this.state.visibleValue)
      await this.setState(prevState => ({
        ...prevState,
        pages: pagesValue
      }))
    }
  }

  async prevButtonClickHandler() {
    if (this.state.currentPage === 1) {
      return undefined
    } else {
      await this.setState(prevState => ({
        ...prevState,
        currentPage: this.state.currentPage - 1
      }))
    }
  }

  async nextButtonClickHandler() {
    if (this.state.currentPage === this.state.pages) {
      return undefined
    } else {
      await this.setState(prevState => ({
        ...prevState,
        currentPage: this.state.currentPage + 1
      }))
    }
  }

  async editGoodClickHandler(goodId, categoryId) {
    await this.setState(prevState => ({
      ...prevState,
      editGoodAction: 'edit'
    }))
  }

  async deleteGoodClickHandler(goodId, categoryId) {
    const categoryIndex = this.state.categories.findIndex(item => item.id === categoryId)
    const goodIndex = this.state.categories[categoryIndex].goods.findIndex(item => item.id === goodId)
    await mainStore.dispatch(deleteGood({categoryIndex, goodIndex}))

    const category = this.state.currentCategory === 'all'
      ? mainStore.getState().categories.categories
      : mainStore.getState().categories.categories.find(item => item.name === this.state.currentCategory)
    const goods = category.length
      ? [].concat(...this.state.categories.map(item => item.goods))
      : category.goods.length === 0
        ? []
        : [].concat(category.goods)

    await this.setState(prevState => ({
      ...prevState,
      categories: mainStore.getState().categories.categories,
      goods
    }))
  }

  async addGoodClickHandler() {
    await this.setState(prevState => ({
      ...prevState,
      editGoodAction: 'add'
    }))
  }

  async goodIdChangeHandler(value) {
    await this.setState(prevState => ({
      ...prevState,
      editedGoodId: value
    }))
  }

  async goodRatingChangeHandler(value) {
    await this.setState(prevState => ({
      ...prevState,
      editedGoodRating: value
    }))
  }

  async goodCategoryChangeHandler(value) {
    await this.setState(prevState => ({
      ...prevState,
      editedGoodCategory: value
    }))
  }

  async goodUrlChangeHandler(value) {
    await this.setState(prevState => ({
      ...prevState,
      editedGoodUrl: value
    }))
  }

  async goodNameChangeHandler(value) {
    await this.setState(prevState => ({
      ...prevState,
      editedGoodName: value
    }))
  }

  async goodDescrChangeHandler(value) {
    await this.setState(prevState => ({
      ...prevState,
      editedGoodDescr: value
    }))
  }

  async goodAmountChangeHandler(value) {
    await this.setState(prevState => ({
      ...prevState,
      editedGoodAmount: value
    }))
  }

  async goodPriceChangeHandler(value) {
    await this.setState(prevState => ({
      ...prevState,
      editedGoodPrice: value
    }))
  }

  async okGoodClickHandler() {
    await this.setState(prevState => ({
      ...prevState,
      editGoodAction: ''
    }))
  }

  async cancelGoodClickHandler() {
    await this.setState(prevState => ({
      ...prevState,
      editGoodAction: ''
    }))
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.currentCategory !== prevState.currentCategory ||
      this.state.searchActive !== prevState.searchActive
    ) {
      const category = this.state.categories.find(item => item.name === this.state.currentCategory)
        ? this.state.categories.find(item => item.name === this.state.currentCategory)
        : this.state.currentCategory === 'all' || this.state.currentCategory === 'search'
          ? this.state.categories
          : {id: 0, title: '', name: '', goods: []}

      let goods = []

      if (this.state.searchActive) {
        this.state.categories.map(item => {
          item.goods.map(goodItem => {
            if (goodItem.name.toLowerCase().includes(this.state.searchValue.trim().toLowerCase())) {
              goods.push({...goodItem})
            }
            return undefined
          })
          return undefined
        })

        await this.setState(prevState => ({
          ...prevState,
          searchValue: '',
          searchActive: false
        }))
      } else {
        goods = category.length
          ? [].concat(...this.state.categories.map(item => item.goods))
          : category.goods.length === 0
            ? []
            : [].concat(category.goods)
      }

      goods.sort(sortMap[this.state.sortValue])

      goods.slice(
        (this.state.currentPage - 1) * this.state.visibleValue,
        this.state.currentPage === 1 && this.state.pages === 1
          ? goods.length
          : this.state.currentPage === this.state.pages
            ? goods.length < this.state.pages * this.state.visibleValue
              ? goods.length
              : this.state.pages * this.state.visibleValue
            : this.state.currentPage * this.state.visibleValue
      )

      const categoryTitle = category.length
        ? "all"
        : category.title

      let pages = 1

      if (this.state.visibleValue !== "all") {
        pages = Math.ceil(goods.length / this.state.visibleValue)
      } else {
        pages = 1
      }

      await this.setState(prevState => ({
        ...prevState,
        currentPage: 1,
        pages,
        category,
        goods,
        categoryTitle,
        editGoodAction: ''
      }))
    }

    if (this.state.visibleValue !== prevState.visibleValue ||
      this.state.sortValue !== prevState.sortValue) {

      if (this.state.visibleValue !== prevState.visibleValue) {
        let pages = 1

        if (this.state.visibleValue !== "all") {
          pages = Math.ceil(this.state.goods.length / this.state.visibleValue)
        } else {
          pages = 1
        }

        await this.setState(prevState => ({
          ...prevState,
          currentPage: 1,
          pages
        }))
      }

      const goods = this.state.goods

      goods.sort(sortMap[this.state.sortValue])

      goods.slice(
        (this.state.currentPage - 1) * this.state.visibleValue,
        this.state.currentPage === 1 && this.state.pages === 1
          ? goods.length
          : this.state.currentPage === this.state.pages
            ? goods.length < this.state.pages * this.state.visibleValue
              ? goods.length
              : this.state.pages * this.state.visibleValue
            : this.state.currentPage * this.state.visibleValue
      )

      await this.setState(prevState => ({
        ...prevState,
        goods
      }))
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
          className={this.state.editGoodAction ? "edited" : ""}
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
                      : this.state.currentCategory === "search"
                        ? <React.Fragment>
                          <NavigationTitle>
                            <EditNavigationLink
                              linkName="Поиск по всем категориям"
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
                  : this.state.currentCategory === 'search' && this.state.goods.length === 0
                    ? <Text
                      text="Ничего не найдено."
                    />
                    : undefined
              }
            </Promo>

            {
              this.state.currentCategory
                ? !(this.state.currentCategory === 'search' && this.state.goods.length === 0)
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

                    <EditEmpty
                      className={this.state.goods.length === 0 ? "active" : ""}
                    />

                    <EditContent>
                      <EditCards>
                        {
                          this.state.goods
                            .sort(sortMap[this.state.sortValue])
                            .slice(
                              (this.state.currentPage - 1) * this.state.visibleValue,
                              this.state.currentPage === 1 && this.state.pages === 1
                                ? this.state.goods.length
                                : this.state.currentPage === this.state.pages
                                  ? this.state.goods.length < this.state.pages * this.state.visibleValue
                                    ? this.state.goods.length
                                    : this.state.pages * this.state.visibleValue
                                  : this.state.currentPage * this.state.visibleValue
                            )
                            .map(item => {
                              return (
                                <EditCard
                                  key={item.id}
                                  id={item.id}
                                  url={item.url}
                                  name={item.name}
                                  rating={item.rating}
                                  descr={item.descr}
                                  category={this.state.category.length
                                    ? this.state.category.find(
                                      itemCategories => itemCategories.goods.find(
                                        itemGood => itemGood.id === item.id
                                      )
                                    ).name
                                    : this.state.category.name
                                  }
                                  amount={item.amount}
                                  price={item.price}
                                  onEditClick={() => this.editGoodClickHandler(
                                    item.id,
                                    this.state.category.length
                                      ? this.state.category.find(
                                        itemCategories => itemCategories.goods.find(
                                          itemGood => itemGood.id === item.id
                                        )
                                      ).id
                                      : this.state.category.id
                                  )}
                                  onDeleteClick={() => this.deleteGoodClickHandler(
                                    item.id,
                                    this.state.category.length
                                      ? this.state.category.find(
                                        itemCategories => itemCategories.goods.find(
                                          itemGood => itemGood.id === item.id
                                        )
                                      ).id
                                      : this.state.category.id
                                  )}
                                />
                              )
                            })
                        }
                        <EditCardAdd
                          onClick={this.addGoodClickHandler}
                        />
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
                : undefined
            }
          </Edit>
        </Container>

        <EditMenu
          className={this.state.editGoodAction ? "active" : ""}
          categories={this.state.categories}
          goodId={this.state.editedGoodId}
          onChangeGoodId={event => this.goodIdChangeHandler(event.target.value)}
          goodRating={this.state.editedGoodRating}
          onChangeGoodRating={event => this.goodRatingChangeHandler(event.target.value)}
          goodCategory={this.state.editedGoodCategory}
          onChangeGoodCategory={event => this.goodCategoryChangeHandler(event.target.value)}
          goodUrl={this.state.editedGoodUrl}
          onChangeGoodUrl={event => this.goodUrlChangeHandler(event.target.value)}
          goodName={this.state.editedGoodName}
          onChangeGoodName={event => this.goodNameChangeHandler(event.target.value)}
          goodDescr={this.state.editedGoodDescr}
          onChangeGoodDescr={event => this.goodDescrChangeHandler(event.target.value)}
          goodAmount={this.state.editedGoodAmount}
          onChangeGoodAmount={event => this.goodAmountChangeHandler(event.target.value)}
          goodPrice={this.state.editedGoodPrice}
          onChangeGoodPrice={event => this.goodPriceChangeHandler(event.target.value)}
          errorGoodId={this.state.errorEditedGoodId}
          errorGoodName={this.state.errorEditedGoodName}
          onOkClick={this.okGoodClickHandler}
          onCancelClick={this.cancelGoodClickHandler}
        />

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
