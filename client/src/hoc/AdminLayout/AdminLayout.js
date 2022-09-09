import React, {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {
  addCategory,
  addGood,
  deleteCategory,
  deleteGood,
  editCategory,
  editGood
} from "../../redux/categoriesSlice";
import {addMessage} from "../../redux/mainSlice";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {sortMap} from "../../utils/sortMap";
import Container from "../../components/Container/Container";
import EditSidebar from "../../components/EditSidebar/EditSidebar";
import EditSidebarItem from "../../components/EditSidebar/EditSidebarItem/EditSidebarItem";
import EditSidebarLink from "../../components/EditSidebar/EditSidebarLink/EditSidebarLink";
import EditSidebarEdit from "../../components/EditSidebar/EditSidebarEdit/EditSidebarEdit";
import EditSidebarLinkEdit from "../../components/EditSidebar/EditSidebarLinkEdit/EditSidebarLinkEdit";
import Edit from "../../components/Edit/Edit";
import EditMenu from "../../components/Edit/EditMenu/EditMenu";
import Modal from "../../components/Modal/Modal";
import ModalEditCategory from "../../components/Modal/ModalEditCategory/ModalEditCategory";
import Navigation from "../../components/Navigation/Navigation";
import NavigationTitle from "../../components/Navigation/NavigationTitle/NavigationTitle";
import EditNavigationLink from "../../components/Navigation/EditNavigationLink/EditNavigationLink";
import NavigationDivider from "../../components/Navigation/NavigationDiveder/NavigationDivider";
import Catalog from "../../components/Catalog/Catalog";
import EditCatalogItem from "../../components/Catalog/EditCatalogItem/EditCatalogItem";
import Text from "../../components/Text/Text";
import Promo from "../../components/Promo/Promo";
import Visual from "../../components/Visual/Visual";
import Sort from "../../components/Sort/Sort";
import Visible from "../../components/Visible/Visible";
import EditEmpty from "../../components/Edit/EditEmpty/EditEmpty";
import EditContent from "../../components/Edit/EditContent/EditContent";
import EditCards from "../../components/Edit/EditCards/EditCards";
import EditCard from "../../components/Edit/EditCard/EditCard";
import EditCardAdd from "../../components/Edit/EditCardAdd/EditCardAdd";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";

function AdminLayout() {
  const { isSidebarActive, searchActive, setSearchActive, searchValue, setSearchValue } = useOutletContext()

  const dispatch = useDispatch()
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()

  const categories = useSelector(state => state.categories.categories)
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState('');

  const category = (currentCategoryTitle !== '' &&
    currentCategoryTitle !== 'all' &&
    currentCategoryTitle !== 'search')
    ? categories.find(item => item.title === currentCategoryTitle)
    : currentCategoryTitle === 'all' || currentCategoryTitle === 'search'
      ? categories
      : {id: 0, title: '', name: '', goods: []}

  const [searchGoods, setSearchGoods] = useState([]);
  const [lastSearchValue, setLastSearchValue] = useState('');

  const goods = (currentCategoryTitle !== '' &&
    currentCategoryTitle !== 'all' &&
    currentCategoryTitle !== 'search')
    ? categories.find(item => item.title === currentCategoryTitle).goods
    : currentCategoryTitle === 'all'
      ? [].concat(...categories.map(item => item.goods))
      : currentCategoryTitle === 'search'
        ? searchGoods
        : []

  const [editGoodAction, setEditGoodAction] = useState('');
  const [editAction, setEditAction] = useState('');
  const [currentEditedCategoryId, setCurrentEditedCategoryId] = useState('');
  const [editedCategoryId, setEditedCategoryId] = useState('');
  const [errorEditedCategoryId, setErrorEditedCategoryId] = useState('');
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [errorEditedCategoryName, setErrorEditedCategoryName] = useState('');
  const [editedCategoryTitle, setEditedCategoryTitle] = useState('');
  const [errorEditedCategoryTitle, setErrorEditedCategoryTitle] = useState('');
  const [editedGoodId, setEditedGoodId] = useState('');
  const [errorEditedGoodId, setErrorEditedGoodId] = useState('');
  const [editedGoodRating, setEditedGoodRating] = useState('');
  const [editedGoodCategory, setEditedGoodCategory] = useState('');
  const [editedGoodUrl, setEditedGoodUrl] = useState('');
  const [editedGoodName, setEditedGoodName] = useState('');
  const [errorEditedGoodName, setErrorEditedGoodName] = useState('');
  const [editedGoodDescr, setEditedGoodDescr] = useState('');
  const [editedGoodAmount, setEditedGoodAmount] = useState('');
  const [editedGoodPrice, setEditedGoodPrice] = useState('');
  const [currentEditedGoodId, setCurrentEditedGoodId] = useState('');
  const [currentEditedGoodCategoryId, setCurrentEditedGoodCategoryId] = useState('');

  const [sortValue, setSortValue] = useState('price-incr');
  const [visibleValue, setVisibleValue] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(10);

  useEffect(() => {
    setSearchValue('')
    setSearchActive(false)
  }, [searchActive]);

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError]);

  useEffect(() => {
    const newPages = visibleValue !== 'all'
      ? Math.ceil(goods.length / visibleValue)
      : 1
    setPages(newPages)
  }, [goods.length, pages, visibleValue]);

  useEffect(() => {
    setCurrentPage(1)
  }, [currentCategoryTitle]);

  useEffect(() => {
    if (searchActive) {
      setCurrentCategoryTitle('search')
    }

    async function fetchData() {
      try {
        const dataCategories = await request('/api/categories/all')
        const dataGoods = await request('/api/goods/search', 'POST', { searchValue })

        const newGoods = []

        for (let good of dataGoods.goods) {
          const currentCategoryId = dataCategories.categories
            .find(itemCategory => itemCategory._id === good.categoryId).id
          const currentCategory = categories.find(item => item.id === currentCategoryId)

          newGoods.push({
            ...good,
            categoryTitle: currentCategory.title,
            categoryName: currentCategory.name,
            categoryId: currentCategory.id
          })
        }

        setSearchGoods(newGoods)
        await dispatch(addMessage(dataGoods.message))
      } catch (e) {}
    }

    if (searchValue) {
      setLastSearchValue(searchValue)
      fetchData().then()
    }
    setCurrentPage(1)
  }, [searchActive]);

  const allCategoriesClickHandler = async () => {
    setCurrentCategoryTitle('all')

    const idxEmptyCategory = categories.findIndex(item => item.goods.length === 0)

    if (idxEmptyCategory !== -1) {
      try {
        const dataCategories = await request('/api/categories/all')
        const dataGoods = await request('/api/goods/all')

        for (let good of dataGoods.goods) {
          const currentCategoryId = dataCategories.categories
            .find(itemCategory => itemCategory._id === good.categoryId).id
          const currentCategory = categories.find(item => item.id === currentCategoryId)

          if (currentCategory.goods.length === 0) {
            const categoryIndex = dataCategories.categories
              .findIndex(itemCategory => itemCategory._id === good.categoryId);

            if (!currentCategory.goods.find(itemGood => itemGood.id === good.id)) {
              const completeGood = {
                id: +good.id,
                url: good.url,
                name: good.name,
                descr: good.descr,
                rating: good.rating,
                price: good.price,
                amount: good.amount
              }
              await dispatch(addGood({ categoryIndex, completeGood }))
            }
          }
        }

        await dispatch(addMessage(dataGoods.message))
      } catch (e) {}
    }
  }

  const categoryClickHandler = async (title) => {
    setCurrentCategoryTitle(title)
    const currentCategory = categories.find(item => item.title === title)

    if (currentCategory.goods.length === 0) {
      try {
        const data = await request(`/api/goods/category/${currentCategory.id}`)
        const categoryIndex = categories.findIndex(item => item.id === currentCategory.id)

        for (let good of data.goods) {
          if (!currentCategory.goods.find(item => item.id === good.id)) {
            const completeGood = {
              id: +good.id,
              url: good.url,
              name: good.name,
              descr: good.descr,
              rating: good.rating,
              price: good.price,
              amount: good.amount
            }
            await dispatch(addGood({ categoryIndex, completeGood }))
          }
        }
        await dispatch(addMessage(data.message))
      } catch (e) {}
    }
  }

  const editCategoryClickHandler = id => {
    const editedCategory = categories.find(item => item.id === +id)
    setEditAction('edit')
    setCurrentEditedCategoryId(editedCategory.id)
    setEditedCategoryId(editedCategory.id)
    setEditedCategoryName(editedCategory.name)
    setEditedCategoryTitle(editedCategory.title)
  }

  const deleteCategoryClickHandler = async (id) => {
    try {
      const data = await request('/api/categories/remove', 'DELETE', {id})
      dispatch(addMessage(data.message))
      const categoryIndex = categories.findIndex(item => item.id === id)
      dispatch(deleteCategory({categoryIndex}))
    } catch (e) {}
  }

  const addCategoryClickHandler = () => {
    setEditAction('add')
    setCurrentEditedCategoryId('')
    setEditedCategoryId('')
    setErrorEditedCategoryId('')
    setEditedCategoryName('')
    setErrorEditedCategoryName('')
    setEditedCategoryTitle('')
    setErrorEditedCategoryTitle('')
  }

  const goodIdChangeHandler = value => {
    setEditedGoodId(value)
  }

  const goodRatingChangeHandler = value => {
    setEditedGoodRating(value)
  }

  const goodCategoryChangeHandler = value => {
    setEditedGoodCategory(value)
  }

  const goodUrlChangeHandler = value => {
    setEditedGoodUrl(value)
  }

  const goodNameChangeHandler = value => {
    setEditedGoodName(value)
  }

  const goodDescrChangeHandler = value => {
    setEditedGoodDescr(value)
  }

  const goodAmountChangeHandler = value => {
    setEditedGoodAmount(value)
  }

  const goodPriceChangeHandler = value => {
    setEditedGoodPrice(value)
  }

  const okGoodClickHandler = async (event) => {
    event.preventDefault()
    const action = editGoodAction
    const currentGoodId = +currentEditedGoodId
    const currentCategoryId = +currentEditedGoodCategoryId
    const goodId = editedGoodId.toString().trim()
    const goodRating = editedGoodRating.toString().trim()
    const goodCategoryTitle = editedGoodCategory.toString().trim()
    const goodUrl = editedGoodUrl.toString().trim()
    const goodName = editedGoodName.toString().trim()
    const goodDescr = editedGoodDescr.toString().trim()
    const goodAmount = editedGoodAmount.toString().trim()
    const goodPrice = editedGoodPrice.toString().trim()

    const currentCategory = categories.find(item => item.id === currentCategoryId)
    const currentGood = currentCategory.goods.find(item => item.id === currentGoodId)

    let errorId = ''
    let errorName = ''

    if (!goodId) {
      errorId = 'Идентификатор товара не должен быть пустым.'
    }

    if (!goodName) {
      errorName = 'Имя товара не должно быть пустым.'
    }

    if (errorId || errorName) {
      setErrorEditedGoodId(errorId)
      setErrorEditedGoodName(errorName)
      return undefined
    } else {
      const completeGood = {
        id: +goodId,
        url: goodUrl,
        name: goodName,
        descr: goodDescr,
        rating: goodRating,
        price: goodPrice,
        amount: goodAmount,
        categoryId: currentCategoryId
      }

      const categoryIndex = categories.findIndex(item => item.title === goodCategoryTitle)

      if (action === 'add') {
        const data = await request('/api/goods/create', 'POST', { ...completeGood })
        dispatch(addMessage(data.message))
        dispatch(addGood({ categoryIndex, completeGood }))

        if (currentCategoryTitle === 'search' &&
          completeGood.name.toLowerCase().includes(lastSearchValue.toLowerCase())
        ) {
          const newGoods = [].concat(goods, {
            ...completeGood,
            categoryTitle: currentCategory.title,
            categoryName: currentCategory.name,
            categoryId: currentCategory.id
          })
          setSearchGoods(newGoods)
        }
      } else if (action === 'edit') {
        const data = await request('/api/goods/update', 'PUT',
          { ...completeGood, currentId: currentGoodId })
        dispatch(addMessage(data.message))

        const goodIndex = categories[categoryIndex].goods.findIndex(item => item.id === currentGoodId)
        const currentCategoryIndex = categories.findIndex(item => item === currentCategory)
        const currentGoodIndex = categories[categoryIndex].goods.findIndex(item => item === currentGood)

        if (currentCategory.title === goodCategoryTitle && currentGood.id === +goodId) {
          dispatch(editGood({ categoryIndex, goodIndex, completeGood }))
        } else {
          dispatch(addGood({ categoryIndex, completeGood }))
          dispatch(deleteGood({ categoryIndex: currentCategoryIndex, goodIndex: currentGoodIndex }))
        }

        const searchValue = lastSearchValue.toLowerCase()
        const goodSearchIndex = searchGoods.findIndex(item => item.name.toLowerCase().includes(searchValue))
        const isNewGood = completeGood.name.toLowerCase().includes(searchValue)
        const newGoods = searchGoods.slice()

        if (currentCategoryTitle === 'search') {
          if (isNewGood) {
            newGoods.splice(goodSearchIndex, 1, {
              ...completeGood,
              categoryTitle: currentCategory.title,
              categoryName: currentCategory.name,
              categoryId: currentCategory.id
            })
          } else {
            newGoods.splice(goodSearchIndex, 1)
          }
        }
        setSearchGoods(newGoods)
      }

      setEditGoodAction('')
      setCurrentEditedGoodId('')
      setCurrentEditedGoodCategoryId('')
      setEditedGoodId('')
      setErrorEditedGoodId('')
      setEditedGoodRating('')
      setEditedGoodCategory('')
      setEditedGoodUrl('')
      setEditedGoodName('')
      setErrorEditedGoodName('')
      setEditedGoodDescr('')
      setEditedGoodAmount('')
      setEditedGoodPrice('')
    }
  }

  const cancelGoodClickHandler = event => {
    event.preventDefault()
    setEditGoodAction('')
    setCurrentEditedGoodId('')
    setCurrentEditedGoodCategoryId('')
    setEditedGoodId('')
    setErrorEditedGoodId('')
    setEditedGoodRating('')
    setEditedGoodCategory('')
    setEditedGoodUrl('')
    setEditedGoodName('')
    setErrorEditedGoodName('')
    setEditedGoodDescr('')
    setEditedGoodAmount('')
    setEditedGoodPrice('')
  }

  const okCategoryClickHandler = async (event) => {
    event.preventDefault()
    const action = editAction
    const currentCategoryId = +currentEditedCategoryId
    const categoryName = editedCategoryName.toString().trim()
    const categoryTitle = editedCategoryTitle.toString().trim()
    const categoryId = editedCategoryId.toString().trim()

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

    if (errorName || errorTitle || errorId) {
      setErrorEditedCategoryName(errorName)
      setErrorEditedCategoryTitle(errorTitle)
      setErrorEditedCategoryId(errorId)
      return undefined
    } else {
      const completeCategory = {
        categoryId,
        categoryTitle,
        categoryName
      }

      if (action === 'add') {
        const data = await request('/api/categories/create', 'POST',
          {id: categoryId, title: categoryTitle, name: categoryName})
        dispatch(addMessage(data.message))
        dispatch(addCategory(completeCategory))
      } else if (action === 'edit') {
        const data = await request('/api/categories/update', 'PUT',
          {currentId: currentCategoryId, id: categoryId, title: categoryTitle, name: categoryName})
        dispatch(addMessage(data.message))
        const index = categories.findIndex(item => item.id === currentCategoryId)
        dispatch(editCategory({index, completeCategory}))
      }

      setEditAction('')
      setCurrentEditedCategoryId('')
      setEditedCategoryName('')
      setErrorEditedCategoryName('')
      setEditedCategoryTitle('')
      setErrorEditedCategoryTitle('')
      setEditedCategoryId('')
      setErrorEditedCategoryId('')
    }
  }

  const cancelCategoryClickHandler = event => {
    event.preventDefault()
    setEditAction('')
    setCurrentEditedCategoryId('')
    setEditedCategoryName('')
    setErrorEditedCategoryName('')
    setEditedCategoryTitle('')
    setErrorEditedCategoryTitle('')
    setEditedCategoryId('')
    setErrorEditedCategoryId('')
  }

  const categoryNameChangeHandler = value => {
    const error = !value ? 'Имя категории не должно быть пустым.' : ''
    setEditedCategoryName(value)
    setErrorEditedCategoryName(error)
  }

  const categoryTitleChangeHandler = value => {
    const error = !value ? 'Заголовок категории не должен быть пустым.' : ''
    setEditedCategoryTitle(value)
    setErrorEditedCategoryTitle(error)
  }

  const categoryIdChangeHandler = value => {
    const error = !value ? 'Идентификатор категории не должен быть пустым.' : ''
    setEditedCategoryId(value)
    setErrorEditedCategoryId(error)
  }

  const catalogClickHandler = () => {
    setCurrentCategoryTitle('')
  }

  const sortSelectChangeHandler = value => {
    setSortValue(value.target.value)
  }

  const visibleSelectChangeHandler =value => {
    setCurrentPage(1)
    setVisibleValue(value.target.value)

    if (visibleValue === "all") {
      setPages(1)
    } else {
      const pagesValue = Math.ceil(goods.length / visibleValue)
      setPages(pagesValue)
    }
  }

  const editGoodClickHandler = (goodId, categoryId) => {
    const editedCategory = categories.find(item => item.id === +categoryId)
    const good = currentCategoryTitle === 'search'
      ? goods.find(item => item.id === goodId)
      : editedCategory.goods.find(item => item.id === +goodId)
    setEditGoodAction('edit')
    setCurrentEditedGoodId(goodId)
    setCurrentEditedGoodCategoryId(categoryId)
    setEditedGoodId(goodId)
    setErrorEditedGoodId('')
    setEditedGoodRating(good.rating)
    setEditedGoodCategory(editedCategory.title)
    setEditedGoodUrl(good.url)
    setEditedGoodName(good.name)
    setErrorEditedGoodName('')
    setEditedGoodDescr(good.descr)
    setEditedGoodAmount(good.amount)
    setEditedGoodPrice(good.price)
  }

  const deleteGoodClickHandler = async (goodId, categoryId) => {
    const categoryIndex = categories.findIndex(item => item.id === +categoryId)
    const goodIndex = categories[categoryIndex].goods.findIndex(item => item.id === +goodId)

    try {
      const data = await request('/api/goods/remove', 'DELETE', { id: goodId })
      dispatch(addMessage(data.message))

      if (currentCategoryTitle === 'search') {
        if (goods.length) {
          setSearchGoods(goods.filter(item => item.id !== +goodId))
        }
      }

      if (goodIndex !== -1) {
        dispatch(deleteGood({ categoryIndex, goodIndex }))
      }
    } catch (e) {}
  }

  const addGoodClickHandler = (categoryId = 0) => {
    const currentCategory = (categoryId === 0)
      ? categories[0]
      : categories.find(item => item.id === +categoryId)

    setEditGoodAction('add')
    setCurrentEditedGoodId('')
    setCurrentEditedGoodCategoryId(currentCategory.id)
    setEditedGoodId('')
    setErrorEditedGoodId('')
    setEditedGoodRating('')
    setEditedGoodCategory(currentCategory.title)
    setEditedGoodUrl('')
    setEditedGoodName('')
    setErrorEditedGoodName('')
    setEditedGoodDescr('')
    setEditedGoodAmount('')
    setEditedGoodPrice('')
  }

  const prevButtonClickHandler = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextButtonClickHandler = () => {
    if (currentPage !== pages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    loading
      ? <Container><Loader /></Container>
      : <>
        <Container
          className={editGoodAction ? "edited" : ""}
        >
          <EditSidebar
            className={isSidebarActive ? 'active' : ''}
          >
            <EditSidebarItem>
              <EditSidebarLink
                className={currentCategoryTitle === "all" ? "active" : ""}
                text="Все категории"
                onClick={allCategoriesClickHandler}
              />
            </EditSidebarItem>

            {categories.map(item => {
              return (
                <EditSidebarItem
                  key={item.id}
                >
                  <EditSidebarLink
                    className={currentCategoryTitle === item.title ? "active" : ""}
                    text={item.name}
                    onClick={() => categoryClickHandler(item.title)}
                  />
                  <EditSidebarEdit>
                    <EditSidebarLinkEdit
                      url="/icons/edit.png"
                      alt="edit"
                      onClick={() => editCategoryClickHandler(item.id)}
                    />
                    <EditSidebarLinkEdit
                      url="/icons/delete.png"
                      alt="delete"
                      onClick={() => deleteCategoryClickHandler(item.id)}
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
                onClick={addCategoryClickHandler}
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
                    onClick={catalogClickHandler}
                  />
                </NavigationTitle>
                <NavigationDivider />
                {
                  currentCategoryTitle
                    ? currentCategoryTitle === "all"
                      ? <>
                        <NavigationTitle>
                          <EditNavigationLink
                            linkName="Все категории"
                            onClick={allCategoriesClickHandler}
                          />
                        </NavigationTitle>
                        <NavigationDivider />
                      </>
                      : currentCategoryTitle === "search"
                        ? <>
                          <NavigationTitle>
                            <EditNavigationLink
                              linkName="Поиск по всем категориям"
                            />
                          </NavigationTitle>
                          <NavigationDivider />
                        </>
                        : <>
                          <NavigationTitle>
                            <EditNavigationLink
                              linkName={categories.find(item => item.title === currentCategoryTitle).name}
                              onClick={() => categoryClickHandler(currentCategoryTitle)}
                            />
                          </NavigationTitle>
                          <NavigationDivider />
                        </>
                    : undefined
                }
              </Navigation>

              {
                !currentCategoryTitle
                  ? <Catalog>
                    <EditCatalogItem
                      linkText="Все категории"
                      onClick={allCategoriesClickHandler}
                    />
                    {
                      categories.map(item => {
                        return (
                          <EditCatalogItem
                            key={item.id}
                            linkText={item.name}
                            onClick={() => categoryClickHandler(item.title)}
                          />
                        )
                      })
                    }
                  </Catalog>
                  : currentCategoryTitle === 'search' && goods.length === 0
                    ? <Text
                      text="Ничего не найдено."
                    />
                    : undefined
              }
            </Promo>

            {
              currentCategoryTitle
                ? !(goods.length === 0)
                  ? <>
                    <Visual
                      className="edit"
                    >
                      <Sort
                        value={sortValue}
                        onChange={sortSelectChangeHandler}
                      />
                      <Visible
                        value={visibleValue}
                        onChange={visibleSelectChangeHandler}
                      />
                    </Visual>

                    <EditEmpty
                      className={goods.length === 0 ? "active" : ""}
                    />

                    <EditContent>
                      <EditCards>
                        {
                          goods.slice()
                            .sort(sortMap[sortValue])
                            .slice(
                              (currentPage - 1) * visibleValue,
                              currentPage === 1 && pages === 1
                                ? goods.length
                                : currentPage === pages
                                  ? goods.length < pages * visibleValue
                                    ? goods.length
                                    : pages * visibleValue
                                  : currentPage * visibleValue
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
                                  category={currentCategoryTitle === 'all'
                                    ? category.find(
                                      itemCategory => itemCategory.goods.find(
                                        itemGood => itemGood.id === item.id
                                      )
                                    ).name
                                    : currentCategoryTitle === 'search'
                                      ? item.categoryName
                                      : category.name
                                  }
                                  amount={item.amount}
                                  price={item.price}
                                  onEditClick={() => editGoodClickHandler(
                                    item.id,
                                    currentCategoryTitle === 'all'
                                      ? category.find(
                                        itemCategories => itemCategories.goods.find(
                                          itemGood => itemGood.id === item.id
                                        )
                                      ).id
                                      : currentCategoryTitle === 'search'
                                        ? item.categoryId
                                        : category.id
                                  )}
                                  onDeleteClick={() => deleteGoodClickHandler(
                                    item.id,
                                    currentCategoryTitle === 'all'
                                      ? categories.find(
                                        itemCategories => itemCategories.goods.find(
                                          itemGood => itemGood.id === item.id
                                        )
                                      ).id
                                      : currentCategoryTitle === 'search'
                                        ? item.categoryId
                                        : category.id
                                  )}
                                />
                              )
                            })
                        }
                        <EditCardAdd
                          onClick={() => addGoodClickHandler(
                            (currentCategoryTitle === 'all' || currentCategoryTitle === 'search')
                              ? 0
                              : categories.find(item => item.title === currentCategoryTitle).id
                          )}
                        />
                      </EditCards>
                    </EditContent>

                    <Pagination
                      currentPage={currentPage}
                      pages={pages}
                      onClickPrevButton={prevButtonClickHandler}
                      onClickNextButton={nextButtonClickHandler}
                    />
                  </>
                  : undefined
                : undefined
            }
          </Edit>
        </Container>

        <EditMenu
          className={editGoodAction ? "active" : ""}
          categories={categories}
          goodId={editedGoodId}
          onChangeGoodId={event => goodIdChangeHandler(event.target.value)}
          goodRating={editedGoodRating}
          onChangeGoodRating={event => goodRatingChangeHandler(event.target.value)}
          goodCategory={editedGoodCategory}
          onChangeGoodCategory={event => goodCategoryChangeHandler(event.target.value)}
          goodUrl={editedGoodUrl}
          onChangeGoodUrl={event => goodUrlChangeHandler(event.target.value)}
          goodName={editedGoodName}
          onChangeGoodName={event => goodNameChangeHandler(event.target.value)}
          goodDescr={editedGoodDescr}
          onChangeGoodDescr={event => goodDescrChangeHandler(event.target.value)}
          goodAmount={editedGoodAmount}
          onChangeGoodAmount={event => goodAmountChangeHandler(event.target.value)}
          goodPrice={editedGoodPrice}
          onChangeGoodPrice={event => goodPriceChangeHandler(event.target.value)}
          errorGoodId={errorEditedGoodId}
          errorGoodName={errorEditedGoodName}
          onOkClick={event => okGoodClickHandler(event)}
          onCancelClick={event => cancelGoodClickHandler(event)}
        />

        <Modal
          className={ (editAction === "edit" || editAction === "add") ? "active" : "" }
        >
          <ModalEditCategory
            onOkClick={event => okCategoryClickHandler(event)}
            onCancelClick={event => cancelCategoryClickHandler(event)}
            categoryName={editedCategoryName}
            errorCategoryName={errorEditedCategoryName}
            onChangeCategoryName={event => categoryNameChangeHandler(event.target.value)}
            categoryTitle={editedCategoryTitle}
            errorCategoryTitle={errorEditedCategoryTitle}
            onChangeCategoryTitle={event => categoryTitleChangeHandler(event.target.value)}
            categoryId={editedCategoryId}
            errorCategoryId={errorEditedCategoryId}
            onChangeCategoryId={event => categoryIdChangeHandler(event.target.value)}
          />
        </Modal>
      </>
  )
}

export default AdminLayout
