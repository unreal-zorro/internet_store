import {useSelector} from "react-redux";

import {sortMap} from "../../../utils/sortMap";
import Promo from "../../../components/Promo/Promo";
import Navigation from "../../../components/Navigation/Navigation";
import NavigationTitle from "../../../components/Navigation/NavigationTitle/NavigationTitle";
import EditNavigationLink from "../../../components/Navigation/EditNavigationLink/EditNavigationLink";
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

function EditCategoryPage(props) {
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
      {/*</Promo>*/}

      {/*{*/}
      {/*  props.currentCategory*/}
      {/*    ? !(props.currentCategory === 'search' && props.goods.length === 0)*/}
      {/*      ? <>*/}
      {/*        <Visual*/}
      {/*          className="edit"*/}
      {/*        >*/}
      {/*          <Sort*/}
      {/*            value={sortValue}*/}
      {/*            onChange={sortSelectChangeHandler}*/}
      {/*          />*/}
      {/*          <Visible*/}
      {/*            value={visibleValue}*/}
      {/*            onChange={visibleSelectChangeHandler}*/}
      {/*          />*/}
      {/*        </Visual>*/}

      {/*        <EditEmpty*/}
      {/*          className={props.goods.length === 0 ? "active" : ""}*/}
      {/*        />*/}

      {/*        <EditContent>*/}
      {/*          <EditCards>*/}
      {/*            {*/}
      {/*              props.goods*/}
      {/*                .sort(sortMap[sortValue])*/}
      {/*                .slice(*/}
      {/*                  (currentPage - 1) * visibleValue,*/}
      {/*                  currentPage === 1 && pages === 1*/}
      {/*                    ? props.goods.length*/}
      {/*                    : currentPage === pages*/}
      {/*                      ? props.goods.length < pages * visibleValue*/}
      {/*                        ? props.goods.length*/}
      {/*                        : pages * visibleValue*/}
      {/*                      : currentPage * visibleValue*/}
      {/*                )*/}
      {/*                .map(item => {*/}
      {/*                  return (*/}
      {/*                    <EditCard*/}
      {/*                      key={item.id}*/}
      {/*                      id={item.id}*/}
      {/*                      url={item.url}*/}
      {/*                      name={item.name}*/}
      {/*                      rating={item.rating}*/}
      {/*                      descr={item.descr}*/}
      {/*                      category={(props.currentCategory === 'all' ||*/}
      {/*                        props.currentCategory === 'search')*/}
      {/*                        ? categories.find(*/}
      {/*                          itemCategories => itemCategories.goods.find(*/}
      {/*                            itemGood => itemGood.id === item.id*/}
      {/*                          )*/}
      {/*                        ).name*/}
      {/*                        : category.name*/}
      {/*                      }*/}
      {/*                      amount={item.amount}*/}
      {/*                      price={item.price}*/}
      {/*                      onEditClick={() => editGoodClickHandler(*/}
      {/*                        item.id,*/}
      {/*                        (props.currentCategory === 'all' ||*/}
      {/*                          props.currentCategory === 'search')*/}
      {/*                          ? categories.find(*/}
      {/*                            itemCategories => itemCategories.goods.find(*/}
      {/*                              itemGood => itemGood.id === item.id*/}
      {/*                            )*/}
      {/*                          ).id*/}
      {/*                          : category.id*/}
      {/*                      )}*/}
      {/*                      onDeleteClick={() => deleteGoodClickHandler(*/}
      {/*                        item.id,*/}
      {/*                        (props.currentCategory === 'all' ||*/}
      {/*                          props.currentCategory === 'search')*/}
      {/*                          ? categories.find(*/}
      {/*                            itemCategories => itemCategories.goods.find(*/}
      {/*                              itemGood => itemGood.id === item.id*/}
      {/*                            )*/}
      {/*                          ).id*/}
      {/*                          : category.id*/}
      {/*                      )}*/}
      {/*                    />*/}
      {/*                  )*/}
      {/*                })*/}
      {/*            }*/}
      {/*            <EditCardAdd*/}
      {/*              onClick={() => addGoodClickHandler(*/}
      {/*                category.length*/}
      {/*                  ? 1*/}
      {/*                  : category.id*/}
      {/*              )}*/}
      {/*            />*/}
      {/*          </EditCards>*/}
      {/*        </EditContent>*/}

      {/*        <Pagination*/}
      {/*          currentPage={currentPage}*/}
      {/*          pages={pages}*/}
      {/*          onClickPrevButton={prevButtonClickHandler}*/}
      {/*          onClickNextButton={nextButtonClickHandler}*/}
      {/*        />*/}
      {/*      </>*/}
      {/*      : undefined*/}
      {/*    : undefined*/}
      {/*}*/}
    </>
  )
}

export default EditCategoryPage
