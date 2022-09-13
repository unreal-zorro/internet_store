import {Route} from "react-router-dom";

import {AuthContext} from "./context/auth.context";
import MainLayout from "./layouts/MainLayout/MainLayout";
import UserLayout from "./layouts/UserLayout/UserLayout";
import IndexPage from "./pages/IndexPage/IndexPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import CardPage from "./pages/CardPage/CardPage";
import DeliveryPaymentPage from "./pages/DeliveryPaymentPage/DeliveryPaymentPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import CartPage from "./pages/CartPage/CartPage";
import OrderingPage from "./pages/OrderingPage/OrderingPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import EditPage from "./pages/EditPage/EditPage";

export const useRoutes = (isOrdering, isAuth, isAdmin) => {
  return (
    <>
      <Route path="/" element={<MainLayout />}>
        <Route element={<UserLayout />}>
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
          isAdmin
            ? <Route path="edit" element={
                <AuthContext.Consumer>
                  {authContext => (
                    <EditPage
                      authContext={authContext}
                    />
                  )}
                </AuthContext.Consumer>
              }/>
            : null
        }
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
    </>
  )
}
