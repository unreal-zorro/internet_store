import React from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet, useOutletContext} from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarItem from "../../components/Sidebar/SidebarItem/SidebarItem";
import SidebarLink from "../../components/Sidebar/SidebarLink/SidebarLink";
import Container from "../../components/Container/Container";

function UserLayout() {
  const { isSidebarActive, searchActive, searchValue } = useOutletContext()
  const categories = useSelector(state => state.categories.categories)

  return (
    <Container>
      <Sidebar
        className={isSidebarActive ? 'active' : ''}
      >
        {categories.length
          ? categories.map(item => {
            return (
              <SidebarItem
                key={item.id}
              >
                <SidebarLink
                  link={"/catalog/" + item.title}
                  linkText={item.name}
                />
              </SidebarItem>
            )
          })
          : (
            <SidebarItem>
              <SidebarLink
                link="/"
                linkText="Категорий нет"
              />
            </SidebarItem>
          )
        }
      </Sidebar>

      {
        searchActive
          ? <Navigate
            to={"catalog/search?value=" + searchValue}
            replace={true}
          />
          : <Outlet />
      }

    </Container>
  )
}

export default UserLayout
