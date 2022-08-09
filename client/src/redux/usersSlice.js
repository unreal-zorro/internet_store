import {createSlice} from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    admin: {
      login: 'admin',
      password: '123456',
      cart: []
    },
    users: [
      {
        login: 'user',
        password: '123456',
        cart: []
      }
    ]
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push({...action.payload})
    },
    addAdminCart: (state, action) => {
      state.admin.cart = action.payload.cart
    },
    addUserCart: (state, action) => {
      state.users[action.payload.userIndex].cart = action.payload.cart
    }
  }
})

export const {
  addUser,
  addAdminCart,
  addUserCart
} = usersSlice.actions

export default usersSlice.reducer
