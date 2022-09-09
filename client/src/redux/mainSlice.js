import {createSlice} from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
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
    message: ''
  },
  reducers: {
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
    addOrder: (state, action) => {
      state.orders.push({...action.payload})
    },
    addMessage: (state, action) => {
      state.message = action.payload
    }
  }
})

export const {
  isOrderingChange,
  currentOrderNumberChange,
  currentOrderPhoneChange,
  sortChange,
  visibleChange,
  currentPageChange,
  pagesChange,
  currentCategoryTitleChange,
  addOrder,
  addMessage
} = mainSlice.actions

export default mainSlice.reducer
