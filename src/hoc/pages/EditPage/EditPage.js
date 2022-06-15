import categoriesStore from "../../../redux/categoriesStore";

import Navigation from "../../../components/Navigation/Navigation";
import NavigationTitle from "../../../components/Navigation/NavigationTitle/NavigationTitle";
import NavigationLink from "../../../components/Navigation/NavigationLink/NavigationLink";
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
import Edit from "../../../components/Edit/Edit";
import Bg from "../../../components/Bg/Bg";
import Navbar from "../../../components/Navbar/Navbar";
import Search from "../../../components/Search/Search";
import Container from "../../../components/Container/Container";
import EditMenu from "../../../components/Edit/EditMenu/EditMenu";
import Footer from "../../../components/Footer/Footer";
import EditSidebar from "../../../components/EditSidebar/EditSidebar";
import EditSidebarItem from "../../../components/EditSidebar/EditSidebarItem/EditSidebarItem";
import EditSidebarLink from "../../../components/EditSidebar/EditSidebarLink/EditSidebarLink";
import EditSidebarEdit from "../../../components/EditSidebar/EditSidebarEdit/EditSidebarEdit";
import EditSidebarLinkEdit from "../../../components/EditSidebar/EditSidebarLinkEdit/EditSidebarLinkEdit";
import EditSidebarInput from "../../../components/EditSidebar/EditSidebarInput/EditSidebarInput";

function EditPage() {

  const state = categoriesStore.getState()
  const categories = state.categories

  return (
    <div>
      <Bg />
      <Navbar />
      <Search />
      <Container className="edited">
        <EditSidebar>
          <EditSidebarItem>
            <EditSidebarLink
              link=""
              linkText="Все категории"
            />
          </EditSidebarItem>

          {categories.map((item, index, array) => {
            return (
              <EditSidebarItem
                key={item.id}
              >
                <EditSidebarLink
                  link={"catalog/" + item.title}
                  linkText={item.name}
                />
                <EditSidebarEdit>
                  <EditSidebarLinkEdit
                    link=""
                    linkText=""
                    url="/icons/edit.png"
                    alt="edit"
                  />
                  <EditSidebarLinkEdit
                    link=""
                    linkText=""
                    url="/icons/delete.png"
                    alt="delete"
                  />
                </EditSidebarEdit>
              </EditSidebarItem>
            )
          })}

          <EditSidebarItem>
            <EditSidebarInput
              value="Техника для дома"
            />
            <EditSidebarEdit>
              <EditSidebarLinkEdit
                link=""
                linkText=""
                className="sidebar__edit-ok"
                url="/icons/ok.png"
                alt="ok"
              />
            </EditSidebarEdit>
          </EditSidebarItem>

          <EditSidebarItem>
            <EditSidebarLink
              link=""
              linkText=""
              className="sidebar__link-add"
              url="/icons/add.png"
              alt="add"
            />
          </EditSidebarItem>
        </EditSidebar>

        <Edit>
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
                link="/catalog/auto"
                linkName="Автотовары"
              />
            </NavigationTitle>
            <NavigationDivider />
          </Navigation>

          <Visual>
            <Sort />
            <Visible />
          </Visual>

          <EditEmpty />

          <EditContent>
            <EditCards>
              <EditCard
                id="111522"
                url="/img/Auto_1.jpg"
                name="Автопроигрыватель Soundmax SM-CCR3057F"
                rating="3.0"
                descr="1 DIN, 160 Вт, AUX, USB"
                category="Автотовары"
                amount="1000"
                price="1 099"
              />

              <EditCard
                id="33334"
                url="/img/Home_2.jpg"
                name="Водонагреватель газовый Zanussi GWH 10 Fonte"
                rating="3.1"
                descr="проточный, эмалированная сталь, 18.5 кВт, 10 л/мин, до - 50 °C, управление - механическое, газ-контроль"
                category="Техника для дома"
                amount="500"
                price="10 499"
              />

              <EditCard
                id="545454"
                url="/img/Computers_1.jpg"
                name="ПК ZET Gaming NEO M017"
                rating="4.7"
                descr="Intel Core i5-11400F, 6x2.6 ГГц, 16 ГБ DDR4, GeForce RTX 3050, SSD 512 ГБ, без ОС"
                category="Компьютеры"
                amount="300"
                price="77 299"
              />

              <EditCardAdd />
            </EditCards>
          </EditContent>

          <Pagination />
        </Edit>
      </Container>
      <EditMenu />
      <Footer />
    </div>
  )
}

export default EditPage
