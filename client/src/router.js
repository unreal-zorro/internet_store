import {Route} from "react-router-dom";

import MainLayout from "./hoc/MainLayout/MainLayout";
import IndexPage from "./hoc/pages/IndexPage/IndexPage";
import CatalogPage from "./hoc/pages/CatalogPage/CatalogPage";
import CategoryPage from "./hoc/pages/CategoryPage/CategoryPage";
import SearchPage from "./hoc/pages/SearchPage/SearchPage";
import CardPage from "./hoc/pages/CardPage/CardPage";
import DeliveryPaymentPage from "./hoc/pages/DeliveryPaymentPage/DeliveryPaymentPage";
import ContactsPage from "./hoc/pages/ContactsPage/ContactsPage";
import CartPage from "./hoc/pages/CartPage/CartPage";
import OrderingPage from "./hoc/pages/OrderingPage/OrderingPage";
import NotFoundPage from "./hoc/pages/NotFoundPage/NotFoundPage";
import AuthPage from "./hoc/pages/AuthPage/AuthPage";
import RegisterPage from "./hoc/pages/RegisterPage/RegisterPage";
import EditPage from "./hoc/pages/EditPage/EditPage";

export const useRoutes = (isOrdering, isAuth, isAdmin) => {
  return (
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<IndexPage />} />

        <Route path="catalog" element={<CatalogPage />} />
        <Route path="catalog/:categoryTitle" element={<CategoryPage />} />
        <Route path="catalog/search" element={<SearchPage />} />
        <Route path="catalog/:categoryTitle/:cardId" element={<CardPage />} />

        <Route path="delivery-payment" element={<DeliveryPaymentPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="cart" element={<CartPage />} />

        {
          isOrdering
            ? <Route path="ordering" element={<OrderingPage />} />
            : null
        }

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {
        !isAuth
        ? (
          <Route>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          )
        : undefined
      }

      {
        isAdmin
          ? <Route path="/edit" element={<EditPage />} />
          : undefined
      }
    </>
  )
}
