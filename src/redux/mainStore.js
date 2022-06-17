import {configureStore} from "@reduxjs/toolkit";

import mainReducer from "./mainSlice"
import categoriesReducer from "./categoriesSlice"

export default configureStore({
  reducer: {
    main: mainReducer,
    categories: categoriesReducer
  }
})
