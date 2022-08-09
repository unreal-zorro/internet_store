import './App.scss';

import {Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux";

import IndexPage from "./hoc/pages/IndexPage/IndexPage";
import AuthPage from "./hoc/pages/AuthPage/AuthPage";
import RegisterPage from "./hoc/pages/RegisterPage/RegisterPage";
import CatalogPage from "./hoc/pages/CatalogPage/CatalogPage";
import CardPage from "./hoc/pages/CardPage/CardPage";
import CartPage from "./hoc/pages/CartPage/CartPage";
import DeliveryPaymentPage from "./hoc/pages/DeliveryPaymentPage/DeliveryPaymentPage";
import OrderingPage from "./hoc/pages/OrderingPage/OrderingPage";
import EditPage from "./hoc/pages/EditPage/EditPage";
import ContactsPage from "./hoc/pages/ContactsPage/ContactsPage";
import MainLayout from "./hoc/MainLayout/MainLayout";
import CategoryPage from "./hoc/pages/CategoryPage/CategoryPage";
import NotFoundPage from "./hoc/pages/NotFoundPage/NotFoundPage";
import SearchPage from "./hoc/pages/SearchPage/SearchPage";

function App() {
  const isOrdering = useSelector(state => state.main.isOrdering)
  const isAdmin = useSelector(state => state.main.isAdmin)

  return (
    <Routes>
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
          : undefined
        }

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/auth" element={<AuthPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {
        isAdmin
          ? <Route path="/edit" element={<EditPage />} />
          : undefined
      }
    </Routes>
  );
}

export default App;
