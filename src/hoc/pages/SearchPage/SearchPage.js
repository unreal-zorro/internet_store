import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";

import {sortMap} from "../../../utils/sortMap";
import {
  currentSearchValueChange,
  currentPageChange,
  pagesChange,
  sortChange,
  visibleChange
} from "../../../redux/mainSlice";

import Visual from "../../../components/Visual/Visual";
import Sort from "../../../components/Sort/Sort";
import Visible from "../../../components/Visible/Visible";
import Cards from "../../../components/Cards/Cards";
import Card from "../../../components/Card/Card";
import Pagination from "../../../components/Pagination/Pagination";
import Promo from "../../../components/Promo/Promo";
import Text from "../../../components/Text/Text";

function SearchPage() {
  const categories = useSelector(state => state.categories.categories)
  const sortValue = useSelector(state => state.main.sortValue)
  const visibleValue = useSelector(state => state.main.visibleValue)
  const dispatch = useDispatch()

  let [searchParams] = useSearchParams()

  const searchValue = searchParams.get("value")

  let goods = []
  categories.map(item => {
      item.goods.map(goodItem => {
        if (goodItem.name.toLowerCase().includes(searchValue.trim().toLowerCase())) {
          goods.push({...goodItem, categoryTitle: item.title})
        }
        return undefined
      })
      return undefined
    }
  )

  goods.sort(sortMap[sortValue])

  let currentPage = useSelector(state => state.main.currentPage)
  let pages = useSelector(state => state.main.pages)

  let currentSearchValue = useSelector(state => state.main.currentSearchValue)

  useEffect(() => {
    if (currentSearchValue !== searchValue) {
      dispatch(currentPageChange(1))
      dispatch(currentSearchValueChange(searchValue))
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

  return (
    <Promo>
      {
        goods.length !== 0
          ? <React.Fragment>
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
                  .map((item) => {
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
          </React.Fragment>
          : <Text text="Ничего не найдено."/>
      }
    </Promo>
  )
}

export default SearchPage
