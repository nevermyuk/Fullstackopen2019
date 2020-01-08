import React from 'react'
import ReactDOM from 'react-dom'
import anecdoteService from './services/anecdotes'
import App from './App'
import { Provider } from 'react-redux'
import {initializeAnecdote} from './reducers/anecdoteReducer'
import store from './store'


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