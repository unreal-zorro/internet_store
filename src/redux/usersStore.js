import {createStore} from "redux";

let usersState = {
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
}

function usersReducer(state = usersState, action) {
  switch (action.type) {
    default:
      return state
  }
}

let usersStore = createStore(usersReducer)

export default usersStore
