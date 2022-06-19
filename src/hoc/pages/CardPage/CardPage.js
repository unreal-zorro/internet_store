import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import React from "react";

import Navigation from "../../../components/Navigation/Navigation";
import NavigationTitle from "../../../components/Navigation/NavigationTitle/NavigationTitle";
import NavigationLink from "../../../components/Navigation/NavigationLink/NavigationLink";
import NavigationDivider from "../../../components/Navigation/NavigationDiveder/NavigationDivider";
import Description from "../../../components/Description/Description";
import Promo from "../../../components/Promo/Promo";
import Text from "../../../components/Text/Text";

function CardPage() {
  const categories = useSelector(state => state.categories.categories)
  const location = useLocation()

  const categoryTitleAndGoodId = location.pathname.slice(location.pathname.indexOf('/catalog/') + 1)
  const goodId = location.pathname.slice(location.pathname.lastIndexOf('/') + 1)

  const categoryTitle = categoryTitleAndGoodId.slice("catalog/".length, categoryTitleAndGoodId.length - goodId.length - 1)

  const category =
    categories.find(item => item.title === categoryTitle)
      ? categories.find(item => item.title === categoryTitle)
      : {id: 0, title: '', name: '', goods: []}

  const good =
    category.goods.find(item => item.id === +goodId)
      ? category.goods.find(item => item.id === +goodId)
      : {url: "", name: "", descr: "", id: 0, rating: "", price: ""}

  return (
    <Promo>
      {
        category.title
          ? good.name
            ? <React.Fragment>
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
              />
            </React.Fragment>
            : <Text text="Нет такого товара."/>
          : <Text text="Нет такой категории."/>
      }
    </Promo>
  )
}

export default CardPage
