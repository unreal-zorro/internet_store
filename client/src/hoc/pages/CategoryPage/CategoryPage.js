import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";

import {sortMap} from "../../../utils/sortMap";
import {
  addMessage,
  currentCategoryTitleChange,
  currentPageChange,
  pagesChange,
  sortChange,
  visibleChange
} from "../../../redux/mainSlice"

import Promo from "../../../components/Promo/Promo";
import Navigation from "../../../components/Navigation/Navigation";
import NavigationTitle from "../../../components/Navigation/NavigationTitle/NavigationTitle";
import NavigationLink from "../../../components/Navigation/NavigationLink/NavigationLink";
import NavigationDivider from "../../../components/Navigation/NavigationDiveder/NavigationDivider";
import Visual from "../../../components/Visual/Visual";
import Sort from "../../../components/Sort/Sort";
import Visible from "../../../components/Visible/Visible";
import Cards from "../../../components/Cards/Cards";
import Card from "../../../components/Card/Card";
import Pagination from "../../../components/Pagination/Pagination";
import Text from "../../../components/Text/Text";
import {useHttp} from "../../../hooks/http.hook";
import {addGood} from "../../../redux/categoriesSlice";
import {useMessage} from "../../../hooks/message.hook";

function CategoryPage() {
  const categories = useSelector(state => state.categories.categories)
  const location = useLocation()
  const sortValue = useSelector(state => state.main.sortValue)
  const visibleValue = useSelector(state => state.main.visibleValue)
  const dispatch = useDispatch()
  const categoryTitle = location.pathname.slice(location.pathname.lastIndexOf('/') + 1)
  const category = categories.find((item) => item.title === categoryTitle)
      ? categories.find((item) => item.title === categoryTitle)
      : {id: 0, title: '', name: '', goods: []}

  let goods = [].concat(category.goods)
  goods.sort(sortMap[sortValue])

  let currentPage = useSelector(state => state.main.currentPage)
  let pages = useSelector(state => state.main.pages)

  let currentCategoryTitle = useSelector(state => state.main.currentCategoryTitle)

  const message = useMessage()
  const {request, error, clearError} = useHttp()

  useEffect(() => {
    if (currentCategoryTitle !== categoryTitle) {
      dispatch(currentPageChange(1))
      dispatch(currentCategoryTitleChange(categoryTitle))
    }
    if (visibleValue === "all") {
      dispatch(pagesChange(1))
    } else {
      let pagesValue = Math.ceil(goods.length / visibleValue)
      dispatch(pagesChange(pagesValue))
    }
  })

  function sortSelectChangeHandler(value) {
    dispatch(sortChange(value.target.value))
  }

  function visibleSelectChangeHandler(value) {
    dispatch(currentPageChange(1))
    dispatch(visibleChange(value.target.value))
  }

  function prevButtonClickHandler() {
    dispatch(pagesChange(pages))
    if (currentPage === 1) {
      return undefined
    } else {
      dispatch(currentPageChange(currentPage - 1))
    }
  }

  function nextButtonClickHandler() {
    dispatch(pagesChange(pages))
    if (currentPage === pages) {
      return undefined
    } else {
      dispatch(currentPageChange(currentPage + 1))
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await request(`/api/goods/category/${category.id}`)

        const categoryIndex = categories.findIndex(item => item.id === category.id)

        for (let good of data.goods) {
          if (!goods.find(item => item.id === good.id)) {
            const completeGood = {
              id: +good.id,
              url: good.url,
              name: good.name,
              descr: good.descr,
              rating: good.rating,
              price: good.price,
              amount: good.amount,
              categoryId: good.categoryId
            }
            await dispatch(addGood({
              categoryIndex,
              completeGood
            }))
          }
        }
        await dispatch(addMessage(data.message))
      } catch (e) {}
    }

    if (goods.length === 0 && category.id !== 0) {
      fetchData().then()
    }
  }, [categoryTitle])

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError]);

  return (
    <Promo>
      {
        category.title
          ? <>
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
                  link={"/catalog/" + category.title}
                  linkName={category.name}
                />
              </NavigationTitle>
              <NavigationDivider />
            </Navigation>
            <Visual>
              <Sort
                value={sortValue}
                onChange={sortSelectChangeHandler}
              />
              <Visible
                value={visibleValue}
                onChange={visibleSelectChangeHandler}
              />
            </Visual>
            <Cards>
              {goods
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
                .map((item) => {
                  return (
                    <Card
                      key={item.id}
                      url={item.url}
                      name={item.name}
                      categoryTitle={category.title}
                      id={item.id}
                      rating={item.rating}
                      price={item.price}
                    />
                  )
                })
              }
            </Cards>
            <Pagination
              currentPage={currentPage}
              pages={pages}
              onClickPrevButton={prevButtonClickHandler}
              onClickNextButton={nextButtonClickHandler}
            />
          </>
          : <Text text="Нет такой категории."/>
      }
    </Promo>
  )
}

export default CategoryPage
