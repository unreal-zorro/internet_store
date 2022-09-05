import {useSelector} from "react-redux";

import Promo from "../../../components/Promo/Promo";
import Navigation from "../../../components/Navigation/Navigation";
import NavigationTitle from "../../../components/Navigation/NavigationTitle/NavigationTitle";
import EditNavigationLink from "../../../components/Navigation/EditNavigationLink/EditNavigationLink";
import NavigationDivider from "../../../components/Navigation/NavigationDiveder/NavigationDivider";
import Catalog from "../../../components/Catalog/Catalog";
import EditCatalogItem from "../../../components/Catalog/EditCatalogItem/EditCatalogItem";
import Text from "../../../components/Text/Text";

function EditCatalogPage(props) {
  // const categories = useSelector(state => state.categories.categories)
  //
  // const catalogClickHandler = () => {
  //   props.setCurrentCategory('')
  // }
  //
  // const allCategoriesClickHandler = () => {
  //   props.setCurrentCategory('all')
  // }
  //
  // const categoryClickHandler = name => {
  //   props.setCurrentCategory(name)
  // }

  return (
    <>
      {/*<Promo*/}
      {/*  className="edit"*/}
      {/*>*/}
      {/*  <Navigation>*/}
      {/*    <NavigationTitle>*/}
      {/*      <EditNavigationLink*/}
      {/*        linkName="Каталог"*/}
      {/*        onClick={catalogClickHandler}*/}
      {/*      />*/}
      {/*    </NavigationTitle>*/}
      {/*    <NavigationDivider />*/}
      {/*    {*/}
      {/*      props.currentCategory*/}
      {/*        ? props.currentCategory === "all"*/}
      {/*          ? <>*/}
      {/*            <NavigationTitle>*/}
      {/*              <EditNavigationLink*/}
      {/*                linkName="Все категории"*/}
      {/*                onClick={allCategoriesClickHandler}*/}
      {/*              />*/}
      {/*            </NavigationTitle>*/}
      {/*            <NavigationDivider />*/}
      {/*          </>*/}
      {/*          : props.currentCategory === "search"*/}
      {/*            ? <>*/}
      {/*              <NavigationTitle>*/}
      {/*                <EditNavigationLink*/}
      {/*                  linkName="Поиск по всем категориям"*/}
      {/*                />*/}
      {/*              </NavigationTitle>*/}
      {/*              <NavigationDivider />*/}
      {/*            </>*/}
      {/*            : <>*/}
      {/*              <NavigationTitle>*/}
      {/*                <EditNavigationLink*/}
      {/*                  linkName={props.currentCategory}*/}
      {/*                  onClick={() => categoryClickHandler(props.currentCategory)}*/}
      {/*                />*/}
      {/*              </NavigationTitle>*/}
      {/*              <NavigationDivider />*/}
      {/*            </>*/}
      {/*        : undefined*/}
      {/*    }*/}
      {/*  </Navigation>*/}

      {/*  {*/}
      {/*    !props.currentCategory*/}
      {/*      ? <Catalog>*/}
      {/*        <EditCatalogItem*/}
      {/*          linkText="Все категории"*/}
      {/*          onClick={allCategoriesClickHandler}*/}
      {/*        />*/}
      {/*        {*/}
      {/*          categories.map(item => {*/}
      {/*            return (*/}
      {/*              <EditCatalogItem*/}
      {/*                key={item.id}*/}
      {/*                linkText={item.name}*/}
      {/*                onClick={() => categoryClickHandler(item.name)}*/}
      {/*              />*/}
      {/*            )*/}
      {/*          })*/}
      {/*        }*/}
      {/*      </Catalog>*/}
      {/*      : props.currentCategory === 'search' && props.goods.length === 0*/}
      {/*        ? <Text*/}
      {/*          text="Ничего не найдено."*/}
      {/*        />*/}
      {/*        : undefined*/}
      {/*  }*/}
      {/*</Promo>*/}
    </>
  )
}

export default EditCatalogPage
