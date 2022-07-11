import {createSlice} from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    isAuth: false,
    isAdmin: false,
    cart: [],
    isOrdering: false,
    currentOrderNumber: 0,
    currentOrderPhone: '',
    sortValue: 'price-incr',
    visibleValue: "5",
    currentPage: 1,
    pages: 10,
    currentCategoryTitle: '',
    currentSearchValue: '',
    orders: []
  },
  reducers: {
    userAuth: state => {
      state.isAuth = true
    },
    logout: state => {
      state.isAuth = false
      state.isAdmin = false
    },
    adminAuth: state => {
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
    cartClear: state => {
      state.cart.splice(0, state.cart.length)
    },
    isOrderingChange: (state, action) => {
      state.isOrdering = action.payload
    },
    currentOrderNumberChange: (state, action) => {
      state.currentOrderNumber = action.payload
    },
    currentOrderPhoneChange: (state, action) => {
      state.currentOrderPhone = action.payload
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
    addOrder: (state, action) => {
      state.orders.push({...action.payload})
    }
  }
})

export const {
  userAuth,
  logout,
  adminAuth,
  cartAddNewGood,
  cartAddNewCount,
  cartDeleteGood,
  cartClear,
  isOrderingChange,
  currentOrderNumberChange,
  currentOrderPhoneChange,
  sortChange,
  visibleChange,
  currentPageChange,
  pagesChange,
  currentCategoryTitleChange,
  currentSearchValueChange,
  addOrder
} = mainSlice.actions

export default mainSlice.reducer
