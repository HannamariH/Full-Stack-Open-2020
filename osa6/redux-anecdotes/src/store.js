import { combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import anecdoteReducer from "./reducers/anecdoteReducer"
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"
import anecdoteService from "./services/anecdotes"

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

anecdoteService.getAll().then(anecdotes =>
  anecdotes.forEach(anecdote => {
    store.dispatch({type: "NEW_ANECDOTE", data: anecdote})
  }))

console.log(store.getState())

export default store
