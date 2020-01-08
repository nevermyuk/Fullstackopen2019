import React from 'react'
import {connect} from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({createAnecdote, setNotification}) => {
    const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote(content)
    setNotification(`You just added ${content}`)
    setTimeout(() => {
      setNotification(null)
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
const ConnectedAnecdotesForm = connect(null,{createAnecdote, setNotification})(AnecdoteForm)




export default ConnectedAnecdotesForm


