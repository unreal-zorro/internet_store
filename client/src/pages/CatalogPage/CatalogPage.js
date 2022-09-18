import {useSelector} from "react-redux";

import Promo from "../../components/Promo/Promo";
import Navigation from "../../components/Navigation/Navigation";
import NavigationTitle from "../../components/Navigation/NavigationTitle/NavigationTitle";
import NavigationLink from "../../components/Navigation/NavigationLink/NavigationLink";
import NavigationDivider from "../../components/Navigation/NavigationDiveder/NavigationDivider";
import Catalog from "../../components/Catalog/Catalog";
import CatalogItem from "../../components/Catalog/CatalogItem/CatalogItem";
import Text from "../../components/Text/Text";

function CatalogPage() {
  const categories = useSelector(state => state.categories.categories)

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
      </Navigation>

      {categories.length === 0
        ? <Text
            text="Категорий пока нет."
          />
        : <Catalog>
          {categories.map(item => {
            return (
              <CatalogItem
                key={item.id}
                link={"/catalog/" + item.title}
                linkText={item.name}
              />
            )
          })}
        </Catalog>
      }
    </Promo>
  )
}

export default CatalogPage
