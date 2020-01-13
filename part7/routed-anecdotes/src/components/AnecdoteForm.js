import React from "react"
import {withRouter} from 'react-router-dom'
import {createAnecdote} from '../reducers/anecdoteReducer'
import store from '../store'
import { setNotification } from "../reducers/notificationReducer"

const CreateNew = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.content.value
    const author = e.target.author.value
    const info = e.target.info.value
    store.dispatch(createAnecdote(content,author,info))
    props.history.push('/')
    store.dispatch(setNotification(`anecdote ${content} is created`))
  }
  

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' />
        </div>
        <div>
          author
          <input name='author' />
        </div>
        <div>
          url for more info
          <input name='info'/>
        </div>
        <button>create</button>
      </form>
    </div>
  )
}
const AnecdoteForm = withRouter(CreateNew)

export default AnecdoteForm