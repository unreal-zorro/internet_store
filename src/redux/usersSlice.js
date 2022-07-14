import {createSlice} from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    admin: {
      login: 'adminInternetStore',
      password: '123456',
      cart: []
    },
    users: [
      {
        login: 'user1',
        password: '111111',
        cart: [
          {
            categoryId: 2,
            id: 111222,
            count: 1
          },
          {
            categoryId: 1,
            id: 548761,
            count: 5
          },
          {
            categoryId: 5,
            id: 12345,
            count: 15
          }
        ]
      },
      {
        login: 'userTwo',
        password: '7777777',
        cart: []
      }
    ]
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push({...action.payload})
    },
    addUserCart: (state, action) => {
      state.users[action.payload.userIndex].cart = action.payload.cart
    }
  }
})

export const {
  addUser,
  addUserCart
} = usersSlice.actions

export default usersSlice.reducer
