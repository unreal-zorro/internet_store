import {createSlice} from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    // isAuth: false,
    // isAdmin: false,
    // login: '',
    // cart: [],
    isOrdering: false,
    currentOrderNumber: 0,
    currentOrderPhone: '',
    sortValue: 'price-incr',
    visibleValue: "5",
    currentPage: 1,
    pages: 10,
    currentCategoryTitle: '',
    currentSearchValue: '',
    orders: [],
    message: 'Привет!'
  },
  reducers: {
    // userAuth: (state, action) => {
    //   state.isAuth = true
    //   state.login = action.payload
    // },
    // logout: state => {
    //   state.isAuth = false
    //   state.isAdmin = false
    //   state.login = ''
    // },
    // adminAuth: (state, action) => {
    //   state.isAdmin = true
    //   state.login = action.payload
    // },
    // cartAddNewGood: (state, action) => {
    //   state.cart[state.cart.length] = action.payload.newGood
    // },
    // cartAddNewCount: (state, action) => {
    //   state.cart[action.payload.goodIndex] = action.payload.goodWithNewCount
    // },
    // cartDeleteGood: (state, action) => {
    //   state.cart.splice(action.payload.goodIndex, 1)
    // },
    // cartClear: state => {
    //   state.cart.splice(0, state.cart.length)
    // },
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
    },
    addMessage: (state, action) => {
      state.message = action.payload
    }
  }
})

export const {
  // userAuth,
  // logout,
  // adminAuth,
  // cartAddNewGood,
  // cartAddNewCount,
  // cartDeleteGood,
  // cartClear,
  isOrderingChange,
  currentOrderNumberChange,
  currentOrderPhoneChange,
  sortChange,
  visibleChange,
  currentPageChange,
  pagesChange,
  currentCategoryTitleChange,
  currentSearchValueChange,
  addOrder,
  addMessage
} = mainSlice.actions

export default mainSlice.reducer
