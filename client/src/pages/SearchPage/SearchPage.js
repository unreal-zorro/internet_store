import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";

import {sortMap} from "../../utils/sortMap";
import {
  currentPageChange,
  pagesChange,
  sortChange,
  visibleChange, addMessage
} from "../../redux/mainSlice";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import Visual from "../../components/Visual/Visual";
import Sort from "../../components/Sort/Sort";
import Visible from "../../components/Visible/Visible";
import Cards from "../../components/Cards/Cards";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import Promo from "../../components/Promo/Promo";
import Text from "../../components/Text/Text";
import Loader from "../../components/Loader/Loader";

function SearchPage() {
  const categories = useSelector(state => state.categories.categories)
  const [goods, setGoods] = useState([]);

  const sortValue = useSelector(state => state.main.sortValue)
  const visibleValue = useSelector(state => state.main.visibleValue)
  const dispatch = useDispatch()

  const [searchParams] = useSearchParams()
  const searchValue = searchParams.get("value")

  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()

  const currentPage = useSelector(state => state.main.currentPage)
  const pages = useSelector(state => state.main.pages)

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError]);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataCategories = await request('/api/categories/all')
        const dataGoods = await request('/api/goods/search', 'POST', { searchValue })
        const newGoods = []

        for (let good of dataGoods.goods) {
          const currentCategoryId = dataCategories.categories.find(itemCategory => itemCategory._id === good.categoryId).id
          const currentCategory = categories.find(item => item.id === currentCategoryId)
          newGoods.push({...good, categoryTitle: currentCategory.title})
        }

        setGoods(newGoods)
        await dispatch(addMessage(dataGoods.message))
      } catch (e) {}
    }

    if (searchValue) {
      fetchData().then()
    }
    dispatch(currentPageChange(1))
  }, [])

  useEffect(() => {
    if (visibleValue === "all") {
      dispatch(pagesChange(1))
    } else {
      const pagesValue = Math.ceil(goods.length / visibleValue)
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
    if (currentPage !== 1) {
      dispatch(currentPageChange(currentPage - 1))
    }
  }

  function nextButtonClickHandler() {
    dispatch(pagesChange(pages))
    if (currentPage !== pages) {
      dispatch(currentPageChange(currentPage + 1))
    }
  }

  return (
    <Promo>
      {
        loading
          ? <Loader />
          : goods
            ? <>
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
                {
                  goods
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
                        <Card
                          key={item.id}
                          url={item.url}
                          name={item.name}
                          categoryTitle={item.categoryTitle}
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
            : <Text text="Ничего не найдено."/>
      }
    </Promo>
  )
}

export default SearchPage
