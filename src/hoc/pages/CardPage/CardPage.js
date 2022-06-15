import categoriesStore from "../../../redux/categoriesStore";

import {useLocation} from "react-router-dom";

import Navigation from "../../../components/Navigation/Navigation";
import NavigationTitle from "../../../components/Navigation/NavigationTitle/NavigationTitle";
import NavigationLink from "../../../components/Navigation/NavigationLink/NavigationLink";
import NavigationDivider from "../../../components/Navigation/NavigationDiveder/NavigationDivider";
import Description from "../../../components/Description/Description";
import Promo from "../../../components/Promo/Promo";

function CardPage() {
  const catState = categoriesStore.getState();
  const location = useLocation()

  const categoryTitleAndGoodId = location.pathname.slice(location.pathname.indexOf('/catalog/') + 1)
  const goodId = location.pathname.slice(location.pathname.lastIndexOf('/') + 1)

  const categoryTitle = categoryTitleAndGoodId.slice("catalog/".length, categoryTitleAndGoodId.length - goodId.length - 1)

  const category = catState.categories.find((item, index, array) => {
    return item.title === categoryTitle
  })

  const good = category.goods.find((item, index, array) => {
    return item.id === +goodId
  })

  return (
    <Promo>
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
    </Promo>
  )
}

export default CardPage
