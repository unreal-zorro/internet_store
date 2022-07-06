import {createSlice} from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    admin: {
      login: 'adminInternetStore',
      password: '123456'
    },
    users: [
      {
        login: 'user1',
        password: '111111'
      },
      {
        login: 'userTwo',
        password: '7777777'
      }
    ]
  },
  reducers: {

  }
})

export const {

} = usersSlice.actions

export default usersSlice.reducer
