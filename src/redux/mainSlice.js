import {createSlice} from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    isAuth: false,
    isAdmin: false,
    cart: [],
    sortValue: 'price-incr',
    visibleValue: "1",
    currentPage: 1,
    pages: 10,
    currentCategoryTitle: '',
    currentSearchValue: '',
    ordering: {
      delivery: "removal",
      payment: "cash",
      phone: "",
      comment: ""
    }
  },
  reducers: {
    login: state => {
      state.isAuth = true
    },
    logout: state => {
      state.isAuth = false
      state.isAdmin = false
    },
    adminAuth: state => {
      state.isAuth = true
      state.isAdmin = true
    },
    cartAddNewGood: (state, action) => {
      state.cart[state.cart.length] = action.payload.newGood
    },
    cartAddNewCount: (state, action) => {
      state.cart[action.payload.goodIndex] = action.payload.goodWithNewCount
    },
    cartDeleteGood: (state, action) => {
      state.cart.splice(action.payload.goodIndex, 1)
    },
    sortChange: (state, action) => {
      state.sortValue = action.payload
    },
    visibleChange: (state, action) => {
      state.visibleValue = action.payload
    },
    currentPageChange: (state, action) => {
      state.currentPage = action.payload
    },
    pagesChange: (state, action) => {
      state.pages = action.payload
    },
    currentCategoryTitleChange: (state, action) => {
      state.currentCategoryTitle = action.payload
    },
    currentSearchValueChange: (state, action) => {
      state.currentSearchValue = action.payload
    },
    orderingChange: (state, action) => {
      if (action.payload.delivery) {
        state.ordering.delivery = action.payload.delivery
      }
      if (action.payload.payment) {
        state.ordering.payment = action.payload.payment
      }
      if (action.payload.phone) {
        state.ordering.phone = action.payload.phone
      }
      if (action.payload.comment) {
        state.ordering.comment = action.payload.comment
      } else {
        state.ordering.comment = undefined
      }
    }
  }
})

export const {
  login,
  logout,
  adminAuth,
  cartAddNewGood,
  cartAddNewCount,
  cartDeleteGood,
  sortChange,
  visibleChange,
  currentPageChange,
  pagesChange,
  currentCategoryTitleChange,
  currentSearchValueChange,
  orderingChange
} = mainSlice.actions

export default mainSlice.reducer
