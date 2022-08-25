import {configureStore} from "@reduxjs/toolkit";

import mainReducer from "./mainSlice"
import categoriesReducer from "./categoriesSlice"
// import usersReducer from "./usersSlice"

export default configureStore({
  reducer: {
    main: mainReducer,
    categories: categoriesReducer,
    // users: usersReducer
  }
})
