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
import EditCatalogPage from "./hoc/pages/EditCatalogPage/EditCatalogPage";
// import EditCategoryPage from "./hoc/pages/EditCategoryPage/EditCategoryPage";
// import EditSearchPage from "./hoc/pages/EditSearchPage/EditSearchPage";
import {AuthContext} from "./context/auth.context";
import {CartContext} from "./context/cart.context";
import UserLayout from "./hoc/UserLayout/UserLayout";
import AdminLayout from "./hoc/AdminLayout/AdminLayout";

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
                    <CartContext.Consumer>
                      {cartContext => (
                        <AdminLayout><EditCatalogPage /></AdminLayout>
                      )}
                    </CartContext.Consumer>
                  )}
                </AuthContext.Consumer>
              }/>
            : null
        }

        {/*{*/}
        {/*  isAdmin*/}
        {/*    ? <>*/}
        {/*      <Route path="edit" element={*/}
        {/*        <AuthContext.Consumer>*/}
        {/*          {authContext => (*/}
        {/*            <CartContext.Consumer>*/}
        {/*              {cartContext => (*/}
        {/*                <AdminLayout><EditCatalogPage /></AdminLayout>*/}
        {/*              )}*/}
        {/*            </CartContext.Consumer>*/}
        {/*          )}*/}
        {/*        </AuthContext.Consumer>*/}
        {/*      }/>*/}
        {/*      <Route path="edit/:categoryTitle" element={*/}
        {/*        <AuthContext.Consumer>*/}
        {/*          {authContext => (*/}
        {/*            <CartContext.Consumer>*/}
        {/*              {cartContext => (*/}
        {/*                <AdminLayout><EditCategoryPage /></AdminLayout>*/}
        {/*              )}*/}
        {/*            </CartContext.Consumer>*/}
        {/*          )}*/}
        {/*        </AuthContext.Consumer>*/}
        {/*      }/>*/}
        {/*      <Route path="edit/search" element={*/}
        {/*        <AuthContext.Consumer>*/}
        {/*          {authContext => (*/}
        {/*            <CartContext.Consumer>*/}
        {/*              {cartContext => (*/}
        {/*                <AdminLayout><EditSearchPage /></AdminLayout>*/}
        {/*              )}*/}
        {/*            </CartContext.Consumer>*/}
        {/*          )}*/}
        {/*        </AuthContext.Consumer>*/}
        {/*      }/>*/}
        {/*    </>*/}
        {/*    : null*/}
        {/*}*/}

        {/*{*/}
        {/*  isAdmin*/}
        {/*    ? <Route path="edit" element={*/}
        {/*      <AuthContext.Consumer>*/}
        {/*        {authContext => (*/}
        {/*          <CartContext.Consumer>*/}
        {/*            {cartContext => (*/}
        {/*              <AdminLayout><EditPage /></AdminLayout>*/}
        {/*            )}*/}
        {/*          </CartContext.Consumer>*/}
        {/*        )}*/}
        {/*      </AuthContext.Consumer>*/}
        {/*    }>*/}
        {/*      <Route index element={<EditPage />} />*/}
        {/*      <Route path=":categoryTitle" element={<EditCategoryPage />}/>*/}
        {/*      <Route path="search" element={<EditSearchPage />}/>*/}
        {/*    </Route>*/}
        {/*    : null*/}
        {/*}*/}

        {/*{*/}
        {/*  isAdmin*/}
        {/*    ? <Route path="/edit" element={*/}
        {/*      <AuthContext.Consumer>*/}
        {/*        {authContext => (*/}
        {/*          <CartContext.Consumer>*/}
        {/*            {cartContext => (*/}
        {/*              <AdminLayout>*/}
        {/*                <EditPage*/}
        {/*                  authContext={authContext}*/}
        {/*                  cartContext={cartContext}*/}
        {/*                />*/}
        {/*              </AdminLayout>*/}
        {/*            )}*/}
        {/*          </CartContext.Consumer>*/}
        {/*        )}*/}
        {/*      </AuthContext.Consumer>*/}
        {/*    } />*/}
        {/*    : undefined*/}
        {/*}*/}
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
