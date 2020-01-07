import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({store}) => {
    const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    store.dispatch(createAnecdote(content))
    store.dispatch(setNotification(`You just added ${content}`))
    setTimeout(() => {
      store.dispatch(setNotification(null))
    }, 5000)
  }
  return (
      <form onSubmit={addAnecdote}>
      <h2>Create New</h2>
        <div><input name ='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
  )
}



export default AnecdoteForm


