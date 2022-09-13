import {createSlice} from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: []
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories[state.categories.length] = {
        id: +action.payload.categoryId,
        title: action.payload.categoryTitle,
        name: action.payload.categoryName,
        goods: []
      }
    },
    deleteCategory: (state, action) => {
      state.categories.splice(action.payload.categoryIndex, 1)
    },
    editCategory: (state, action) => {
      state.categories[action.payload.index] = {
        id: +action.payload.completeCategory.categoryId,
        title: action.payload.completeCategory.categoryTitle,
        name: action.payload.completeCategory.categoryName
      }
    },
    addGood: (state, action) => {
      state.categories[action.payload.categoryIndex].goods[state.categories[action.payload.categoryIndex].goods.length] = {
        ...action.payload.completeGood
      }
    },
    deleteGood: (state, action) => {
      state.categories[action.payload.categoryIndex].goods.splice(action.payload.goodIndex,1)
    },
    editGood: (state, action) => {
      state.categories[action.payload.categoryIndex].goods[action.payload.goodIndex] = {
        ...action.payload.completeGood
      }
    }
  }
})

export const {
  addCategory,
  deleteCategory,
  editCategory,
  addGood,
  deleteGood,
  editGood
} = categoriesSlice.actions

export default categoriesSlice.reducer
