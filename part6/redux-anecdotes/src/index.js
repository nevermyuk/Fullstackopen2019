import React from 'react'
import ReactDOM from 'react-dom'
import anecdoteService from './services/anecdotes'
import { createStore,combineReducers } from 'redux'
import App from './App'
import { Provider } from 'react-redux'
import anecdoteReducer, {initializeAnecdote} from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification : notificationReducer
})

const store = createStore(reducer)

anecdoteService.getAll().then(anecdotes =>
  store.dispatch(initializeAnecdote(anecdotes)))


const render = () => {
  ReactDOM.render(
   <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)