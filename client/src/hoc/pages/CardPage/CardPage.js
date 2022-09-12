import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import React, {useContext, useEffect} from "react";

import {CartContext} from "../../../context/cart.context";
import {useMessage} from "../../../hooks/message.hook";
import {useHttp} from "../../../hooks/http.hook";
import Navigation from "../../../components/Navigation/Navigation";
import NavigationTitle from "../../../components/Navigation/NavigationTitle/NavigationTitle";
import NavigationLink from "../../../components/Navigation/NavigationLink/NavigationLink";
import NavigationDivider from "../../../components/Navigation/NavigationDiveder/NavigationDivider";
import Description from "../../../components/Description/Description";
import Promo from "../../../components/Promo/Promo";
import Text from "../../../components/Text/Text";
import {addGood} from "../../../redux/categoriesSlice";
import {addMessage} from "../../../redux/mainSlice";

function CardPage() {
  const categories = useSelector(state => state.categories.categories)
  const location = useLocation()

  const categoryTitleAndGoodId = location.pathname[location.pathname.length - 1] === '/'
    ? location.pathname.slice(location.pathname.indexOf('/catalog/') + 1, -1)
    : location.pathname.slice(location.pathname.indexOf('/catalog/') + 1)

  const goodId = categoryTitleAndGoodId.slice(categoryTitleAndGoodId.lastIndexOf('/') + 1)
  const categoryTitle = categoryTitleAndGoodId
    .slice("catalog/".length, categoryTitleAndGoodId.length - goodId.length - 1)

  const category =
    categories.find(item => item.title === categoryTitle)
      ? categories.find(item => item.title === categoryTitle)
      : {id: 0, title: '', name: '', goods: []}

  const good =
    category.goods.find(item => item.id === +goodId)
      ? category.goods.find(item => item.id === +goodId)
      : {url: "", name: "", descr: "", id: 0, rating: "", price: ""}

  const { cart, cartAddNewCount, cartAddNewGood } = useContext(CartContext);
  const message = useMessage()
  let count = 1

  const {request, error, clearError} = useHttp()
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await request(`/api/goods/${categoryTitle}/${goodId}`)
        const categoryIndex = categories.findIndex(item => item.id === category.id)

        if (!category.goods.find(item => item.id === data.good.id) && data.good.id === +goodId) {
          const completeGood = {
            id: +data.good.id,
            url: data.good.url,
            name: data.good.name,
            descr: data.good.descr,
            rating: data.good.rating,
            price: data.good.price,
            amount: data.good.amount,
            categoryId: data.good.categoryId
          }

          await dispatch(addGood({ categoryIndex, completeGood }))
        }
        await dispatch(addMessage(data.message))
      } catch (e) {}
    }

    if (category.goods.length === 0 && category.id !== 0) {
      fetchData().then()
    }
  }, [categoryTitle])

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError]);

  function inputCountChangeHandler(value) {
    count = +value.target.value
  }

  function addToCartClickHandler() {
    if (count < 1) {
      return
    }

    let goodIndex = 0

    const goodToCart = cart.find((item, index) => {
      if (item.id === good.id) {
        goodIndex = index
        return item
      } else {
        return undefined
      }
    })

    if (goodToCart) {
      const newCount = goodToCart.count + count
      const goodWithNewCount = {
        ...goodToCart,
        count: newCount
      }
      cartAddNewCount(goodIndex, goodWithNewCount)
      message("Количество товаров в корзине изменено.")
    } else {
      const newGood = {
        categoryId: category.id,
        id: good.id,
        count
      }
      cartAddNewGood(newGood)
      message("Товар добавлен в корзину.")
    }
  }

  return (
    <Promo>
      {
        category.title
          ? good.name
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
                <NavigationTitle>
                  <NavigationLink
                    link={"/catalog/" + category.title + "/" + good.id}
                    linkName={good.name}
                  />
                </NavigationTitle>
                <NavigationDivider />
              </Navigation>
              <Description
                url={good.url}
                name={good.name}
                descr={good.descr}
                id={good.id}
                categoryId={category.id}
                rating={good.rating}
                price={good.price}
                count={count}
                inputCountChangeHandler={inputCountChangeHandler}
                addToCartClickHandler={addToCartClickHandler}
              />
            </>
            : <Text text="Нет такого товара."/>
          : <Text text="Нет такой категории."/>
      }
    </Promo>
  )
}

export default CardPage
